import React, { useState } from "react"
import { Row } from "react-bootstrap"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

function createData(team, adj_score, xg, nsxg) {
    return { team, adj_score, xg, nsxg }
}

export const MatchItemComplete = (row) => {
    const data = row.row
    const tableRows = [
        createData(
            data.team1,
            Math.round(data.adj_score1 * 10) / 10,
            Math.round(data.xg1 * 10) / 10,
            Math.round(data.nsxg1 * 10) / 10
        ),
        createData(
            data.team2,
            Math.round(data.adj_score2 * 10) / 10,
            Math.round(data.xg2 * 10) / 10,
            Math.round(data.nsxg2 * 10) / 10
        ),
    ]
    return (
        <div
            className="matchComponent"
            style={{
                position: "relative",
                color: "black",
            }}
        >
            <Row>
                <div
                    style={{
                        position: "absolute",
                        width: "450px",
                        left: "50px",
                    }}
                >
                    <div
                        style={{
                            float: "left",
                            width: "100px",
                            fontSize: "12px",
                            marginLeft: "17px",
                            // fontWeight: "bold",
                            fontColor: "#808080",
                        }}
                    >
                        {`${data.date}`.substring(5, 11)}
                    </div>
                    <div
                        style={{
                            float: "left",
                            width: "50px",
                            marginLeft: "50px",
                            fontSize: "10px",
                            fontColor: "#808080",
                        }}
                    >
                        WIN %
                    </div>
                </div>
                {data.probd === 0 ? (
                    <></>
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            left: "265px",
                            top: "25px",
                            width: "70px",
                            marginLeft: "60px",
                            fontSize: "10px",
                            fontColor: "#808080",
                        }}
                    >
                        DRAW %
                    </div>
                )}
            </Row>
            <Row>
                <div
                    style={{ float: "left", width: "400px", marginTop: "15px" }}
                >
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
                        {data.score1 > data.score2 ? (
                            <Row>
                                <div
                                    style={{
                                        float: "left",
                                        width: "220px",
                                        height: "35px",
                                        background: "#dfd",
                                        borderTopLeftRadius: "13px",
                                        borderBottomLeftRadius: "13px",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "12%",
                                            paddingBottom: "5px",
                                        }}
                                        alt={data.teamImage1}
                                        src={data.teamImage1}
                                    />
                                    {data.team1}
                                    &nbsp;
                                    <span style={{ fontWeight: "600" }}>
                                        {data.score1}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        float: "right",
                                        width: "80px",
                                        height: "35px",
                                        background: "#dfd",
                                        // background: `${colorRange(
                                        //     data.prob1
                                        // ).toString()}`,
                                        borderTopRightRadius: "13px",
                                        borderBottomRightRadius: "13px",
                                    }}
                                >
                                    {`${data.prob1}`.substring(2, 4)}%
                                </div>
                            </Row>
                        ) : (
                            <Row>
                                <div
                                    style={{
                                        float: "left",
                                        width: "220px",
                                        height: "35px",
                                        background: "#dcdbd3",
                                        borderTopLeftRadius: "13px",
                                        borderBottomLeftRadius: "13px",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "12%",
                                            paddingBottom: "5px",
                                        }}
                                        alt={data.teamImage1}
                                        src={data.teamImage1}
                                    />
                                    {data.team1}
                                    &nbsp;
                                    <span style={{ fontWeight: "600" }}>
                                        {data.score1}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        float: "right",
                                        width: "80px",
                                        height: "35px",
                                        background: "#dcdbd3",
                                        // background: `${colorRange(
                                        //     data.prob1
                                        // ).toString()}`,
                                        borderTopRightRadius: "13px",
                                        borderBottomRightRadius: "13px",
                                    }}
                                >
                                    {`${data.prob1}`.substring(2, 4)}%
                                </div>
                            </Row>
                        )}
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
                        {data.score2 > data.score1 ? (
                            <Row>
                                <div
                                    style={{
                                        float: "left",
                                        width: "220px",
                                        height: "35px",
                                        background: "#dfd",
                                        borderTopLeftRadius: "13px",
                                        borderBottomLeftRadius: "13px",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "12%",
                                            paddingBottom: "5px",
                                        }}
                                        alt={data.teamImage2}
                                        src={data.teamImage2}
                                    />
                                    {data.team2}
                                    &nbsp;
                                    <span style={{ fontWeight: "600" }}>
                                        {data.score2}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        float: "right",
                                        width: "80px",
                                        height: "35px",
                                        background: "#dfd",
                                        // background: `${colorRange(
                                        //     data.prob2
                                        // ).toString()}`,
                                        borderTopRightRadius: "13px",
                                        borderBottomRightRadius: "13px",
                                    }}
                                >
                                    {`${data.prob2}`.substring(2, 4)}%
                                </div>
                            </Row>
                        ) : (
                            <Row>
                                <div
                                    style={{
                                        float: "left",
                                        width: "220px",
                                        height: "35px",
                                        background: "#dcdbd3",
                                        borderTopLeftRadius: "13px",
                                        borderBottomLeftRadius: "13px",
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "12%",
                                            paddingBottom: "5px",
                                        }}
                                        alt={data.teamImage2}
                                        src={data.teamImage2}
                                    />
                                    {data.team2}
                                    &nbsp;
                                    <span style={{ fontWeight: "600" }}>
                                        {data.score2}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        float: "right",
                                        width: "80px",
                                        height: "35px",
                                        background: "#dcdbd3",
                                        // background: `${colorRange(
                                        //     data.prob2
                                        // ).toString()}`,
                                        borderTopRightRadius: "13px",
                                        borderBottomRightRadius: "13px",
                                    }}
                                >
                                    {`${data.prob2}`.substring(2, 4)}%
                                </div>
                            </Row>
                        )}
                    </div>
                </div>
                {data.probd === 0 ? (
                    <></>
                ) : (
                    <>
                        {data.score1 === data.score2 ? (
                            <div
                                style={{
                                    marginTop: "12px",
                                    background: "#dfd",
                                    // background: `${colorRange(data.probd).toString()}`,
                                    borderRadius: "13px",
                                    border: "2px solid",
                                    // borderColor: `${colorRange(data.probd).toString()}`,
                                    borderColor: "#dfd",
                                    width: "80px",
                                    // height: "35px",
                                    float: "right",
                                    left: "320px",
                                    top: "40px",
                                    position: "absolute",
                                }}
                            >
                                {`${data.probd}`.substring(2, 4)}%
                            </div>
                        ) : (
                            <div
                                style={{
                                    marginTop: "12px",
                                    background: "#dcdbd3",
                                    // background: `${colorRange(data.probd).toString()}`,
                                    borderRadius: "13px",
                                    border: "2px solid",
                                    // borderColor: `${colorRange(data.probd).toString()}`,
                                    borderColor: "#dcdbd3",
                                    width: "80px",
                                    // height: "35px",
                                    float: "right",
                                    left: "320px",
                                    top: "40px",
                                    position: "absolute",
                                }}
                            >
                                {`${data.probd}`.substring(2, 4)}%
                            </div>
                        )}
                    </>
                )}
            </Row>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                <Table
                    sx={{ minWidth: 250, border: "0", boxShadow: "none" }}
                    size="small"
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="right"
                                sx={{
                                    fontSize: "12px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "400",
                                }}
                            >
                                Team Name
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    fontSize: "12px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "400",
                                }}
                            >
                                Adj Goal
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    fontSize: "12px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "400",
                                }}
                            >
                                Shot Based xG
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    fontSize: "12px",
                                    fontFamily: "Montserrat",
                                    fontWeight: "400",
                                }}
                            >
                                Non Shot xG
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows.map((row) => (
                            <TableRow
                                key={row.team}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        fontSize: "12px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "300",
                                    }}
                                    component="th"
                                    scope="row"
                                >
                                    {row.team}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "12px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "300",
                                    }}
                                    align="right"
                                >
                                    {row.adj_score}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "12px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "300",
                                    }}
                                    align="right"
                                >
                                    {row.xg}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "12px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "300",
                                    }}
                                    align="right"
                                >
                                    {row.nsxg}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
