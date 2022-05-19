import React from "react"
import { Link } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import Background from "./images/tex.jpeg"
import f1 from "./images/F1.png"
import uefa from "./images/uefa"

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
})

export const Home = () => {
    return (
        <div
            className="App"
            style={{
                fontFamily: "Montserrat",
                backgroundImage: `url(${Background})`,
                height: "200vh",
                backgroundSize: "150px 150px",
            }}
        >
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <br></br>
                    <div
                        className="home-container-box"
                        style={{ marginTop: "3vw" }}
                    >
                        <p
                            className="home-container-text"
                            style={{ marginLeft: "3vw" }}
                        >
                            Check out the Formula 1 Analytics and Predictions at
                        </p>
                        <Link to="/formula" style={{ textDecoration: "none" }}>
                            <h3
                                className="home-link-h3"
                                style={{ width: "30%" }}
                            >
                                <img
                                    className="f1-img"
                                    src={f1}
                                    alt={f1}
                                    style={{
                                        width: "25%",
                                        height: "25%",
                                        // float: "left",
                                    }}
                                />
                                &nbsp; Discover
                            </h3>
                        </Link>
                    </div>
                    <br></br>
                    <div className="home-container-box">
                        <p className="home-container-text">
                            Check out the Football Analytics and Predictions at
                        </p>
                        <Link to="/football" style={{ textDecoration: "none" }}>
                            <h3
                                className="home-link-h3"
                                style={{ width: "30%" }}
                            >
                                <img
                                    className="uefa-img"
                                    src={uefa}
                                    alt={uefa}
                                    style={{
                                        width: "25%",
                                        height: "25%",
                                        // float: "left",
                                    }}
                                />
                                &nbsp; Football
                            </h3>
                        </Link>
                    </div>
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}
