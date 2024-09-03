import os
import requests
from bson import ObjectId
from dotenv import load_dotenv
from app.database import get_mongo_client, MONGO_DB, MEDIA_COLLECTION
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends

load_dotenv()

router = APIRouter()

TRANSCODE_URL = os.getenv("TRANSCODE_URL")
upload_endpoint = f"{TRANSCODE_URL}/upload/"


@router.post("/upload_media", tags=["Media Services"])
async def upload_media(
        folder_name: str = Form(...),
        banner_file: UploadFile = File(...),
        video_file: UploadFile = File(...), mongo_client=Depends(get_mongo_client)
):
    try:
        # Read files in binary mode
        banner_data = await banner_file.read()
        video_data = await video_file.read()

        # Prepare files for upload
        files = {
            "banner_file": (banner_file.filename, banner_data, banner_file.content_type),
            "video_file": (video_file.filename, video_data, video_file.content_type),
        }

        params = {"folder_name": folder_name}
        response = requests.post(upload_endpoint, files=files, params=params)

        response.raise_for_status()  # Raise exception for non-200 status codes
        # If the upload was successful, save the response to MongoDB
        if response.status_code == 200:
            db = mongo_client[MONGO_DB]
            media_collection = db[MEDIA_COLLECTION]
            response_data = response.json()
            media_data = {
                "folder_name": response_data.get("folder_name"),
                "banner_s3_path": response_data.get("banner_s3_path"),
                "video_s3_path": response_data.get("video_s3_path"),
                "banner_uploaded_file_name": response_data.get("banner_uploaded_file_name"),
                "video_uploaded_file_name": response_data.get("video_uploaded_file_name")
            }

            result = media_collection.insert_one(media_data)  # Insert the data into MongoDB
            media_data["_id"] = str(result.inserted_id)   # Convert the ObjectId to string for the response

            return {"message": "Files uploaded and saved successfully in media_master.", "data": media_data}

    except requests.RequestException as e:
        print(f"RequestException: {e}")
        raise HTTPException(status_code=500, detail=f"Error uploading files: {e}")
    except Exception as e:
        print(f"Unexpected exception: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
