import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts"
import "./charts.css"

export const Chart = () => {
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

    const formatHours = (hour) => {
        if(hour < 10) {
            return "0" + hour;
        }
        else if(hour > 12) {
            const newHour = hour - 12;
            if(newHour === 0) {
                return "00"
            }
            if(newHour < 10){
                return "0" + newHour
            }
            return newHour
        } else {
            return hour;
        }
    }

    const formatMinutes = (mintues) => {
        if(mintues < 10) {
            if(mintues === 0){
                return "00"
            }
            return "0" + mintues;
        } else {
            return mintues
        }
    }

    useEffect(() => {
            fetch('http://localhost:8080/candlestick-data', {
                method: 'get'
            })
                .then(response => response.json())
                .then(jsonData => {
                    setData(jsonData);
                    const series = jsonData.map(row => [row.openTime, parseFloat(row.open.replaceAll("\"", "")), parseFloat(row.high.replaceAll("\"", "")), parseFloat(row.low.replaceAll("\"", "")), parseFloat(row.close.replaceAll("\"", ""))]);
                    const now = new Date();
                    var options = {
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

                    var chart = new ApexCharts(document.querySelector("#chart"), options);

                    chart.render();
                    console.log("loaded")
                });

            return () => {

            }
        }, []
    )


    return (
        <>
            <h1>Chart Page</h1>
            {/*<LineChart*/}
            {/*    width={400}*/}
            {/*    height={400}*/}
            {/*    data={[*/}
            {/*        { name: 'food', uv: 400, pv: 2400 },*/}
            {/*        { name: 'cosmetic', uv: 300, pv: 4567 },*/}
            {/*        { name: 'storage', uv: 300, pv: 1398 },*/}
            {/*        { name: 'digital', uv: 200, pv: 9800 },*/}
            {/*    ]}*/}
            {/*    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
            {/*>*/}
            {/*    <XAxis dataKey="name" />*/}
            {/*    <Tooltip />*/}
            {/*    <CartesianGrid stroke="#f5f5f5" />*/}
            {/*    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />*/}
            {/*    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
            {/*</LineChart>*/}
            <div id="chart" style={{margin: "0 auto", display: "block"}}>chart</div>
        </>
    );
}