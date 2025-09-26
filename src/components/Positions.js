import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { handleError, handleSuccess } from "../util.js";

// import { positions } from "../data/data"; //--this is replaced by api call to backend database coming from mongoDB

const Positions = () => {
    const [allpositions, setAllPositions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchPositions = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8080/allpositions", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch positions");

                const data = await res.json();
                if (isMounted) setAllPositions(data);
                // handleSuccess("Positions fetched successfully");
            } catch (err) {
                console.error(err);
                handleError(err.message || "Failed to fetch positions");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchPositions();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <div>Loading positions...</div>;

    return (
        <>
            <h3 className="title">Positions ({allpositions.length})</h3>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg.</th>
                            <th>LTP</th>
                            <th>P&L</th>
                            <th>Chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allpositions.map((stock, index) => {
                            const curValue =
                                (stock.price || 0) * (stock.qty || 0);
                            const isProfit =
                                curValue -
                                    (stock.avg || 0) * (stock.qty || 0) >=
                                0.0;
                            const profClass = isProfit ? "profit" : "loss";
                            const dayClass = stock.isLoss ? "loss" : "profit";

                            return (
                                <tr key={index}>
                                    <td>{stock.product}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.qty}</td>
                                    <td>{stock.avg.toFixed(2)}</td>
                                    <td>{stock.price.toFixed(2)}</td>
                                    <td className={profClass}>
                                        {(
                                            curValue -
                                            stock.avg * stock.qty
                                        ).toFixed(2)}
                                    </td>
                                    <td className={dayClass}>{stock.day}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Positions;
