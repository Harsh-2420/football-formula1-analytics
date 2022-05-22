import React from "react"
import { Link } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Row, Col } from "react-bootstrap"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import { NavBarLight } from "./Components/NavbarLight"
import f1ContainerImage from "./images/f1-background-2.jpg"
import fbContainerImage from "./images/fb-background.png"
import Background from "./images/tex.jpeg"
import f1 from "./images/F1.png"
import uefa from "./images/uefa"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEarth } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"

export const Home = () => {
    return (
        <div
            className="App"
            style={{
                fontFamily: "Montserrat",
            }}
        >
            <React.Fragment>
                <NavBarLight />
                <div style={{ backgroundColor: "rgb(235, 222, 222)" }}>
                    <Row className="home-box-design-hero">
                        <Col style={{ position: "relative" }}>
                            <p className="home-box-design-text" style={{}}>
                                Profile & other Projects
                            </p>
                            <div className="home-box-design-icons">
                                <FontAwesomeIcon
                                    className="home-box-design-icons-item"
                                    icon={faEarth}
                                    size="2x"
                                />
                                <FontAwesomeIcon
                                    className="home-box-design-icons-item"
                                    icon={faGithub}
                                    size="2x"
                                />
                                <FontAwesomeIcon
                                    className="home-box-design-icons-item"
                                    icon={faLinkedin}
                                    size="2x"
                                />
                            </div>
                        </Col>
                        <Col style={{ position: "relative" }}>
                            <div className="home-box-design-primary"></div>
                            <div className="home-box-design-secondary"></div>
                        </Col>
                    </Row>
                </div>
                <Row
                    className="home-content-box-design"
                    style={{ position: "relative" }}
                >
                    <Link
                        to="/formula"
                        style={{
                            textDecoration: "none",
                            // border: "1px solid black",
                            height: "50vh",
                        }}
                    >
                        <Row
                            className="home-content-box-container"
                            style={{
                                position: "relative",
                                // border: "1px solid blue",
                            }}
                        >
                            <Row
                                className="home-content-section"
                                style={{
                                    position: "relative",
                                    // marginBottom: "5vh",
                                }}
                            >
                                <Col
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <h3
                                        className="home-link-h3"
                                        style={{
                                            position: "absolute",
                                            top: "40%",
                                        }}
                                    >
                                        <img
                                            className="f1-img"
                                            src={f1}
                                            alt={f1}
                                            style={{
                                                width: "25%",
                                                height: "25%",
                                            }}
                                        />
                                        &nbsp; Discover
                                    </h3>
                                </Col>
                                <Col
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <div className="home-content-section-img">
                                        <img
                                            style={{
                                                width: "60%",
                                                height: "100%",
                                                borderRadius: "20px",
                                            }}
                                            src={f1ContainerImage}
                                            alt={f1ContainerImage}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Link>
                    <Link
                        to="/football"
                        style={{
                            marginTop: "-15vh",
                            textDecoration: "none",
                            // border: "1px solid red",
                            height: "50vh",
                        }}
                    >
                        <Row
                            className="home-content-box-container"
                            style={{
                                position: "relative",
                            }}
                        >
                            <Row
                                className="home-content-section"
                                style={{
                                    backgroundColor: "rgb(35, 169, 151)",
                                    position: "relative",
                                    // marginTop: "5vh",
                                }}
                            >
                                <Col
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <h3
                                        className="home-link-h3"
                                        style={{
                                            position: "absolute",
                                            top: "30%",
                                        }}
                                    >
                                        <img
                                            className="f1-img"
                                            src={uefa}
                                            alt={uefa}
                                            style={{
                                                width: "25%",
                                                height: "25%",
                                            }}
                                        />
                                        &nbsp; Football
                                    </h3>
                                </Col>
                                <Col
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        className="home-content-section-img"
                                        style={{
                                            backgroundColor:
                                                "rgb(35, 169, 151)",
                                        }}
                                    >
                                        {" "}
                                        <img
                                            style={{
                                                width: "60%",
                                                height: "100%",
                                                borderRadius: "20px",
                                            }}
                                            src={fbContainerImage}
                                            alt={fbContainerImage}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Link>
                </Row>
            </React.Fragment>
        </div>
    )
}
