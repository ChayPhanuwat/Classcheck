import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import {
    Dashboard,
    People,
    School,
    Class,
    MenuBook,
    EventNote,
    FactCheck,
    Settings,
    Assessment,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


const drawerWidth = 240;


export default function Sidebar() {

    const navigate = useNavigate();


    const menu = [
        {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/dashboard"
        },
        {
            text: "นักเรียน",
            icon: <People />,
            path: "/students"
        },
        {
            text: "ครู",
            icon: <School />,
            path: "/teachers"
        },
        {
            text: "ห้องเรียน",
            icon: <Class />,
            path: "/classrooms"
        },
        {
            text: "รายวิชา",
            icon: <MenuBook />,
            path: "/subjects"
        },
        {
            text: "ตารางเรียน",
            icon: <EventNote />,
            path: "/schedules"
        },
        {
            text: "เช็กชื่อ",
            icon: <FactCheck />,
            path: "/attendance"
        },
        {
            text: "รายงาน",
            icon: <Assessment />,
            path: "/reports"
        },
        {
            text: "ตั้งค่า",
            icon: <Settings />,
            path: "/settings"
        },
    ];


    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                }
            }}
        >

            <Toolbar />

            <List>

                {
                    menu.map((item) => (

                        <ListItemButton
                            key={item.text}
                            onClick={() =>
                                navigate(item.path)
                            }
                        >

                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>


                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    ))
                }

            </List>

        </Drawer>

    );
}