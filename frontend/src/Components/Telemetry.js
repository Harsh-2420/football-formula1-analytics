import React, { useEffect, useState } from "react"
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Row, Col } from "react-bootstrap"
import Box from "@mui/material/Box"
import {
    LineChart,
    Label,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts"
import moment from "moment"

export const Telemetry = (currentChartData, CustomTooltip) => {
    return (
        <ResponsiveContainer width={"50%"} height={"100%"}>
            <LineChart
                width={1000}
                height={400}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
            >
                {Object.keys(currentChartData).map((key, index) => {
                    const data = currentChartData[key]
                    return (
                        <Line
                            key={key}
                            type="monotone"
                            data={data}
                            Label
                            dataKey="Speed"
                            dot={false}
                            stroke={data[0].color}
                            label={key}
                            name={key}
                            // stroke={currentChartData.HAM.color}
                            // strokeOpacity={opacity.HAM}
                            // active_dot={{ r: 8 }}
                        >
                            {key}
                        </Line>
                    )
                })}
                <XAxis
                    type="number"
                    dataKey="Distance"
                    domain={["auto", "auto"]}
                />
                <YAxis domain={["auto", "auto"]} name="Speed" type="number" />
                <Tooltip content={CustomTooltip} />
                <Legend
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
