// src/utils/authUtils.js

// Function to get user session from localStorage
export const getUserSession = () => {
    const userSession = localStorage.getItem('userSession');
    return userSession ? JSON.parse(userSession) : null;
};

// Function to save user session to localStorage
export const saveUserSession = (sessionData) => {
    localStorage.setItem('userSession', JSON.stringify(sessionData));
};

// Function to remove user session from localStorage
export const removeUserSession = () => {
    localStorage.removeItem('userSession');
};

// Logout function
export const handleLogout = () => {
    const userSession = getUserSession();
    const isGoogleLogin = userSession?.googleLogin;
    const txn = userSession?.txn;
    const email = userSession?.email;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoogleLogin, txn, email})
    })
    .then((res) => res.json())
    .then((data) => {
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
