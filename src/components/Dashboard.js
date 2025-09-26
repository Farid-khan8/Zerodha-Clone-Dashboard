import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            {/* WatchList with context for buy/sell */}
            <GeneralContextProvider>
                <WatchList />
            </GeneralContextProvider>

            {/* Main dashboard content */}
            <div className="content">
                <Routes>
                    <Route index element={<Summary />} /> {/* Default route */}
                    <Route path="summary" element={<Summary />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="holdings" element={<Holdings />} />
                    <Route path="positions" element={<Positions />} />
                    <Route path="funds" element={<Funds />} />
                    <Route path="apps" element={<Apps />} />
                    {/* Redirect unknown dashboard routes to summary */}
                    <Route
                        path="*"
                        element={<Navigate to="summary" replace />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
