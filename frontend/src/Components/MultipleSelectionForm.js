import React, { useEffect, useState } from "react"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import Chip from "@mui/material/Chip"
import { useTheme } from "@mui/material/styles"
import { makeStyles } from "@material-ui/core/styles"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const useStyles = makeStyles({
    root: {
        width: 200,
        "& .MuiOutlinedInput-input": {
            color: "#fff",
        },
        "& .MuiInputLabel-root": {
            color: "#fff",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export const MultipleSelectionForm = ({
    selection,
    data,
    handleDropdown,
    input,
}) => {
    const theme = useTheme()
    const classes = useStyles()
    return (
        <FormControl sx={{ m: 1, minWidth: 220 }} className={classes.root}>
            <InputLabel
                sx={{
                    "&.MuiInputLabel-root": {
                        color: "#fff",
                        fontFamily: "Montserrat",
                    },
                }}
                id="demo-multiple-chip-label"
            >
                Driver
            </InputLabel>
            <Select
                multiple
                value={selection}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                label="Age"
                onChange={handleDropdown}
                input={
                    <OutlinedInput
                        sx={{
                            color: "#fff",
                            "&.MuiOutlinedInput-root": {
                                color: "#fff",
                                fontFamily: "Montserrat",
                            },
                        }}
                        id="select-multiple-chip"
                        label="Chip"
                    />
                }
                renderValue={(selected) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                        }}
                    >
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {data.map((driver) => (
                    <MenuItem
                        value={driver.content}
                        key={driver.id}
                        style={getStyles(driver.content, selection, theme)}
                    >
                        {driver.content}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
