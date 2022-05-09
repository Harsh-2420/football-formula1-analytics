import React, { useState } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { LeaguePredictions } from "./LeaguePredictions"
import { MatchPredictions } from "./MatchPredictions"

export const Predictions = () => {
    const [alignment, setAlignment] = useState("matches")

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }
    return (
        <div>
            <br></br>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="league">Leagues</ToggleButton>
                <ToggleButton value="matches">Matches</ToggleButton>
            </ToggleButtonGroup>
            {alignment === "matches" ? (
                <MatchPredictions />
            ) : (
                <LeaguePredictions />
            )}
        </div>
    )
}
