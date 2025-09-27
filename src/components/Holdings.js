import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { handleError, handleSuccess } from "../util.js";
import { BACKEND_URL } from "../config.js";

// import { holdings } from "../data/data"; //--this is replaced by api call to backend database coming from mongoDB

const Holdings = () => {
    const [allholdings, setAllHoldings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchHoldings = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(`${BACKEND_URL}/allholdings`, {
                    method: "GET",
                    credentials: "include", // ✅ send the cookie automatically
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch holdings");
                }

                const data = await res.json();
                if (isMounted) {
                    setAllHoldings(data);
                    // handleSuccess("Holdings fetched successfully");
                }
            } catch (err) {
                console.error(err);
                handleError(err.message || "Failed to fetch holdings");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchHoldings();

        return () => {
            isMounted = false;
        };
    }, []);

    //Graph data
    // // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = allholdings.map((subArray) => subArray["name"]);

    const data = {
        labels,
        datasets: [
            {
                label: "Stock Price",
                data: allholdings.map((stock) => stock.price),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    if (loading) return <div>Loading holdings...</div>;

    return (
        <>
            <h3 className="title">Holdings ({allholdings.length})</h3>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg. cost</th>
                            <th>LTP</th>
                            <th>Cur. val</th>
                            <th>P&L</th>
                            <th>Net chg.</th>
                            <th>Day chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allholdings.map((stock, index) => {
                            const curValue = stock.price * stock.qty;
                            const isProfit =
                                curValue - stock.avg * stock.qty >= 0.0;
                            const profClass = isProfit ? "profit" : "loss";
                            const dayClass = stock.isLoss ? "loss" : "profit";

                            return (
                                <tr key={index}>
                                    <td>{stock.name}</td>
                                    <td>{stock.qty}</td>
                                    <td>{stock.avg.toFixed(2)}</td>
                                    <td>{stock.price.toFixed(2)}</td>
                                    <td>{curValue.toFixed(2)}</td>
                                    <td className={profClass}>
                                        {(
                                            curValue -
                                            stock.avg * stock.qty
                                        ).toFixed(2)}
                                    </td>
                                    <td className={profClass}>{stock.net}</td>
                                    <td className={dayClass}>{stock.day}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="col">
                    <h5>
                        29,875.<span>55</span>{" "}
                    </h5>
                    <p>Total investment</p>
                </div>
                <div className="col">
                    <h5>
                        31,428.<span>95</span>{" "}
                    </h5>
                    <p>Current value</p>
                </div>
                <div className="col">
                    <h5>1,553.40 (+5.20%)</h5>
                    <p>P&L</p>
                </div>
            </div>
            <VerticalGraph data={data} />
        </>
    );
};

export default Holdings;
