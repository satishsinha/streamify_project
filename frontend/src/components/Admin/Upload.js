// src/components/Admin/Upload.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';  
import SideMenu from './SideMenu'; 
import Header from './Header'; 
import { getUserSession } from '../utils/authUtils'; 

const Upload = () => {
  const navigate = useNavigate(); 
  const [userName, setUserName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const userSession = getUserSession(); // Get user session

    if (userSession && userSession.given_name) {
        setUserName(userSession.given_name);
    } else {
        // Redirect to login if no session
        console.warn("No valid session found, redirecting to login.");
        window.location.href = "/";
    }
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();

    const backendUrl = `${process.env.REACT_APP_STREAMIFY_BACKEND_URL}/upload_media`;

    const formData = new FormData();
    formData.append('folder_name', folderName);
    if (bannerFile) formData.append('banner_file', bannerFile);
    if (videoFile) formData.append('video_file', videoFile);

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const result = await response.json();
      //console.log("response:", result)
      setUploadStatus(`Upload Successful: ${JSON.stringify(result)}`);
      // Redirect to AdminDashboard on successful upload
      navigate('/admin');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="dashboard">
      <SideMenu /> {/* Include SideMenu component */}
      <div className="dashboard__content">
        <Header /> {/* Include Header component */}
        <div className="upload-container">
          <h2>Upload Video</h2>
          <form className="upload-form" onSubmit={handleUpload}>
            <label htmlFor="folderName">Folder Name:</label>
            <input
              type="text"
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
            <label htmlFor="bannerFile">Upload Banner:</label>
            <input
              type="file"
              id="bannerFile"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
              required
            />
            <label htmlFor="videoFile">Upload Video:</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
            <button type="submit">Upload</button>
          </form>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Upload;
