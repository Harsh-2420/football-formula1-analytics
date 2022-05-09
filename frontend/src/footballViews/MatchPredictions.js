import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { mean } from "mathjs"
import moment from "moment"

const handleQuality = (params) => {
    // console.log(`${params.row.spi1}`, `${params.row.importance1}`)
    return mean(`${params.row.spi1}`, `${params.row.spi2}`)
}

const hanldeDate = (params) => {
    var formatted = moment(params.value).format("D MMMM YYYY")
    return formatted
}

const columns = [
    {
        field: "date",
        headerName: "Date",
        type: "number",
        width: 150,
        renderCell: hanldeDate,
    },
    {
        field: "league",
        headerName: "League",
        width: 150,
        // renderCell: handleRenderRankChange,
    },
    {
        field: "team1",
        headerName: "team1",
        width: 300,
        // renderCell: handleRenderTeamImage,
    },
    {
        field: "team2",
        headerName: "team2",
        width: 300,
        // renderCell: handleRenderTeamImage,
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
        headerName: "importance1",
        type: "number",
        width: 120,
        // renderCell: handleRenderStatOff,
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

    // if (rows[0].date) {
    // }
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
