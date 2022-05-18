import React, { useEffect, useState } from "react"
import "../App.css"
import { Row, Column } from "react-bootstrap"
import Box from "@mui/material/Box"
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Label,
    XAxis,
    YAxis,
    LabelList,
    Tooltip,
    Legend,
    ScatterChart,
    Scatter,
    Bar,
    BarChart,
} from "recharts"
import moment from "moment"
import MuiToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { styled } from "@mui/material/styles"

const ToggleButton = styled(MuiToggleButton)(() => ({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "#fff",
    },
    "&.MuiToggleButton-primary": { color: "#8a9c9b", fontFamily: "Montserrat" },
}))

const renderShape =
    (key, pixel = 10) =>
    ({ height, width, fill, x, y, ...rest }) => {
        const xpercent = Math.trunc((pixel * 100) / Math.trunc(height || 1))
        return (
            <svg x={x} y={y} fill="none" radius="10">
                <defs>
                    <linearGradient
                        id={key}
                        x1="0%"
                        y1="0%"
                        y2="0%"
                        x2={`${xpercent}%`}
                    >
                        <stop offset="30%" stopColor="#ffb673" />
                        <stop offset="90%" stopColor={fill} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <rect
                    fill={`url(#${key})`}
                    width={width}
                    height={height}
                    // radius={[10, 10, 10, 10]}
                />
            </svg>
        )
    }

export const Analysis = () => {
    const [history, setHistory] = useState([])
    const [features, setFeatures] = useState([])
    const [featuresHybrid, setFeaturesHybrid] = useState([])

    const [alignment, setAlignment] = useState("allTime")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/formula/circuit_hist_features")
            .then((res) => res.json())
            .then((data) => {
                setHistory(data[0])
                setFeatures(
                    data[1].sort((a, b) => {
                        return a.position - b.position
                    })
                )
                setFeaturesHybrid(
                    data[2].sort((a, b) => {
                        return a.position - b.position
                    })
                )
            })
    }, [])

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    return (
        <Box>
            <div
                className="responsive-container"
                style={{ height: "300vh", position: "relative" }}
            >
                <div style={{ padding: "30px", paddingLeft: "50px" }}>
                    <ScatterChart
                        width={1300}
                        height={600}
                        margin={{ top: 5, right: 15, left: 20, bottom: 10 }}
                    >
                        <YAxis
                            // domain={("auto", "auto")}
                            dataKey={"name"}
                            type="category"
                            name="Circuit Name"
                            allowDuplicatedCategory={false}
                            style={{ fontSize: "12px", pading: "5px" }}
                            // tickCount={28}
                            axisLine={false}
                            tickLine={false}
                            width={120}
                        />
                        <XAxis
                            domain={("auto", "auto")}
                            dataKey={"year"}
                            type="number"
                            name="Year"
                            tickCount={10}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Scatter name="" data={history} fill="#8884d8" />
                        <Tooltip cursor={{ strokeDasharray: "5 5" }} />
                    </ScatterChart>
                </div>
                <div className="features-container">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        style={{
                            paddingLeft: "7vw",
                            // position: "absolute"
                            // float: "right",
                            // width: "200px",
                        }}
                    >
                        <ToggleButton
                            sx={{
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    color: "#fff",
                                    fontWeight: "bold",
                                },
                                border: "2px",
                            }}
                            value="allTime"
                        >
                            All Time
                        </ToggleButton>
                        <ToggleButton
                            sx={{
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    color: "#fff",
                                    fontWeight: "bold",
                                },
                                border: "2px",
                            }}
                            // selected={true}
                            value="hybrid"
                        >
                            Hybrid Era
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {alignment === "allTime" ? (
                        <div style={{ padding: "30px", paddingLeft: "50px" }}>
                            {/* {console.log(features)} */}
                            <BarChart
                                width={1300}
                                height={700}
                                data={features}
                                margin={{
                                    top: 5,
                                    right: 15,
                                    left: 20,
                                    bottom: 10,
                                }}
                                layout="vertical"
                                style={{
                                    // position: "absolute"
                                    float: "left",
                                }}
                            >
                                <XAxis
                                    type="number"
                                    dataKey="position"
                                    domain={[0, 100]}
                                    unit=" %"
                                    tickCount={5}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    style={{ fontSize: "12px", pading: "5px" }}
                                    width={120}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Bar
                                    dataKey="position"
                                    // label
                                    fill="#ff7477"
                                    barSize={10}
                                    // radius={[10, 10, 10, 10]}
                                    radius={10}
                                    // fill="url(#colorUv)"
                                    shape={renderShape("a")}
                                    stackId="a"
                                >
                                    <LabelList
                                        style={{
                                            textAnchor: "middle",
                                            fontSize: "70%",
                                            fontWeight: "bold",
                                            fill: "#fff",
                                        }}
                                        valueAccessor={(props) => {
                                            const { value } = props
                                            return Array.isArray(value)
                                                ? value[1] - value[0]
                                                : value
                                        }}
                                        position="right"
                                        offset={22}
                                    />
                                </Bar>
                                <Tooltip cursor={{ fill: "transparent" }} />
                            </BarChart>
                        </div>
                    ) : (
                        <div style={{ padding: "30px", paddingLeft: "50px" }}>
                            {/* {console.log(features)} */}
                            <BarChart
                                width={1300}
                                height={700}
                                data={featuresHybrid}
                                margin={{
                                    top: 5,
                                    right: 15,
                                    left: 20,
                                    bottom: 10,
                                }}
                                layout="vertical"
                                style={{
                                    // position: "absolute"
                                    float: "left",
                                }}
                            >
                                <XAxis
                                    type="number"
                                    dataKey="position"
                                    domain={[0, 100]}
                                    unit=" %"
                                    tickCount={5}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    style={{ fontSize: "12px", pading: "5px" }}
                                    width={120}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Bar
                                    dataKey="position"
                                    // label
                                    fill="#ff7477"
                                    barSize={10}
                                    // radius={[10, 10, 10, 10]}
                                    radius={10}
                                    // fill="url(#colorUv)"
                                    shape={renderShape("a")}
                                    stackId="a"
                                >
                                    <LabelList
                                        style={{
                                            textAnchor: "middle",
                                            fontSize: "70%",
                                            fontWeight: "bold",
                                            fill: "#fff",
                                        }}
                                        valueAccessor={(props) => {
                                            const { value } = props
                                            return Array.isArray(value)
                                                ? value[1] - value[0]
                                                : value
                                        }}
                                        position="right"
                                        offset={22}
                                    />
                                </Bar>
                                <Tooltip cursor={{ fill: "transparent" }} />
                            </BarChart>
                        </div>
                    )}
                </div>
            </div>
        </Box>
    )
}
