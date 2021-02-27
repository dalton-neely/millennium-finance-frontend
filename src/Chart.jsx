import React, {useEffect} from 'react';
import ApexCharts from "apexcharts"
import "./charts.css"
import {calculateData} from "./clients/backend-client";

export const Chart = props => {
    const {symbol, interval, limit} = props.match.params;

    const formatHours = hour => {
        if (hour < 10) {
            return "0" + hour;
        } else if (hour > 12) {
            const newHour = hour - 12;
            if (newHour === 0) {
                return "00"
            }
            if (newHour < 10) {
                return "0" + newHour
            }
            return newHour
        } else {
            return hour;
        }
    }

    const formatMinutes = minutes => {
        if (minutes < 10) {
            if (minutes === 0) {
                return "00"
            }
            return "0" + minutes;
        } else {
            return minutes
        }
    }

    useEffect(() => {
            calculateData({symbol, interval, limit})
                .then(jsonData => {
                    const series = jsonData.map(row => {
                        const candlestick = row.candlestick;
                        return [
                            candlestick.openTime,
                            candlestick.openPrice,
                            candlestick.highestPrice,
                            candlestick.lowestPrice,
                            candlestick.closePrice
                        ]
                    });
                    const options = {
                        chart: {
                            type: 'candlestick',
                            width: "1000px"
                        },
                        series: [{
                            data: series
                        }],
                        xaxis: {
                            tickAmount: 25,
                            labels: {
                                formatter: (value, timestamp) => {
                                    const current = new Date(timestamp);
                                    return formatHours(current.getHours()) + ":" + formatMinutes(current.getMinutes());
                                }
                            }
                        }
                    }

                    const chart = new ApexCharts(document.querySelector("#chart"), options);

                    chart.render().then(r => console.log("loaded chart:", r));
                });
        }, [symbol, interval, limit]
    )


    return (
        <>
            <h1>Chart Page</h1>
            <div id="chart" style={{margin: "0 auto", display: "block"}}>Candlestick Chart</div>
        </>
    );
}