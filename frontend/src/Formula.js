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

import { NavBar } from "./Components/Navbar"
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
        color: "#fff",
    },
    "&.MuiToggleButton-primary": { color: "#8a9c9b", fontFamily: "Montserrat" },
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
                height: "70vh",
                backgroundSize: "150px 150px",
            }}
        >
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar />
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
                                    color: "#fff",
                                    fontWeight: "bold",
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
                                    color: "#fff",
                                    fontWeight: "bold",
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
                                    color: "#fff",
                                    fontWeight: "bold",
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
                            <p style={{ color: "#8a9c9b" }}>
                                Here, you can create F1 lap time and telemetry
                                charts using the selection boxes below.
                                <br></br>
                            </p>
                            <DropdownPage />
                            <LapTime />
                            <SpeedDistance />
                            <div
                                style={{
                                    // fontFamily: "Montserrat",
                                    backgroundImage: `url(${Background})`,
                                    // height: "200vh",
                                    backgroundSize: "150px 150px",
                                }}
                            >
                                <p
                                    style={{
                                        color: "#8a9c9b",
                                        height: "10vh",
                                        fontSize: "15px",
                                    }}
                                >
                                    Inspired from{" "}
                                    <a
                                        style={{
                                            color: "orange",
                                            fontSize: "15px",
                                            textDecoration: "none",
                                        }}
                                        href="http://f1-tempo.com"
                                    >
                                        <span>F1 Tempo</span>
                                    </a>
                                    <br></br>
                                    <br></br>
                                    Data from Fast{" "}
                                    <a
                                        style={{
                                            color: "orange",
                                            fontSize: "15px",
                                            textDecoration: "none",
                                        }}
                                        href="https://theoehrly.github.io/Fast-F1/"
                                    >
                                        <span>Fast F1</span>
                                    </a>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            {alignment === "analysis" ? (
                                <>
                                    <p style={{ color: "#8a9c9b" }}>
                                        See some of the initial analysis I did
                                        from historic race data.
                                    </p>
                                    <Analysis />
                                    <div
                                        style={{
                                            // fontFamily: "Montserrat",
                                            backgroundImage: `url(${Background})`,
                                            // height: "200vh",
                                            backgroundSize: "150px 150px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: "#8a9c9b",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {" "}
                                            In Progress: Further Analysis on
                                            locations and home race advantages.
                                            Also, I will add customisations for
                                            you to control the data like in
                                            telemetry.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            backgroundImage: `url(${Background})`,
                                            // height: "30vh",
                                            backgroundSize: "150px 150px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: "#8a9c9b",
                                                width: "60%",
                                            }}
                                        >
                                            Check out the Machine Learning model
                                            I built using historic race data.
                                            <br></br>
                                            <p style={{ padding: "10px" }}>
                                                Unfortunately, F1 does not give
                                                the public access to data on
                                                tires, fuel, aerodynamics, live
                                                speed and other changes. So, the
                                                model I built uses historical
                                                race data. I combined data on
                                                weather, track, driver and
                                                constructors creating "scores"
                                                for each race and its
                                                correlation with each driver and
                                                constructor.
                                            </p>
                                            <p style={{}}>
                                                I performed extensive data
                                                analysis and feature engineering
                                                to find which variables are
                                                important in determining a race
                                                win and assigned weights to
                                                drivers, tracks and constructors
                                                accordingly.
                                            </p>
                                            <p style={{}}>
                                                Furthemore, I used the lap times
                                                of all drivers in each race and
                                                the best qualifying times in
                                                each session as well. This data
                                                is relatively sparse since we
                                                only have data from 2008 for
                                                this section.
                                            </p>
                                            <p style={{}}>
                                                Following this, I used tested
                                                several models including Linear
                                                Regression, Support Vector
                                                Machines, Random Forests,
                                                Gradient Boosting and Deep
                                                Neural Networks. Since we are
                                                predicting final race positions,
                                                it could also be considered a
                                                classification problem. So, I
                                                considered the above models as a
                                                classification problem as well.
                                            </p>
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            backgroundImage: `url(${Background})`,
                                            height: "28vh",
                                            backgroundSize: "150px 150px",
                                        }}
                                    >
                                        {/* <FormulaModel/> */}
                                        <p
                                            style={{
                                                color: "#8a9c9b",
                                                height: "10vh",
                                                fontSize: "15px",
                                            }}
                                        >
                                            Data from{" "}
                                            <a
                                                style={{
                                                    color: "orange",
                                                    fontSize: "15px",
                                                    textDecoration: "none",
                                                }}
                                                href="http://ergast.com/mrd/"
                                            >
                                                <span>Ergast API</span>
                                            </a>
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}
