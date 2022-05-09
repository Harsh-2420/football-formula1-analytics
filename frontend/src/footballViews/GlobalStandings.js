import React, { useEffect, useState } from "react"
import "../App.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { withStyles } from "@mui/styles"
import PropTypes from "prop-types"
import Grid from "@mui/material/Grid"
import { DataGrid } from "@mui/x-data-grid"
import clsx from "clsx"
import chroma from "chroma-js"

const styles = {
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        height: 48,
        padding: "0 30px",
    },
}

const handleRenderRankChange = (params) => {
    if (params.value === 0) {
        return ``
    } else if (params.value > 0) {
        return (
            <div
                style={{
                    color: "black",
                    borderStyle: "solid",
                    borderColor: "rgb(177,254,177)",
                    borderRadius: "13px",
                    width: "35%",
                    background: "rgb(177,254,177)",
                }}
            >
                + {params.value}
            </div>
        )
    } else {
        return (
            <div
                style={{
                    color: "black",
                    // border: "2",
                    borderStyle: "solid",
                    borderColor: " rgb(253,177,177)",
                    borderRadius: "13px",
                    width: "35%",
                    background: " rgb(253,177,177)",
                }}
            >
                - {Math.abs(`${params.value}`)}
            </div>
        )
    }
}

const handleRenderStatOff = (params) => {
    const colorRange = chroma.scale(["rgb(252,155,155)", "rgb(155,252,155)"])
    const percent = (params.value - 0) / (3 - 0)
    const outputX = percent * (1 - 0) + 0
    return (
        <div
            style={{
                color: "black",
                borderStyle: "solid",
                borderColor: `${colorRange(outputX.toString())}`,
                borderRadius: "13px",
                width: "55%",
                background: `${colorRange(outputX.toString())}`,
            }}
        >
            {params.value}
        </div>
    )
}

const handleRenderStatDef = (params) => {
    const colorRange = chroma.scale(["rgb(155,252,155)", "rgb(252,155,155)"])
    const percent = (params.value - 0) / (3 - 0)
    const outputX = percent * (1 - 0) + 0
    return (
        <div
            style={{
                color: "black",
                borderStyle: "solid",
                borderColor: `${colorRange(outputX.toString())}`,
                borderRadius: "13px",
                width: "55%",
                background: `${colorRange(outputX.toString())}`,
            }}
        >
            {params.value}
        </div>
    )
}

const columns = [
    { field: "rank", headerName: "Rank", type: "number", width: 100 },
    {
        field: "Change",
        headerName: "1-Week Change",
        type: "number",
        width: 150,
        renderCell: handleRenderRankChange,
    },
    { field: "name", headerName: "Team", width: 300 },
    {
        field: "league",
        headerName: "League",
        width: 300,
    },
    {
        field: "off",
        headerName: "Offense",
        type: "number",
        width: 120,
        renderCell: handleRenderStatOff,
    },
    {
        field: "def",
        headerName: "Defense",
        type: "number",
        width: 120,
        renderCell: handleRenderStatDef,
    },
    {
        field: "spi",
        headerName: "SPI",
        type: "number",
        width: 120,
    },
]
function GlobalStandings(props) {
    const { classes } = props
    const [rows, setRows] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getglobalrankings")
            .then((res) => res.json())
            .then((data) => {
                console.log("football global ranks:", data)
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
                        // "& .MuiMenuItem-root": {
                        //     fontFamily: "Montserrat",
                        // },

                        // "& .MuiButtonBase-root": {
                        //     // color: "primary.main",
                        //     fontFamily: "Montserrat",
                        // },
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    getRowId={(r) => r.rank}
                />
            </div>
        </div>
    )
}

GlobalStandings.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GlobalStandings)
