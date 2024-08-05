"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Dynamically import RouterLink for client-side navigation
const RouterLink = dynamic(() => import("next/link"), { ssr: false });

// Mock path for home
const paths = {
  home: "/",
};

// Mock Logo component
function Logo({ color, height, width }) {
  return (
    <div style={{ color, height, width }}>
      <svg height={height} width={width} viewBox="0 0 100 100">
        <text x="10" y="50" fill={color}>
          Logo
        </text>
      </svg>
    </div>
  );
}

function SideNav() {
  return (
    <Box
      sx={{
        "--SideNav-background": "var(--mui-palette-neutral-950)",
        "--SideNav-color": "var(--mui-palette-common-white)",
        bgcolor: "var(--SideNav-background)",
        color: "var(--SideNav-color)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100%",
        left: 0,
        maxWidth: "100%",
        position: "fixed",
        scrollbarWidth: "none",
        top: 0,
        width: "var(--SideNav-width)",
        zIndex: "var(--SideNav-zIndex)",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          component={RouterLink}
          href={paths.home}
          sx={{ display: "inline-flex" }}
        >
          <Logo color="light" height={32} width={122} />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "var(--mui-palette-neutral-950)",
            border: "1px solid var(--mui-palette-neutral-700)",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            p: "4px 12px",
          }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
              Workspace
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              Devias
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Button
          component="a"
          fullWidth
          href="https://material-kit-pro-react.devias.io/"
          target="_blank"
          variant="contained"
        >
          Custom Button
        </Button>
      </Stack>
    </Box>
  );
}

export default SideNav;