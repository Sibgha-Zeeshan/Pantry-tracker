// Global UI shared across all the application
"use client"; // This ensures the component is rendered on the client

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme"; // Adjust the path if necessary
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./auth/authcontext";
import "./global.css";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
