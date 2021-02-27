import React, {useEffect, useState, useRef} from "react";
import {runBotSimulation} from "../clients/backend-client";
import {BotResponseDataTable} from "../components/bot-response-data-table";
import "./bot.css";
import {BotInputParametersBox} from "../components/bot-input-parameters-box";

export const BotPage = () => {
    const inputParameters = {
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

    const initialBotResponseState = {
        amountOfWins: 0,
        amountOfLosses: 0,
        unitedStatesDollarTetherBalance: 0.00,
        cryptocurrencyBalance: 0.0,
        lastSecurityPrice: 46406.87,
        transactionRecords: [
            {
                positionState: "BUY",
                timestamp: 0,
                securityPrice: 0.00,
                unitedStatesDollarTetherBalance: 0.0,
                cryptocurrencyBalance: 0.00,
                tradeMethod: "BUY_NORMALLY",
                relativeStrengthIndex: 0.00
            },
        ],
        simulationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }

    const [botResponse, setBotResponse] = useState(initialBotResponseState);

    useEffect(() => {
        // runBotSimulation(inputParameters)
        //     .then(responseData => setBotResponse(responseData));
    }, []);

    const weightsBoxRef = useRef();

    const onRunSimulationCallback = event => {
        event.preventDefault();
        const symbolTicker = document.getElementById("input-symbol-ticker").value;
        const candlestickInterval = document.getElementById("input-candlestick-interval").value;
        const candlestickLimit = document.getElementById("input-candlestick-limit").value;
        console.log(weightsBoxRef.current.value);
        runBotSimulation({...inputParameters,  calculateDataInput: {
                symbol: symbolTicker,
                interval: candlestickInterval,
                limit: candlestickLimit
            }})
            .then(responseData => setBotResponse(responseData));
        console.log(symbolTicker, candlestickInterval, candlestickLimit);
    }


    return (
        <>
            <h1>Bot Page</h1>
            <div id="bot-response-box">
                <BotInputParametersBox
                    onRunSimulationCallback={onRunSimulationCallback}
                    weightsBoxRef={weightsBoxRef}
                />
                <BotResponseDataTable data={botResponse}/>
            </div>
        </>
    );
};