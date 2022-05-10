import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { mean } from "mathjs"
import moment from "moment"
import chroma from "chroma-js"
import { MatchItem } from "../Components/MatchItem"
import { Row } from "react-bootstrap"

const handleQuality = (params) => {
    const colorRange = chroma.scale(["#b1fef3", "#019983"])
    const percent = params.value / 100
    return (
        <div
            style={{
                color: "black",
                borderStyle: "solid",
                // border: 1,
                borderColor: `${colorRange(percent.toString())}`,
                borderRadius: "13px",
                width: "65%",
                // height: "20%",
                background: `${colorRange(percent.toString())}`,
            }}
        >
            {Math.round(mean(`${params.row.spi1}`, `${params.row.spi2}`))}
        </div>
    )
}

const handleImportance = (params) => {
    const colorRange = chroma.scale(["#b1fef3", "#019983"])
    const percent = params.value / 100
    return (
        <div
            style={{
                color: "black",
                // border: 1,
                borderStyle: "solid",
                borderColor: `${colorRange(percent.toString())}`,
                borderRadius: "13px",
                width: "65%",
                // height: "20%",
                background: `${colorRange(percent.toString())}`,
            }}
        >
            {Math.round(
                mean(`${params.row.importance1}`, `${params.row.importance2}`)
            )}
        </div>
    )
}

const handleMatchRating = (params) => {
    const colorRange = chroma.scale(["#b1fef3", "#019983"])
    const percent = params.value / 100
    return (
        <div
            style={{
                color: "black",
                // border: 1,
                borderStyle: "solid",
                borderColor: `${colorRange(percent.toString())}`,
                borderRadius: "13px",
                width: "65%",
                // height: "20%",
                background: `${colorRange(percent.toString())}`,
            }}
        >
            {Math.round(
                mean(
                    mean(`${params.row.spi1}`, `${params.row.spi2}`),
                    mean(
                        `${params.row.importance1}`,
                        `${params.row.importance2}`
                    )
                )
            )}
        </div>
    )
}

const handleDate = (params) => {
    var formatted = moment(params.value).format("D MMMM YYYY")
    return formatted
}

const handleMatchComponent = (params) => {
    return (
        <div
            className="matchComponent"
            style={{
                position: "relative",
                // height: "100px",
                // lineHeight: "100px",
            }}
        >
            <Row>
                <div style={{ float: "left", width: "400px" }}>
                    <div
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "15px",
                            width: "300px",
                            height: "35px",
                            lineHeight: "35px",
                            textAlign: "left",
                        }}
                    >
                        <Row>
                            <div
                                style={{
                                    float: "left",
                                    width: "220px",
                                    height: "35px",
                                    background: "rgb(192,192,192)",
                                    borderTopLeftRadius: "13px",
                                    borderBottomLeftRadius: "13px",
                                }}
                            >
                                {params.row.team1}
                            </div>

                            <div
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "35px",
                                    background: "#f6edc3",
                                    borderTopRightRadius: "13px",
                                    borderBottomRightRadius: "13px",
                                }}
                            >
                                {`${params.row.prob1}`.substring(2, 4)}%
                            </div>
                        </Row>
                    </div>
                    <br></br>
                    <div
                        style={{
                            paddingTop: "5px",
                            paddingLeft: "15px",
                            width: "300px",
                            height: "35px",
                            lineHeight: "35px",
                            textAlign: "left",
                        }}
                    >
                        <Row>
                            <div
                                style={{
                                    float: "left",
                                    width: "220px",
                                    height: "35px",
                                    background: "rgb(192,192,192)",
                                    borderTopLeftRadius: "13px",
                                    borderBottomLeftRadius: "13px",
                                }}
                            >
                                {params.row.team2}
                            </div>

                            <div
                                style={{
                                    float: "right",
                                    width: "80px",
                                    height: "35px",
                                    background: "#f6edc3",
                                    borderTopRightRadius: "13px",
                                    borderBottomRightRadius: "13px",
                                }}
                            >
                                {`${params.row.prob2}`.substring(2, 4)}%
                            </div>
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        background: "#f6edc3",
                        borderRadius: "13px",
                        border: "2px solid",
                        borderColor: "#f6edc3",
                        width: "80px",
                        // height: "35px",
                        float: "right",
                        left: "320px",
                        top: "40px",
                        position: "absolute",
                    }}
                >
                    {`${params.row.probd}`.substring(2, 4)}%
                </div>
            </Row>
        </div>
    )
}

const columns = [
    {
        field: "date",
        headerName: "Date",
        type: "number",
        width: 150,
        renderCell: handleDate,
    },
    {
        field: "league",
        headerName: "League",
        width: 200,
        // renderCell: handleRenderRankChange,
    },
    {
        field: "team1",
        headerName: "Match",
        width: 500,
        renderCell: handleMatchComponent,
    },
    {
        field: "importance2",
        headerName: "Quality",
        type: "number",
        width: 120,
        renderCell: handleQuality,
    },
    {
        field: "importance1",
        headerName: "Importance",
        type: "number",
        width: 120,
        renderCell: handleImportance,
    },
    {
        field: "spi2",
        headerName: "Match Rating",
        type: "number",
        width: 120,
        renderCell: handleMatchRating,
    },

    // {
    //     field: "spi",
    //     headerName: "SPI",
    //     type: "number",
    //     width: 120,
    // },
]
export const MatchPredictions = () => {
    const [rows, setRows] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getfuturepredictions")
            .then((res) => res.json())
            .then((data) => {
                console.log("football match predictions:", data)
                setRows(data)
            })
    }, [])
    return (
        <div
            className="tableHolder"
            style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "90px",
                paddingRight: "90px",
            }}
        >
            <div
                className="dataTable"
                style={{
                    height: "100vh",
                    width: "100%",
                    alignSelf: "center",
                    margin: "0 auto",
                }}
            >
                <DataGrid
                    sx={{
                        fontFamily: "Montserrat",
                        border: 0,
                        boxShadow: 0,
                        "& .MuiDataGrid-cell:hover": {
                            color: "primary.main",
                            fontWeight: "500",
                        },
                    }}
                    rowHeight={120}
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    getRowId={(r) => r.index}
                />
            </div>
        </div>
    )
}
