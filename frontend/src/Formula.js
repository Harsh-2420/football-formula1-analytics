import * as React from "react"
import { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

import { Header } from "./formulaViews/Header"
import { DropdownPage } from "./formulaViews/DropdownPage"
import { LapTime } from "./formulaViews/LapTime"
import { SpeedDistance } from "./formulaViews/SpeedDistance"

import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#8a9c9b",
        },
        secondary: {
            main: "#ffa726",
            light: "#ff4a13",
        },
        background: {
            default: "#25292f",
            paper: "#37373d",
        },
        error: {
            main: "#ad2424",
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: "h2",
                    h2: "h2",
                    h3: "h2",
                    h4: "h2",
                    h5: "h2",
                    h6: "h2",
                    subtitle1: "h2",
                    subtitle2: "h2",
                    body1: "span",
                    body2: "span",
                },
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
                        <Header />
                        {/* <Navbar /> */}
                        <DropdownPage />
                        {/* <Suspense fallback={<DropdownPage />}> */}
                        {/* <LapTime /> */}
                        <SpeedDistance />
                        {/* </Suspense> */}
                    </ThemeProvider>
                </React.Fragment>
            </div>
        )
    }
}

export default Formula
