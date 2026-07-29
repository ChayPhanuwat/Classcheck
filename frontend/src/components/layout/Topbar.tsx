import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";

import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";


const drawerWidth = 240;


export default function Topbar() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );


    const handleMenu = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <AppBar
            position="fixed"
            sx={{
                width:`calc(100% - ${drawerWidth}px)`,
                ml:`${drawerWidth}px`,
            }}
        >

            <Toolbar>


                <Typography
                    variant="h6"
                    sx={{
                        flexGrow:1
                    }}
                >
                    ClassCheck
                </Typography>



                <Box>

                    <IconButton
                        onClick={handleMenu}
                        color="inherit"
                    >

                        <Avatar>
                            {
                                user.username
                                ?.charAt(0)
                                ?.toUpperCase()
                            }
                        </Avatar>

                    </IconButton>


                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <MenuItem disabled>
                            {user.username}
                        </MenuItem>


                        <MenuItem
                            onClick={logout}
                        >
                            Logout
                        </MenuItem>


                    </Menu>


                </Box>


            </Toolbar>


        </AppBar>

    );
}