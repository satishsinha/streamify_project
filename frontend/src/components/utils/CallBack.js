// src/components/utils/CallBack.js

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


const CallBack = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [error, setError] = useState(null);
    const fetchTriggeredRef = useRef(false);  // Use ref to track if the fetch has been triggered

    useEffect(() => {
        // Fetch services data from FastAPI backend
        if (!fetchTriggeredRef.current) {
            const params = new URLSearchParams(location.search);
            fetchTriggeredRef.current = true;  // Set ref to true to prevent future triggers

            const token = params.get('token');
            const txn_error = params.get('error');
            const app_key = process.env.REACT_APP_ONEACCESS_CLIENT_ID;
            const app_secret = process.env.REACT_APP_ONEACCESS_CLIENT_SECRET;
           
            if (txn_error === '0' && token) {
                const validateToken = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_ONEACCESS_BACKEND_URL}/validate_token`, {
                            method: 'POST',
                            headers: {
                                'accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ app_key, app_secret, token })
                        });
                        
                        const data = await response.json();
                       
                        if (response.ok && data.success) {
                            const jwt_token = data.jwt_token;
                            // Second API call to decode the token and check in the database
                            const fetchDecodedUserData = async (jwt_token) => {
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_STREAMIFY_BACKEND_URL}/validate_token`, {
                                        method: 'POST',
                                        headers: {
                                            'accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ token: jwt_token })
                                    });

                                    const decodedData = await response.json();
                                    
                                    if (response.ok && decodedData.success) {
                                        // Save data to session storage
                                        sessionStorage.setItem('user', JSON.stringify(decodedData.data));
                                        console.log("decodedddddd data:", decodedData)
                                        // Redirect to Dashboard.js inside User folder
                                        navigate('/user');
                                    } else {
                                        setError("Failed to fetch user data");
                                        console.error('Failed to fetch user data:', decodedData);
                                    }
                                } catch (fetchError) {
                                    setError("Error fetching user data");
                                    console.error("Error fetching user data!", fetchError);
                                }
                            };
                            fetchDecodedUserData(jwt_token);
                        } else {
                            setError("Unexpected response format");
                            console.error('Failed to fetch service data:', data);
                        }
                    } catch (error) {
                        setError("Error fetching services data");
                        console.error("There was an error fetching the services data!", error);
                    } finally {
                        console.error('Callback');
                    }
                };
    
                validateToken();
            } else {
                setError('Transaction failed!');
            }
        }
    }, [location.search]);

    return (
        <div>
            <div>CallBack</div>
            {error && <div>Error : {error}</div>}
        </div>
    );
};

export default CallBack;
