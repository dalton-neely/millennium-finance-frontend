import React, {useEffect, useState} from 'react';
import "./data.css"

export const Data = () => {
    const initialDataState = [{
        index: 0,
        openTime: 0,
        open: "",
        high: "",
        low: "",
        close: "",
        volume: "",
        closeTime: 0,
        quoteAssetVolume: "",
        numberOfTrades: 0,
        takerBuyBaseAssetVolume: "",
        takerBuyQuoteAssetVolume: "",
        ignore: "",
        ema12: 0,
        ema26: 0,
        macd: 0,
        macdSignal: 0,
    }];

    const [data, setData] = useState(initialDataState);

    useEffect(() => {
        fetch('http://localhost:8080/candlestick-data', {
            method: 'get'
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
            })
        return () => {

        }
    }, [])

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
                    <th>Ignore</th>
                    <th>EMA 12 Week</th>
                    <th>EMA 26 Week</th>
                    <th>MACD</th>
                    <th>MACD Signal</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, key) => <tr key={key}>
                    <td>{row.index}</td>
                    <td>{row.openTime}</td>
                    <td>{row.open}</td>
                    <td>{row.high}</td>
                    <td>{row.low}</td>
                    <td>{row.close}</td>
                    <td>{row.volume}</td>
                    <td>{row.closeTime}</td>
                    <td>{row.quoteAssetVolume}</td>
                    <td>{row.numberOfTrades}</td>
                    <td>{row.takerBuyBaseAssetVolume}</td>
                    <td>{row.takerBuyQuoteAssetVolume}</td>
                    <td>{row.ignore}</td>
                    <td>{row.ema12}</td>
                    <td>{row.ema26}</td>
                    <td>{row.macd}</td>
                    <td>{row.macdSignal}</td>
                </tr>)}
                </tbody>
            </table>
        </>
    );
}