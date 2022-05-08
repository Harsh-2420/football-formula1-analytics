import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"

export const Header = () => {
    return (
        <div>
            <Box
                sx={{
                    padding: 4,
                    // marginTop: 7,
                    // borderColor: "blue",
                    // borderStyle: "solid",
                }}
            >
                <h1
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    F1 Discover
                </h1>
                {/* <h6
                    style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    for the data buffs
                </h6> */}
            </Box>
        </div>
    )
}
