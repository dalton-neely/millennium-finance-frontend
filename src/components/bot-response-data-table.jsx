import React from "react";
import {BotResponseDataTableRow} from "./bot-response-data-table-row";
import "./bot-response-data-table.css"

export const BotResponseDataTable = props => {
    const {
        amountOfWins,
        amountOfLosses,
        unitedStatesDollarTetherBalance,
        cryptocurrencyBalance,
        lastSecurityPrice,
        transactionRecords,
        simulationId,
    } = props.data;

    return (
        <>
            <table id="bot-response-summary-table">
                <thead>
                <tr>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>USDT Balance</th>
                    <th>Cryptocurrency Balance</th>
                    <th>Last Security Price</th>
                    <th>Number of Trades</th>
                    <th>Simulation ID</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{amountOfWins}</td>
                    <td>{amountOfLosses}</td>
                    <td>${unitedStatesDollarTetherBalance}</td>
                    <td>{cryptocurrencyBalance}</td>
                    <td>${lastSecurityPrice}</td>
                    <td>{transactionRecords.length}</td>
                    <td>{simulationId}</td>
                </tr>
                </tbody>
            </table>
            <table id="bot-response-summary-table-transactions">
                <thead>
                <tr>
                    <th>Position State</th>
                    <th>Timestamp</th>
                    <th>Security Price</th>
                    <th>USDT Balance</th>
                    <th>Cryptocurrency Balance</th>
                    <th>Trade Method</th>
                    <th>Relative Strength Index</th>
                </tr>
                </thead>
                <tbody>
                {transactionRecords.map(
                    (transactionRecord, index) => <BotResponseDataTableRow key={index} data={transactionRecord}/>
                )}
                </tbody>
            </table>
        </>
    );
};