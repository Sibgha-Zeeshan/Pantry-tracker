import { createTheme } from "@mui/material/styles";

const primaryColor = "#bdc3c7";
const secondaryColor = "#7f8c8d";
const errorColor = "#f44336";
const backgroundColor = "#ecf0f1";
const textColor = "#2c3e50";
const sectextcolor = "#95a5a6";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: errorColor,
    },
    background: {
      default: backgroundColor,
    },
    text: {
      primary: textColor,
      secondary: sectextcolor,
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
