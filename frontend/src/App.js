import "./App.css"
import * as React from "react"
import { DropdownPage } from "./views/DropdownPage"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./views/Header"
import DemoNavbar from "./views/Navbar.js"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import styles from "./styles.js"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#25292f",
            contrast: "#ffff",
        },
        secondary: {
            main: "#ce4219",
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

function App() {
    return (
        <div className="App">
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {/* <Box color="primary.main"> */}
                    <DemoNavbar />
                    {/* <Header /> */}
                    <DropdownPage />
                    {/* </Box> */}
                </ThemeProvider>
            </React.Fragment>
        </div>
    )
}

export default App
