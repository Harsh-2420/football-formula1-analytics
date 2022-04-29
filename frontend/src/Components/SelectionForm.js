import React, { useEffect, useState } from "react"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

export const SelectionForm = ({ selection, data, handleDropdown, input }) => {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">{input}</InputLabel>
            <Select
                classes={{
                    outlinedSecondary: { color: "secondary" },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selection || ""}
                label="Year"
                onChange={handleDropdown}
            >
                {data.map((year) => (
                    <MenuItem value={year.content} key={year.id}>
                        {year.content}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
