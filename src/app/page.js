"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Navbar from "./components/navbar";
import Dashboard from "./dashboard/page";



const HomePage = () => {

  return (
    <Box >
     <Navbar/>
     <Dashboard></Dashboard>
    </Box>
  );
};

export default HomePage;
