import * as React from "react"
import "../App.css"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import RestoreIcon from "@mui/icons-material/Restore"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ArchiveIcon from "@mui/icons-material/Archive"
import Paper from "@mui/material/Paper"
import Backdrop from "@mui/material/Backdrop"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import { makeStyles } from "@material-ui/styles"

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0)
    const ref = React.useRef(null)

    return (
        // <Box sx={{ pb: 7, borderColor: "red", borderStyle: "solid" }}>
        <Paper
            sx={{
                // color="transparent",
                // backdropFilter: "blur(20px)",
                position: "fixed",
                bottom: 30,
                left: 500,
                right: 500,
            }}
            elevation={3}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    label="Recents"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="Archive"
                    icon={<ArchiveIcon />}
                />
            </BottomNavigation>
        </Paper>
        // </Box>
    )
}

// import * as React from "react"
// import AppBar from "@mui/material/AppBar"
// import Box from "@mui/material/Box"
// import Toolbar from "@mui/material/Toolbar"
// import Typography from "@mui/material/Typography"
// import Button from "@mui/material/Button"
// import IconButton from "@mui/material/IconButton"
// import MenuIcon from "@mui/icons-material/Menu"

// export default function DemoNavbar() {
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Toolbar>
//                     {/* <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton> */}
//                     <Typography
//                         variant="h6"
//                         component="div"
//                         sx={{ flexGrow: 1 }}
//                     >
//                         F1 Discover
//                     </Typography>
//                     {/* <Button color="inherit">Login</Button> */}
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     )
// }
