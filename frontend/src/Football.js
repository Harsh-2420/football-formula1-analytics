import * as React from "react"
import { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

import { FootballHeader } from "./footballViews/Header"
import { Predictions } from "./footballViews/Predictions"
import GlobalStandings from "./footballViews/GlobalStandings"
import Standings from "./footballViews/Standings"

import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
    overrides: {
        MuiButton: {
            // Name of the component ⚛️ / style sheet
            root: {
                // Name of the rule
                color: "white", // Some CSS
            },
        },
    },
})

class Formula extends Component {
    render() {
        const myStyle = {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            root: {
                borderRadius: "30px",
            },
        }
        return (
            <div className="App" style={{ fontFamily: "Montserrat" }}>
                <React.Fragment>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <FootballHeader />
                        <GlobalStandings />
                        {/* <Standings /> */}
                    </ThemeProvider>
                </React.Fragment>
            </div>
        )
    }
}

export default Formula
