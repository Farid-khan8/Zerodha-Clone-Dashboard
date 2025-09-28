// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { BACKEND_URL, FRONTEND_URL } from "../config.js";

// const ProtectedRoute = ({ children }) => {
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(null);

//     useEffect(() => {
//         const checkLogin = async () => {
//             try {
//                 const res = await fetch(`${BACKEND_URL}/auth/check`, {
//                     method: "GET",
//                     credentials: "include", // Important to send cookies
//                 });
//                 const result = await res.json();
//                 setIsAuthenticated(result.success);
//             } catch (err) {
//                 console.error("Login check failed:", err);
//                 setIsAuthenticated(false);
//             }
//         };

//         checkLogin();
//     }, []);

//     if (isAuthenticated === null) {
//         return <div>Loading...</div>; // or spinner
//     }

//     if (!isAuthenticated) {
//         // Redirect to frontend login page if not logged in
//         window.location.href = `${FRONTEND_URL}/login`;
//         return null;
//     }
//     return children; // Render the dashboard
// };

// export default ProtectedRoute;

//----------------------------------------------------------------------------//
//Changes made from claude's version:--------------------------------------------//

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BACKEND_URL, FRONTEND_URL } from "../config.js";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                // FIXED: Get JWT token from localStorage instead of relying on cookies
                const token = localStorage.getItem("authToken");
                console.log("Dashboard: Token from localStorage:", token); // Add this line for debugging

                if (!token) {
                    console.log("No token found in localStorage"); // Add this line for debugging
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                console.log(
                    "Dashboard: Making auth check to:",
                    `${BACKEND_URL}/auth/check`
                ); // Add this line for debugging

                // FIXED: Send token in Authorization header instead of cookies
                const res = await fetch(`${BACKEND_URL}/auth/check`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(
                    "Dashboard: Auth check response status:",
                    res.status
                ); // Add this line for debugging

                const result = await res.json();
                console.log("Dashboard: Auth check result:", result); // Add this line for debugging

                setIsAuthenticated(result.success);
                setLoading(false);
            } catch (err) {
                console.error("Login check failed:", err);
                setIsAuthenticated(false);
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // or spinner
    }

    if (!isAuthenticated) {
        // Redirect to frontend login page if not logged in
        window.location.href = `${FRONTEND_URL}/login`;
        return null;
    }

    return children; // Render the dashboard
};

export default ProtectedRoute;
