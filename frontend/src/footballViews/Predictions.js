import React, { useState, useEffect } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import { MatchPredictions } from "./MatchPredictions"
import { MatchPredictionsLeague } from "./MatchPredictionsLeague"
import { MatchPredictionsLeagueCompleted } from "./MatchPredictionsLeagueCompleted"

export const Predictions = () => {
    const [leagues, setLeagues] = useState([])
    const [selectedLeague, setSelectedLeague] = useState(
        // "Premier League"
        "All Leagues"
    )
    const [alignment, setAlignment] = useState("upcoming")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/football/getleaguedropdown")
            .then((res) => res.json())
            .then((data) => {
                setLeagues(data)
            })
    }, [])

    const handleDropdownSelectLeague = (e) => {
        // console.log(e.target.value)
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

            {selectedLeague === "All Leagues" ? (
                <MatchPredictions />
            ) : (
                <>
                    <ToggleButtonGroup
                        color="tertiary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton sx={{ border: "2px" }} value="upcoming">
                            Upcoming
                        </ToggleButton>
                        <ToggleButton sx={{ border: "2px" }} value="completed">
                            Completed
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {alignment === "upcoming" ? (
                        <MatchPredictionsLeague league={selectedLeague} />
                    ) : (
                        <MatchPredictionsLeagueCompleted
                            league={selectedLeague}
                        />
                    )}
                </>
            )}
        </div>
    )
}
