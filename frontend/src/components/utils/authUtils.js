// src/utils/authUtils.js

// Function to get user session from sessionStorage (or localStorage)
export const getUserSession = () => {
    const userSession = sessionStorage.getItem('user'); // Use sessionStorage or localStorage
    return userSession ? JSON.parse(userSession) : null;
};

// Function to save user session to sessionStorage (or localStorage)
export const saveUserSession = (sessionData) => {
    sessionStorage.setItem('user', JSON.stringify(sessionData)); // Use sessionStorage or localStorage
};

// Function to remove user session from sessionStorage (or localStorage)
export const removeUserSession = () => {
    sessionStorage.removeItem('user'); // Use sessionStorage or localStorage
};

// Logout function
export const handleLogout = () => {
    const userSession = getUserSession();
    const txn = userSession?.txn;
    const email = userSession?.email;

    fetch(`${process.env.REACT_APP_STREAMIFY_BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ txn, email })
    })
    
    .then((res) => res.json())
    .then((data) => {
        //console.log("logout data:", data)
        if (data.success) {
            removeUserSession();
            window.location.href = "/";
        } else {
            console.error("Logout failed.");
        }
    })
    .catch((err) => {
        console.error("An error occurred during logout.", err);
    });
};
