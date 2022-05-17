import React, { useState, useEffect } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import MuiToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
// import Background from "./images/tina-dawson-Kim9COAIEGc-unsplash.jpg"
import Background from "./images/tex.jpeg"

import { Header } from "./formulaViews/Header"
import { DropdownPage } from "./formulaViews/DropdownPage"
import { LapTime } from "./formulaViews/LapTime"
import { SpeedDistance } from "./formulaViews/SpeedDistance"
import { Analysis } from "./formulaViews/Analysis"

import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

const ToggleButton = styled(MuiToggleButton)(() => ({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "#8a9c9b",
    },
    "&.MuiToggleButton-primary": { color: "white", fontFamily: "Montserrat" },
}))
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
})

export const Formula = () => {
    const [alignment, setAlignment] = useState("analysis")

    const myStyle = {
        backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        root: {
            borderRadius: "30px",
        },
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }
    return (
        <div
            className="App"
            style={{
                fontFamily: "Montserrat",
                backgroundImage: `url(${Background})`,
                height: "100%",
                backgroundSize: "150px 150px",
            }}
        >
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header />

                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton
                            sx={{
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    color: "#8a9c9b",
                                },
                                border: "2px",
                            }}
                            value="telemetry"
                        >
                            Telemetry
                        </ToggleButton>
                        <ToggleButton
                            sx={{
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    color: "#8a9c9b",
                                },
                                border: "2px",
                            }}
                            value="analysis"
                        >
                            Analysis
                        </ToggleButton>
                        <ToggleButton
                            sx={{
                                "&.Mui-selected, &.Mui-selected:hover": {
                                    color: "#8a9c9b",
                                },
                                border: "2px",
                            }}
                            // selected={true}
                            value="model"
                        >
                            Model
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <br></br>
                    <br></br>
                    {alignment === "telemetry" ? (
                        <>
                            {/* <Navbar /> */}
                            <DropdownPage />
                            <LapTime />
                            <SpeedDistance />
                        </>
                    ) : (
                        <>
                            {alignment === "analysis" ? (
                                <Analysis />
                            ) : (
                                <>Hello Model</>
                            )}
                        </>
                    )}
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}
