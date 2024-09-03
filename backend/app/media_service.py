import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

load_dotenv()

router = APIRouter()
TRANSCODE_URL = os.getenv("TRANSCODE_URL")
upload_endpoint = f"{TRANSCODE_URL}/upload/"


@router.post("/upload_media", tags=["Media Services"])
async def upload_media(
    folder_name: str = Form(...),
    banner_file: UploadFile = File(...),
    video_file: UploadFile = File(...)
):
    try:
        # Read files in binary mode
        banner_data = await banner_file.read()
        video_data = await video_file.read()

        # Debugging print statements
        print(f"Uploading to: {upload_endpoint}")
        print(f"Folder name: {folder_name}")
        print(f"Received banner_file: {banner_file.filename}, Content type: {banner_file.content_type}")
        print(f"Received video_file: {video_file.filename}, Content type: {video_file.content_type}")

        # Prepare files for upload
        files = {
            "banner_file": (banner_file.filename, banner_data, banner_file.content_type),
            "video_file": (video_file.filename, video_data, video_file.content_type),
        }

        # Prepare URL with query parameters
        params = {
            "folder_name": folder_name
        }

        # Send POST request with files and query parameters
        response = requests.post(upload_endpoint, files=files, params=params)

        # Debugging response
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Content: {response.content}")

        response.raise_for_status()  # Raise exception for non-200 status codes

        return response.json()  # Return the JSON response

    except requests.RequestException as e:
        print(f"RequestException: {e}")  # Print detailed exception
        raise HTTPException(status_code=500, detail=f"Error uploading files: {e}")
    except Exception as e:
        print(f"Unexpected exception: {e}")  # Print detailed exception
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
