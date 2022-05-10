import React, { useState, useEffect } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import { LeaguePredictions } from "./LeaguePredictions"
import { MatchPredictions } from "./MatchPredictions"
// import { MatchPredictionsLeague } from "./MatchPredictionsLeague"

export const Predictions = () => {
    const [leagues, setLeagues] = useState([])
    const [selectedLeague, setSelectedLeague] = useState("All Leagues")
    const [alignment, setAlignment] = useState("matches")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getleaguedropdown")
            .then((res) => res.json())
            .then((data) => {
                setLeagues(data)
            })
    }, [])

    const handleDropdownSelectLeague = (e) => {
        console.log(e.target.value)
        setSelectedLeague(e.target.value)
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    return (
        <div>
            <br></br>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">League</InputLabel>
                <Select
                    classes={{
                        outlinedSecondary: { color: "secondary" },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLeague || ""}
                    label="Year"
                    onChange={handleDropdownSelectLeague}
                >
                    {leagues.map((year) => (
                        <MenuItem value={year.content} key={year.id}>
                            {year.content}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ToggleButtonGroup
                color="tertiary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton sx={{ border: "2px" }} value="league">
                    Leagues
                </ToggleButton>
                <ToggleButton sx={{ border: "2px" }} value="matches">
                    Matches
                </ToggleButton>
            </ToggleButtonGroup>

            {/* {(() => {
                if (alignment === "matches") return <MatchPredictions />
                else return <LeaguePredictions />
            })()} */}
            {alignment === "matches" ? (
                <>
                    {selectedLeague === "All Leagues" ? (
                        <MatchPredictions />
                    ) : (
                        "Hello"
                    )}
                </>
            ) : (
                <LeaguePredictions />
            )}
        </div>
    )
}
