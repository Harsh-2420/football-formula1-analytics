import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import f1 from "../images/F1.png"
import "../App.css"

export const Header = () => {
    return (
        <div>
            <Box
                sx={{
                    padding: 4,
                }}
            >
                <h1
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    <img
                        className="f1-img"
                        src={f1}
                        alt={f1}
                        style={{
                            width: "10%",
                            height: "10%",
                        }}
                    />
                    &nbsp; Discover
                </h1>
            </Box>
        </div>
    )
}
