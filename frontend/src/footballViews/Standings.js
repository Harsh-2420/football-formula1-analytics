// import * as React from "react"
// import Table from "@mui/material/Table"
// import TableBody from "@mui/material/TableBody"
// import TableCell from "@mui/material/TableCell"
// import TableContainer from "@mui/material/TableContainer"
// import TableHead from "@mui/material/TableHead"
// import TableRow from "@mui/material/TableRow"
// import Paper from "@mui/material/Paper"
// // import { withStyles } from "@material-ui/core/styles"
// import { withStyles } from "@mui/styles"
// import PropTypes from "prop-types"

// const styles = {
//     tablecell: {
//         fontWeight: "bold",
//         color: "red",
//     },
// }

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein }
// }

// const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
// ]

// function BasicTable(props) {
//     const { classes } = props

//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Dessert (100g serving)</TableCell>
//                         <TableCell align="right">Calories</TableCell>
//                         <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow
//                             key={row.name}
//                             sx={{
//                                 "&:last-child td, &:last-child th": {
//                                     border: 0,
//                                 },
//                             }}
//                         >
//                             <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell>
//                             <TableCell
//                                 className={classes.tablecell}
//                                 align="right"
//                             >
//                                 {row.calories}
//                             </TableCell>
//                             <TableCell align="right">{row.fat}</TableCell>
//                             <TableCell align="right">{row.carbs}</TableCell>
//                             <TableCell align="right">{row.protein}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     )
// }

// BasicTable.propTypes = {
//     classes: PropTypes.object.isRequired,
// }

// export default withStyles(styles)(BasicTable)

import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { withStyles } from "@mui/styles"
import PropTypes from "prop-types"
import Button from "@mui/material/Button"

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
]

function HigherOrderComponent(props) {
    const { classes } = props
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
                                {row.name}
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontWeight: 500,
                                }}
                                className={classes.root}
                                align="right"
                            >
                                {row.calories}
                            </TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        // <Button
        //     className={classes.root}
        //     sx={{
        //         color: "white",
        //         fontWeight: "bold",
        //         fontFamily: "Montserrat",
        //     }}
        // >
        //     Higher-order component
        // </Button>
    )
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HigherOrderComponent)
