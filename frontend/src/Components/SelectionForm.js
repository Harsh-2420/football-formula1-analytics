import React, { useEffect, useState } from "react"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    root: {
        width: 160,
        "& .MuiOutlinedInput-input": {
            color: "#8a9c9b",
        },
        "& .MuiInputLabel-root": {
            color: "#8a9c9b",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8a9c9b",
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#8a9c9b",
        },
        "&:hover .MuiInputLabel-root": {
            color: "#8a9c9b",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8a9c9b",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#8a9c9b",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#8a9c9b",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#8a9c9b",
            },
    },
})

export const SelectionForm = ({ selection, data, handleDropdown, input }) => {
    const classes = useStyles()
    return (
        <FormControl
            className={classes.root}
            sx={{
                m: 1,
            }}
        >
            <InputLabel
                sx={{
                    "&.MuiInputLabel-root": {
                        color: "#fff",
                        fontFamily: "Montserrat",
                    },
                }}
                id="demo-simple-select-label"
            >
                {input}
            </InputLabel>
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
