import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { BACKEND_URL } from "../config.js";

import "./BuyActionWindow.css";
import { Button } from "@mui/material";

const SellActionWindow = ({ uid }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);

    const { closeSellWindow } = useContext(GeneralContext);

    const handleSellClick = () => {
        axios.post(`${BACKEND_URL}/neworder`, {
            name: uid,
            qty: stockQuantity,
            price: stockPrice,
            mode: "SELL", //key change for sell action
        });
        closeSellWindow();
    };

    const handleCancelClick = () => {
        closeSellWindow();
    };

    return (
        <div className="container" id="sell-window" draggable="true">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"
                            onChange={(e) => setStockPrice(e.target.value)}
                            value={stockPrice}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>
                    <Button className="btn btn-red" onClick={handleSellClick}>
                        Sell
                    </Button>
                    <Button
                        to=""
                        className="btn btn-grey"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SellActionWindow;
