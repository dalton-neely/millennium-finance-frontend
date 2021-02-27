import React from "react";

export const BotResponseDataTableRow = props => {
    const {
        positionState,
        timestamp,
        securityPrice,
        unitedStatesDollarTetherBalance,
        cryptocurrencyBalance,
        tradeMethod,
        relativeStrengthIndex,
    } = props.data;
    const date = new Date(timestamp);

    return (
        <tr>
            <td>{positionState}</td>
            <td>{date.toString()}</td>
            <td>${securityPrice}</td>
            <td>${unitedStatesDollarTetherBalance}</td>
            <td>{cryptocurrencyBalance}</td>
            <td>{tradeMethod}</td>
            <td>{relativeStrengthIndex}</td>
        </tr>
    );
};