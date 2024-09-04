from fastapi import APIRouter, HTTPException
from minio import Minio
from dotenv import load_dotenv
import os
from datetime import timedelta
from app.database import mongo_client, MONGO_DB, MEDIA_COLLECTION

load_dotenv()

router = APIRouter()

# Initialize MinIO client using environment variables
minio_client = Minio(
    endpoint=os.getenv('MINIO_ENDPOINT'),
    access_key=os.getenv('MINIO_ACCESS_KEY'),
    secret_key=os.getenv('MINIO_SECRET_KEY'),
    secure=os.getenv('MINIO_SECURE') == 'True'  # Convert string to boolean
)


@router.get("/media_list", tags=["Media Services"])
async def media_list():
    try:
        db = mongo_client[MONGO_DB]
        media_collection = db[MEDIA_COLLECTION]

        media_records = media_collection.find({})

        response_data = []

        for record in media_records:
            # Get the correct S3 path from the record
            banner_s3_path = record.get('banner_s3_path')
            print(banner_s3_path)

            if banner_s3_path.startswith('videos/'):
                banner_s3_path = banner_s3_path[len('videos/'):]

            # Generate URL for the banner file in MinIO
            try:
                banner_url = minio_client.presigned_get_object(
                    bucket_name=os.getenv('MINIO_BUCKET_NAME'),
                    object_name=banner_s3_path,
                    expires=timedelta(days=1)  # URL expiration time
                )
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Error generating URL for banner: {str(e)}")

            # Append the relevant data to the response
            response_data.append({
                "id": str(record.get('_id')),
                "folder_name": record.get('folder_name'),
                "banner_s3_path": banner_s3_path,
                "video_s3_path": record.get('video_s3_path'),
                "video_uploaded_file_name": record.get('video_uploaded_file_name'),
                "banner_url": banner_url
            })

        return response_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve media list: {str(e)}")
