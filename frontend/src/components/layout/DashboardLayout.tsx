import {
  Box,
  Toolbar
} from "@mui/material";

import {
  Outlet
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardLayout() {

  return (

    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Topbar />


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >

        <Toolbar />

        <Outlet />

      </Box>


    </Box>

  );

}