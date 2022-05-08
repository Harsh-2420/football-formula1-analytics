import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"

export const FootballHeader = () => {
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
                        color: "black",
                    }}
                >
                    Football Predictions
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
