import React, {useEffect} from 'react';
import "./charts.css"
import {calculateData} from "./clients/backend-client";

export const Chart = props => {
    const {symbol, interval, limit} = props.match.params;

    useEffect(() => {
        console.clear();
        calculateData({symbol, interval, limit})
                .then(jsonData => {
                    const series = jsonData.map(row => {
                        const candlestick = row.candlestick;
                        return [
                            // candlestick.openTime,
                            candlestick.openPrice,
                            candlestick.highestPrice,
                            candlestick.lowestPrice,
                            candlestick.closePrice
                        ]
                    });
                    let maxValue = 0;
                    let minValue = Number.MAX_SAFE_INTEGER;
                    series.forEach(entry => {
                        if(entry[1] > maxValue){
                            maxValue = entry[1];
                        }
                        if(entry[2] < minValue){
                            minValue = entry[2];
                        }
                    });



                    console.log(maxValue, minValue);
                    const canvas = document.getElementById('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const candleStickOptions = {
                        chartWidth: canvas.width,
                        chartHeight: canvas.height,
                        candlestickWidth: 8,
                        candlestickCenter: 4,
                        shadowWidth: 2
                    }
                    const chartOptions = {

                    }
                    const correction = maxValue / canvas.height;

                    const correctedSeries = series.map(entry => {
                        return [entry[0] / correction, entry[1] / correction, entry[2] / correction, entry[3] / correction];
                    })

                    drawVerticalAxis(ctx, candleStickOptions, minValue, maxValue);
                    drawHorizontalAxis(ctx, candleStickOptions);
                    // const points = [[30, 70, 15, 60], [45, 80, 5, 35]];
                    const points = correctedSeries;


                    for(let index = 0; index < points.length; index++) {
                        const point = points[index];
                        // console.log(index, point);
                        plotCandlestick(ctx, index + 1, point[0], point[1], point[2], point[3], candleStickOptions, minValue, maxValue);
                    }
                });
        }, [symbol, interval, limit]
    )

    const drawVerticalAxis = (ctx, candleStickOptions, min, max) => {
        const delta = max - min;
        console.log(delta)
        const {chartHeight, chartWidth} = candleStickOptions;
        ctx.fillStyle = 'black';
        const lineWidth = 1;
        const verticalWidth = 40;
        const skipInterval = chartHeight * (1 / 50);
        const textInterval = delta * (1/50);
        for(let i = 0, j = 0; i <= chartHeight; i = i + skipInterval){
            const textToDisplay = Math.round(max - j * textInterval);
            const currentPosition = chartHeight - i;
            ctx.strokeText(textToDisplay.toString(), 0, i - 8, verticalWidth);
            ctx.fillRect(verticalWidth, currentPosition, chartWidth - 20, lineWidth);
            j++
        }
        ctx.fillRect(verticalWidth, 0, lineWidth, chartHeight)
    }

    const drawHorizontalAxis = (ctx, candleStickOptions) => {
        const {chartHeight, chartWidth} = candleStickOptions;
        ctx.fillStyle = 'black';
        const lineWidth = 1;
        const verticalWidth = 40;
        for(let i = 0; i < chartWidth; i = i + 25){
            const currentPosition = i;
            ctx.strokeText(currentPosition.toString(), i + 35, chartHeight, verticalWidth);
            ctx.fillRect(verticalWidth + i, 0, lineWidth, chartHeight - 10);
        }
        // ctx.fillRect(verticalWidth, 0, lineWidth, chartHeight)
    }

    const plotCandlestick = (ctx, index, open, high, low, close, options, min, max) => {
        const {
            chartHeight,
            chartWidth,
            candlestickWidth,
            candlestickCenter,
            shadowWidth
        } = options;
        const offset = 40
        const delta = max - min;
        // const correction = delta * (1/chartHeight);
        console.log(delta)

        if(isGreenCandlestick(open, close)) {
            // console.log("green candle")
            ctx.fillStyle = 'green';

            const xCoordinate = index * candlestickWidth + offset - candlestickWidth;
            const yCoordinate = chartHeight - close - 10;
            const width = candlestickWidth;
            const height = close - open;
            // console.log(xCoordinate, yCoordinate, width, height);

            ctx.fillRect(xCoordinate, yCoordinate, width, height);

            const shadowCoordinateX = xCoordinate + candlestickCenter;
            const shadowCoordinateY = chartHeight - high - 10;
            const shadowHeight = high - low;
            // console.log(shadowCoordinateX, shadowCoordinateY, shadowWidth, shadowHeight);

            ctx.fillRect(shadowCoordinateX, shadowCoordinateY, shadowWidth, shadowHeight);
        } else {
            // console.log("red candle")
            ctx.fillStyle = 'red';

            const xCoordinate = index * candlestickWidth + offset - candlestickWidth;
            const yCoordinate = chartHeight - close - 10;
            const width = candlestickWidth;
            const height = close - open;
            // console.log(xCoordinate, yCoordinate, width, height);

            ctx.fillRect(xCoordinate, yCoordinate, width, height);

            const shadowCoordinateX = xCoordinate + candlestickCenter;
            const shadowCoordinateY = chartHeight - high - 10;
            const shadowHeight = high - low;
            // console.log(shadowCoordinateX, shadowCoordinateY, shadowWidth, shadowHeight);

            ctx.fillRect(shadowCoordinateX, shadowCoordinateY, shadowWidth, shadowHeight);
        }
    }

    const isGreenCandlestick = (open, close) => close > open;

    // noinspection CheckTagEmptyBody
    return (
        <>
            <h1>Chart Page</h1>
            <canvas id="canvas" width={1000} height={500} style={{border: "black solid 2px"}}></canvas>
        </>
    );
}