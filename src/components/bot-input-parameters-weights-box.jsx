import React from "react";
import "./bot-input-parameters-weights-box.css";

export const BotInputParametersWeightsBox = props => {
    const {weightsBoxRef} = props;

    const defaultValue = {
        calculateDataInput: {
            symbol: "BTCUSD",
            interval: "1m",
            limit: "1000"
        },
        whenToDelayABuyAfterALossParameters: {
            rsiCeiling: 30.00
        },
        whenToBuyAfterALossParameters: {
            priceCeilingMultiplier: 1.00,
            rsiCeiling: 18.00
        },
        whenToBuyParameters: {
            rsiCeiling: 50.00,
            lowerBollingerCeilingMultiplier: 1.00
        },
        whenToSellForALoss: {
            floorGainLossPercentage: -0.04
        },
        whenToSellForLongTrade: {
            upperBollingerFloorMultiplier: 1.00,
            priceFloorMultiplier: 1.03,
            rsiFloor: 75.00
        },
        whenToSellForShortTrade: {
            priceFloorMultiplier: 1.035
        }
    }

    return (
        <div id="bot-input-parameters-weights-box">
            <label>JSON Input:</label>
            <textarea ref={weightsBoxRef} id="bot-input-parameters-weights-text-box" defaultValue={JSON.stringify(defaultValue)} />
        </div>
    );
};