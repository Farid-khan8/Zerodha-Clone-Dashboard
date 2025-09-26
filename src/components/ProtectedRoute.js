import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch("http://localhost:8080/auth/check", {
                    method: "GET",
                    credentials: "include", // Important to send cookies
                });
                const result = await res.json();
                setIsAuthenticated(result.success);
            } catch (err) {
                console.error("Login check failed:", err);
                setIsAuthenticated(false);
            }
        };

        checkLogin();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // or spinner
    }

    if (!isAuthenticated) {
        // Redirect to frontend login page if not logged in
        // window.location.href = "http://localhost:3000/login";
        return null;
    }
    return children; // Render the dashboard
};

export default ProtectedRoute;
