import React, { useEffect, useState } from "react"
import "../App.css"
import { DataGrid } from "@mui/x-data-grid"
import chroma from "chroma-js"

const columns = [
    { field: "rank", headerName: "Rank", type: "number", width: 100 },
    {
        field: "Change",
        headerName: "1-Week Change",
        type: "number",
        width: 150,
        // renderCell: handleRenderRankChange,
    },
    {
        field: "name",
        headerName: "Team",
        width: 300,
        // renderCell: handleRenderTeamImage,
    },
    {
        field: "league",
        headerName: "League",
        width: 300,
        // renderCell: handleRenderImage,
    },
    {
        field: "off",
        headerName: "Offense",
        type: "number",
        width: 120,
        // renderCell: handleRenderStatOff,
    },
    {
        field: "def",
        headerName: "Defense",
        type: "number",
        width: 120,
        // renderCell: handleRenderStatDef,
    },
    {
        field: "spi",
        headerName: "SPI",
        type: "number",
        width: 120,
    },
]
export const LeaguePredictionsLeague = () => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getglobalrankings")
            .then((res) => res.json())
            .then((data) => {
                // console.log("football global ranks:", data)
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
