import React from "react";
import "./bot-input-parameters-security-box.css"

export const BotInputParametersSecurityBox = props => {
    const {onRunSimulationCallback} = props;

    return (
        <div id="bot-input-parameters-security-box">
            <h2>Security Input</h2>
            <label>Symbol Ticker:</label>
            <input type="text" id="input-symbol-ticker" defaultValue="BTCUSD"/>
            <label>Candlestick Interval:</label>
            <input type="text" id="input-candlestick-interval" defaultValue="1m"/>
            <label>Candlestick Limit:</label>
            <input type="text" id="input-candlestick-limit" defaultValue={"1000"}/>
            <button onClick={onRunSimulationCallback}>Run Simulation</button>
        </div>
    )
}