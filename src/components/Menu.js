import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleSuccess, handleError } from "../util.js";
import { ToastContainer } from "react-toastify";
import "./Menu.css";

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isProfileDropDown, setIsProfileDropDown] = useState(false);

    //Login State  & Logout Functionality
    const [loggedInUser, setLoggedInUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    const handleLogout = (e) => {
        e.stopPropagation(); // Prevent triggering parent onClick

        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        // Optional: clear cookie from backend
        fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include", // send cookies
        }).catch((err) => console.error(err));
        handleSuccess("Logged out successfully");

        // Redirect to frontend homepage
        window.location.href = "http://localhost:3000";
    };

    const handleMenuClick = (index) => {
        setSelectedMenu(index);
    };

    const handleProfileClick = (index) => {
        setIsProfileDropDown(!isProfileDropDown);
    };

    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container">
            <img src="logo.png" alt="logo" style={{ width: "50px" }} />
            <div className="menus">
                <ul>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/"
                            onClick={() => handleMenuClick(0)}
                        >
                            <p
                                className={
                                    selectedMenu === 0
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/orders"
                            onClick={() => handleMenuClick(1)}
                        >
                            <p
                                className={
                                    selectedMenu === 1
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Orders
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/holdings"
                            onClick={() => handleMenuClick(2)}
                        >
                            <p
                                className={
                                    selectedMenu === 2
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Holdings
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/positions"
                            onClick={() => handleMenuClick(3)}
                        >
                            <p
                                className={
                                    selectedMenu === 3
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Positions
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/funds"
                            onClick={() => handleMenuClick(4)}
                        >
                            <p
                                className={
                                    selectedMenu === 4
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Funds
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/apps"
                            onClick={() => handleMenuClick(5)}
                        >
                            <p
                                className={
                                    selectedMenu === 5
                                        ? activeMenuClass
                                        : menuClass
                                }
                            >
                                Apps
                            </p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="profile" onClick={handleProfileClick}>
                    <div className="avatar">ZU</div>
                    <p className="username">
                        {localStorage.getItem("loggedInUser") || "USERID"}
                    </p>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Menu;
