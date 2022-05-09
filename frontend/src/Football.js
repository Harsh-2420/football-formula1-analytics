import React, { useState } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

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
    const [alignment, setAlignment] = useState("predictions")

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
                    <FootballHeader />

                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="standings">
                            Global Standings
                        </ToggleButton>
                        <ToggleButton value="predictions">
                            Predictions
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {alignment === "standings" ? (
                        <GlobalStandings />
                    ) : (
                        <Predictions />
                    )}
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}
// }
//
// export default Football
