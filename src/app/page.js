"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
// import Sidebar from "./components/page";
import SideNav from "./components/sidebar";
import Navbar from "./components/navbar";



const HomePage = () => {

  return (
    <Box >
     {/* <Sidebar/> */}
     <SideNav/>
     <Navbar/>
    </Box>
  );
};

export default HomePage;
