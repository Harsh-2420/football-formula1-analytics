import React from "react"
import axis from "react-vis/dist/plot/axis/axis"
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
    Text,
} from "recharts"

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
const formatter = (value) => {
    // return `${value}`
    return `${value}`
}

function CustomYAxisLabel(props, extra) {
    console.log(props)
    console.log(extra)
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            {/* <image
                xlinkHref={props.payload.value}
                x={0}
                y={0}
                height="31px"
                width="88px"
                textAnchor="middle"
                fill="#666"
            /> */}
            <span class={`fi fi-gr`}></span>
            {console.log(props.payload.value)}
            {props.payload.value}
        </g>
    )
}

export const HorizontalBarFeatures = (data) => {
    const passData = data.data
    return (
        <>
            <BarChart
                width={1300}
                height={700}
                data={passData}
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
                    // tick={<CustomYAxisLabel />}
                    // tickFormatter={formatter}
                    // label={
                    //     <Text
                    //         x={0}
                    //         y={0}
                    //         dx={50}
                    //         dy={150}
                    //         offset={0}
                    //         angle={-90}
                    //     >
                    //         Hours
                    //     </Text>
                    // }
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
        </>
    )
}
