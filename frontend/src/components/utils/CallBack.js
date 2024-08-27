// src/components/utils/CallBack.js

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const CallBack = () => {
    const location = useLocation();
    const [user, setUser] = useState([]);
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

            if (txn_error === 0 && token !== 0) {
                const fetch_user_data = async () => {
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
    
                        if (data.status_code === 200) {
                            const jwt_token = data.jwt_token;
                            const decoded = jwt_decode(jwt_token);
                            setUser(decoded);
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
    
                fetch_user_data();
            } else {
                setError('Transaction failed!');
            }
        }
    }, [location.search]);

    return (
        <div>
            <div>CallBack</div>
            {error && <div>Error : {error}</div>}
            {user && <div>User Record : {user}</div>}
        </div>
    );
};

export default CallBack;