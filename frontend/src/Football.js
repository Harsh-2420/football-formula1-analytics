import React, { useState } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { NavBar } from "./Components/Navbar"
import { FootballHeader } from "./footballViews/Header"
import { Predictions } from "./footballViews/Predictions"
import GlobalStandings from "./footballViews/GlobalStandings"

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
        tertiary: {
            main: "#019983",
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

export const Football = () => {
    const [alignment, setAlignment] = useState("standings")

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }
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
                    <NavBar />
                    <FootballHeader page={alignment} />

                    <ToggleButtonGroup
                        color="tertiary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton sx={{ border: "2px" }} value="standings">
                            Standings
                        </ToggleButton>
                        <ToggleButton
                            sx={{ border: "2px" }}
                            value="predictions"
                        >
                            Predictions
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {alignment === "standings" ? (
                        <>
                            <GlobalStandings />
                            <div>
                                <p
                                    style={{
                                        color: "black",
                                        height: "10vh",
                                        fontSize: "15px",
                                    }}
                                >
                                    Design and Data from{" "}
                                    <a
                                        style={{
                                            color: "orange",
                                            fontSize: "15px",
                                            textDecoration: "none",
                                        }}
                                        href="https://github.com/fivethirtyeight/data/tree/master/soccer-spi"
                                    >
                                        <span>FiveThirtyEight</span>
                                    </a>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Predictions />
                            <div>
                                <p
                                    style={{
                                        color: "black",
                                        height: "10vh",
                                        fontSize: "15px",
                                    }}
                                >
                                    Design and Data from{" "}
                                    <a
                                        style={{
                                            color: "orange",
                                            fontSize: "15px",
                                            textDecoration: "none",
                                        }}
                                        href="https://github.com/fivethirtyeight/data/tree/master/soccer-spi"
                                    >
                                        <span>FiveThirtyEight</span>
                                    </a>
                                </p>
                            </div>
                        </>
                    )}
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}
// }
//
// export default Football
