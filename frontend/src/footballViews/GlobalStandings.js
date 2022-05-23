import React, { useEffect, useState } from "react"
import "../App.css"
import { withStyles } from "@mui/styles"
import PropTypes from "prop-types"
import { DataGrid } from "@mui/x-data-grid"
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
    const greenColorRange = chroma.scale([
        "rgba(76,206,119,0.00)",
        "rgba(76,206,119,1.00)",
    ])
    const redColorRange = chroma.scale([
        "rgba(255,153,153,1.00)",
        "rgba(255,153,153,0.00)",
    ]) //f99

    const percent =
        params.value < 1.2
            ? (params.value - 0.5) / (1.2 - 0.5)
            : (params.value - 1.2) / (3 - 1.2)
    return (
        <>
            {params.value < 1.2 ? (
                <div
                    style={{
                        color: "black",
                        // borderStyle: "solid",
                        // borderColor: `${redColorRange(percent.toString())}`,
                        borderRadius: "13px",
                        width: "55%",
                        background: `${redColorRange(percent.toString())}`,
                        height: "50%",
                        textAlign: "center",
                        lineHeight: "25px",
                    }}
                >
                    {params.value}
                </div>
            ) : (
                <div
                    style={{
                        color: "black",
                        // borderStyle: "solid",
                        // borderColor: `${greenColorRange(percent.toString())}`,
                        borderRadius: "13px",
                        width: "55%",
                        background: `${greenColorRange(percent.toString())}`,
                        height: "50%",
                        textAlign: "center",
                        lineHeight: "25px",
                    }}
                >
                    {params.value}
                </div>
            )}
        </>
    )
}

const handleRenderStatDef = (params) => {
    const greenColorRange = chroma.scale([
        "rgba(76,206,119,1.00)",
        "rgba(76,206,119,0.00)",
    ])
    const redColorRange = chroma.scale([
        "rgba(255,153,153,0.00)",
        "rgba(255,153,153,1.00)",
    ]) //f99

    const percent =
        params.value < 1.5
            ? (params.value - 0.5) / (1.5 - 0.5)
            : (params.value - 1.5) / (2.4 - 1.5)
    return (
        <>
            {params.value > 1.5 ? (
                <div
                    style={{
                        color: "black",
                        // borderStyle: "solid",
                        // borderColor: `${redColorRange(percent.toString())}`,
                        borderRadius: "13px",
                        width: "55%",
                        background: `${redColorRange(percent.toString())}`,
                        height: "50%",
                        textAlign: "center",
                        lineHeight: "25px",
                    }}
                >
                    {params.value}
                </div>
            ) : (
                <div
                    style={{
                        color: "black",
                        // borderStyle: "solid",
                        // borderColor: `${greenColorRange(percent.toString())}`,
                        borderRadius: "13px",
                        width: "55%",
                        background: `${greenColorRange(percent.toString())}`,
                        height: "50%",
                        textAlign: "center",
                        lineHeight: "25px",
                    }}
                >
                    {params.value}
                </div>
            )}
        </>
    )
}

const handleRenderImage = (params) => {
    if (params.row.image === "") {
        return `${params.value}`
    } else {
        return (
            <div style={{ justifyContent: "center", alignSelf: "center" }}>
                <img
                    style={{
                        heightL: "10%",
                        width: "10%",
                    }}
                    alt={params.value}
                    src={params.row.image}
                />
                &nbsp; {params.value}
            </div>
        )
    }
}

const handleRenderTeamImage = (params) => {
    if (params.row.teamImage === "") {
        return `${params.value}`
    } else {
        return (
            <div style={{ justifyContent: "center", alignSelf: "center" }}>
                <img
                    style={{
                        heightL: "10%",
                        width: "10%",
                    }}
                    alt={params.value}
                    src={params.row.teamImage}
                />
                &nbsp; {params.value}
            </div>
        )
    }
}

const columns = [
    {
        field: "rank",
        headerName: "Rank",
        type: "number",
        headerAlign: "center",
        width: 100,
        align: "center",
    },
    {
        field: "Change",
        headerName: "1-Week Change",
        type: "number",
        headerAlign: "center",
        width: 150,
        align: "center",
        renderCell: handleRenderRankChange,
    },
    {
        field: "name",
        headerName: "Team",
        width: 300,
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderTeamImage,
    },
    {
        field: "league",
        headerName: "League",
        width: 300,
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderImage,
    },
    {
        field: "off",
        headerName: "Offense",
        type: "number",
        width: 120,
        headerAlign: "center",
        align: "center",
        renderCell: handleRenderStatOff,
    },
    {
        field: "def",
        headerName: "Defense",
        type: "number",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: handleRenderStatDef,
    },
    {
        field: "spi",
        headerName: "SPI",
        type: "number",
        width: 120,
        headerAlign: "center",
        align: "center",
    },
]
function GlobalStandings(props) {
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

GlobalStandings.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GlobalStandings)
