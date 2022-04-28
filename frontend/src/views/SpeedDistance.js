import React, { useEffect, useState } from "react"
import "../App.css"
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

export const SpeedDistance = () => {
    const [currentChartData, setCurrentChartData] = useState([])
    const [opacity, setOpacity] = useState({ HAM: 1, ALO: 1, LAT: 1 })

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/speed_distance")
            .then((res) => res.json())
            .then((data) => {
                console.log("speed distance data: ", data)
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
        <div className="responsive">
            <div className="responsive-container">
                <ResponsiveContainer width="100%" height="100%">
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
                        <Line
                            type="monotone"
                            dataKey="HAM"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            strokeOpacity={opacity.HAM}
                            data={currentChartData.HAM}
                        />
                        <Line
                            type="monotone"
                            dataKey="ALO"
                            stroke="#82ca9d"
                            strokeOpacity={opacity.ALO}
                            data={currentChartData.ALO}
                        />
                        <Line
                            type="monotone"
                            dataKey="LAT"
                            stroke="#1a5d57"
                            strokeOpacity={opacity.LAT}
                            data={currentChartData.LAT}
                        />
                        <XAxis
                            type="number"
                            dataKey="Distance"
                            domain={["auto", "auto"]}
                        />
                        <YAxis
                            domain={["auto", "auto"]}
                            name="Speed"
                            type="number"
                        />
                        <Tooltip />
                        <Legend
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
