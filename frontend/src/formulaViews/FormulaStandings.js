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
import { HorizontalBarFeatures } from "../Components/HorizontalBarFeatures"
import { DataGrid } from "@mui/x-data-grid"

import Background from "../images/tex.jpeg"

const handleRenderNameChange = (params) => {
    return (
        <>
            {params.value}

            <span style={{ padding: "5px", fontWeight: "900" }}>
                {params.row.lastname}
            </span>
        </>
    )
}

const handleRenderTeamChange = (params) => {
    return (
        <>
            {/* {console.log(params)} */}
            <img
                src={params.row.img}
                alt={params.row.img}
                style={{ width: "15%" }}
            />
            {params.value}
        </>
    )
}
const handleRenderTeamName = (params) => {
    return (
        <>
            <img
                src={params.row.img}
                alt={params.row.img}
                style={{ width: "15%" }}
            />
            <span style={{ padding: "5px", fontWeight: "900" }}>
                {params.value}
            </span>
        </>
    )
}

const drivColumns = [
    {
        field: "position",
        headerName: "Position",
        type: "number",
        width: 150,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "firstname",
        headerName: "Name",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderNameChange,
    },
    {
        field: "nationality",
        flex: 1,
        headerName: "Nationality",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "constructor",
        flex: 1,
        headerName: "Constructor",
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderTeamChange,
    },
    {
        field: "points",
        flex: 1,
        headerName: "Points",
        type: "number",
        align: "center",
        headerAlign: "center",
    },
]

const consColumns = [
    {
        field: "position",
        headerName: "Position",
        type: "number",
        // width: 300,
        flex: 1,
        align: "center",
        headerAlign: "center",
        // renderCell: handleRenderImage,
    },
    {
        field: "name",
        headerName: "name",
        width: 100,
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderTeamName,
    },
    {
        field: "nationality",
        headerName: "Nationality",
        // width: 150,
        flex: 1,
        align: "center",
        headerAlign: "center",
        // renderCell: handleRenderRankChange,
    },
    {
        field: "wins",
        headerName: "Wins",
        type: "number",
        // width: 300,
        flex: 1,
        align: "center",
        headerAlign: "center",
        // renderCell: handleRenderImage,
    },
    {
        field: "points",
        headerName: "Points",
        type: "number",
        // width: 300,
        flex: 1,
        align: "center",
        headerAlign: "center",
        // renderCell: handleRenderTeamImage,
    },
]

export const FormulaStandings = () => {
    const [drivStandings, setDrivStandings] = useState([])
    const [consStandings, setConsStandings] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/formula/getstandings")
            .then((res) => res.json())
            .then((data) => {
                setDrivStandings(data[0])
                setConsStandings(data[1])
            })
    }, [])

    return (
        <Box
            style={{
                backgroundImage: `url(${Background})`,
                height: "310vh",
                backgroundSize: "150px 150px",
            }}
        >
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
                            color: "#8a9c9b",
                            border: 0,
                            boxShadow: 0,
                            "& .MuiDataGrid-cell:hover": {
                                color: "primary.main",
                                fontWeight: "500",
                            },
                        }}
                        rows={drivStandings}
                        columns={drivColumns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        getRowId={(r) => r.position}
                    />
                </div>
            </div>
            <div style={{ marginTop: "5vh" }}></div>
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
                            color: "#8a9c9b",
                            border: 0,
                            boxShadow: 0,
                            "& .MuiDataGrid-cell:hover": {
                                color: "primary.main",
                                fontWeight: "500",
                            },
                        }}
                        rows={consStandings}
                        columns={consColumns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        getRowId={(r) => r.position}
                    />
                </div>
            </div>
            {/* {console.log(drivStandings)} */}
            {/* {console.log(consStandings)} */}
        </Box>
    )
}
