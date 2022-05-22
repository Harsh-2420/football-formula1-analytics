import React from "react"
import Box from "@mui/material/Box"

export const FootballHeader = (page) => {
    return (
        <div>
            <Box
                sx={{
                    padding: 4,
                }}
            >
                {page.page === "standings" ? (
                    <h1
                        style={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Football Standings
                    </h1>
                ) : (
                    <h1
                        style={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        Football Predictions
                    </h1>
                )}
            </Box>
        </div>
    )
}
