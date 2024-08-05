"use client";

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Inventory", icon: <InventoryIcon /> },
    { text: "Settings", icon: <SettingsIcon />},
  ];

  return (
    <Box sx={styles.sidebar}>
      <Typography variant="h5" sx={styles.title}>
        Pantry Tracker
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem
            ListItemButton
            key={item.text}
            component="a"
            href={item.path}
            sx={styles.listItem}
          >
            <ListItemIcon sx={styles.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={styles.listItemText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    width: "250px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRight: "1px solid rgba(255, 255, 255, 0.3)",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "16px",
    color: "#2c3e50",
  },
  listItem: {
    margin: "8px 0",
    color: "#2c3e50",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
  listItemIcon: {
    color: "#2c3e50",
  },
  listItemText: {
    color: "#2c3e50",
  },
};

export default Sidebar;
