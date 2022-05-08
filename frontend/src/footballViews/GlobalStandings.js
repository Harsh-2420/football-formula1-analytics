import React, { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    tablecell: {
        fontWeight: "bold",
        color: "red",
    },
})

function GlobalStandings(props) {
    const [rows, setRows] = useState([])
    // const { classes } = props

    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getglobalrankings")
            .then((res) => res.json())
            .then((data) => {
                console.log("football global ranks:", data)
                setRows(data)
            })
    }, [])
    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank </TableCell>
                            <TableCell align="right">Change</TableCell>
                            <TableCell align="right">Team</TableCell>
                            <TableCell align="right">League</TableCell>
                            <TableCell align="right">Offense</TableCell>
                            <TableCell align="right">Defense</TableCell>
                            <TableCell align="right">SPI</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.rank}
                                </TableCell>
                                <TableCell align="right">
                                    {row.Change}
                                </TableCell>
                                <TableCell
                                    // className={classes.tablecell}
                                    align="right"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.league}
                                </TableCell>
                                <TableCell align="right">{row.off}</TableCell>
                                <TableCell align="right">{row.def}</TableCell>
                                <TableCell align="right">
                                    {Math.round(`${row.spi}` * 10) / 10}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default withStyles(styles)(GlobalStandings)
// export default GlobalStandings
