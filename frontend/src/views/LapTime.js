import React, { useEffect, useState } from "react"
import "../App.css"
import { Row, Column } from "react-bootstrap"
import Box from "@mui/material/Box"
import "bootstrap/dist/css/bootstrap.min.css"
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

const getIntroOfPage = (label) => {
    if (label === "SOFT") {
        return (
            <span style={{ color: "#FF0000", fontWeight: "bold" }}>SOFT</span>
        )
    } else if (label === "MEDIUM") {
        return (
            <span style={{ color: "#FFA500", fontWeight: "bold" }}>MEDIUM</span>
        )
    } else {
        return <span style={{ color: "white", fontWeight: "bold" }}>HARD</span>
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
        // console.log(payload[0])
        return (
            <div
                className="custom-tooltip"
                style={{
                    color: "white",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    border: "1px solid",
                    borderRadius: "7px",
                    padding: "15px",
                }}
            >
                <p className="label">{`Lap ${label}`}</p>
                <p className="label">
                    <span
                        style={{ color: `${payload[0].color}` }} // Dynamically get color from driver
                    >
                        {`${payload[0].name} `}
                    </span>
                    {`Lap Time: ${moment(payload[0].value)
                        .utc()
                        .format("mm:ss.SSS")}`}
                </p>
                <p className="label">
                    <span
                        style={{ color: `${payload[0].color}` }} // Dynamically get color from driver
                    >{`${payload[0].name} `}</span>
                    {/* {`Tyre: ${payload[0].payload.Compound}`} */}
                    {`Tyre: `}
                    {getIntroOfPage(`${payload[0].payload.Compound}`)}
                </p>
            </div>
        )
    }

    return null
}

export const LapTime = () => {
    const [currentChartData, setCurrentChartData] = useState([])
    const [opacity, setOpacity] = useState({ HAM: 1, RIC: 1 })

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/lap_number_time")
            .then((res) => res.json())
            .then((data) => {
                Object.keys(data).map(function (key, index) {
                    data[key]
                        .filter((v) => v[key] === 0)
                        .forEach((v) => (v[key] = NaN))
                })
                console.log("first chart data is", data)

                setCurrentChartData(data)
            })
    }, [])
    const handleMouseEnter = (o) => {
        const { dataKey } = o
        setOpacity({ ...opacity, [dataKey]: 0.5 })
    }

    const handleMouseLeave = (o) => {
        const { dataKey } = o
        setOpacity({ ...opacity, [dataKey]: 1 })
    }
    return (
        <Box>
            <h3 style={{ color: "#8a9c9b", alignSelf: "left" }}>Lap Chart</h3>
            <div className="responsive">
                <div className="responsive-container">
                    <LineChart
                        width={1000}
                        height={400}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis
                            type="number"
                            dataKey="LapNumber"
                            domain={["auto", "auto"]}
                        />
                        <YAxis
                            domain={("auto", "auto")}
                            tickFormatter={(unixTime) =>
                                moment(unixTime).utc().format("mm:ss.SSS")
                            }
                        />
                        <Tooltip content={CustomTooltip} />
                        {/* <Tooltip /> */}
                        <Legend
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <Line
                            type="monotone"
                            data={currentChartData.HAM}
                            // data={
                            //     (currentChartData.HAM.find(
                            //         (v) => v.HAM === 0
                            //     ).HAM = NaN)
                            // }
                            dataKey="HAM"
                            stroke="#8884d8"
                            // stroke={currentChartData.HAM.color}
                            strokeOpacity={opacity.HAM}
                            active_dot={{ r: 8 }}
                        />
                        <Line
                            type="monotone"
                            data={currentChartData.RIC}
                            dataKey="RIC"
                            stroke="#E0610E"
                            strokeOpacity={opacity.RIC}
                        />
                    </LineChart>
                </div>
            </div>
        </Box>
    )
}
