import React, {useEffect, useState} from 'react';
import "./data.css"
import {calculateData} from "./clients/backend-client";

export const Data = props => {
    const {symbol, interval, limit} = props.match.params;

    const initialDataState = [{
        candlestick: {
            openTime: 1614295620000,
            openPrice: 48333.18,
            highestPrice: 48333.19,
            lowestPrice: 48297.05,
            closePrice: 48312.54,
            volume: 0.210246,
            closeTime: 1614295679999,
            quoteAssetVolume: 10160.3042,
            numberOfTrades: 12,
            takerBuyBaseAssetVolume: 0.179961,
            takerBuyQuoteAssetVolume: 8697.5307
        },
        index: 0,
        exponentialMovingAverageShortTerm: 0.0,
        exponentialMovingAverageLongTerm: 0.0,
        movingAverageConvergenceDivergence: 0.0,
        signal: 0.0,
        longTermMovingAverage: 0.0,
        movingAverage: 0.0,
        standardDeviation: 0.0,
        upperBollingerBand: 0.0,
        lowerBollingerBand: 0.0,
        relativeStrengthIndex: 0.0,
        smoothedLongTermMovingAverage: 0.0,
        smoothedMovingAverage: 0.0,
        smoothedStandDeviation: 0.0,
        smoothedUpperBollingerBand: 0.0,
        smoothedLowerBollingerBand: 0.0,
        smoothedRelativeStrengthIndex: 0.0
    }];

    const [data, setData] = useState(initialDataState);

    useEffect(() => {
        calculateData({symbol, interval, limit})
            .then(jsonData => {
                setData(jsonData);
            })
        return () => {

        }
    }, [symbol, interval, limit])

    return (
        <>
            <h2>Data Page</h2>
            <table>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Open Time</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                    <th>Close Time</th>
                    <th>Quote Asset Volume</th>
                    <th>Number of Trades</th>
                    <th>Taker Buy Base Asset Volume</th>
                    <th>Taker Buy Quote Asset Volume</th>
                    <th>EMA Short Term</th>
                    <th>EMA Long Term</th>
                    <th>MACD</th>
                    <th>Signal</th>
                    <th>Long Term Moving Average</th>
                    <th>Moving Average</th>
                    <th>Standard Deviation</th>
                    <th>Upper Bollinger Band</th>
                    <th>Lower Bollinger Band</th>
                    <th>RSI</th>
                    <th>Smoothed Long Term Moving Average</th>
                    <th>Smoothed Moving Average</th>
                    <th>Smoothed Standard Deviation</th>
                    <th>Smoothed Upper Bollinger Band</th>
                    <th>Smoothed Lower Bollinger Band</th>
                    <th>Smoothed RSI</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, key) => <tr key={key}>
                    <td>{row.index}</td>
                    <td>{row.candlestick.openTime}</td>
                    <td>{row.candlestick.openPrice}</td>
                    <td>{row.candlestick.highestPrice}</td>
                    <td>{row.candlestick.lowestPrice}</td>
                    <td>{row.candlestick.closePrice}</td>
                    <td>{row.candlestick.volume}</td>
                    <td>{row.candlestick.closeTime}</td>
                    <td>{row.candlestick.quoteAssetVolume}</td>
                    <td>{row.candlestick.numberOfTrades}</td>
                    <td>{row.candlestick.takerBuyBaseAssetVolume}</td>
                    <td>{row.candlestick.takerBuyQuoteAssetVolume}</td>
                    <td>{row.exponentialMovingAverageShortTerm}</td>
                    <td>{row.exponentialMovingAverageLongTerm}</td>
                    <td>{row.movingAverageConvergenceDivergence}</td>
                    <td>{row.signal}</td>
                    <td>{row.longTermMovingAverage}</td>
                    <td>{row.movingAverage}</td>
                    <td>{row.standardDeviation}</td>
                    <td>{row.upperBollingerBand}</td>
                    <td>{row.lowerBollingerBand}</td>
                    <td>{row.relativeStrengthIndex}</td>
                    <td>{row.smoothedLongTermMovingAverage}</td>
                    <td>{row.smoothedMovingAverage}</td>
                    <td>{row.smoothedStandDeviation}</td>
                    <td>{row.smoothedUpperBollingerBand}</td>
                    <td>{row.smoothedLowerBollingerBand}</td>
                    <td>{row.smoothedRelativeStrengthIndex}</td>
                </tr>)}
                </tbody>
            </table>
        </>
    );
}