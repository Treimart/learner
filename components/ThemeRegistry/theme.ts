import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#647360",
      dark: "#142625",
    },
    secondary: {
      main: "#BF6836",
      light: "#F4AD57",
    },
    background: {
      default: "#8658F8"
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: 57,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: '30px'
    },
    h2: {
      fontSize: 44,
      fontWeight: 300,
      lineHeight: 1.25,
      marginBottom: '20px',
      marginTop: '15px'
    },
    h3: {
      fontSize: 25,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: '15px'
    },
    h4: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: '10px'
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: 1.25,
      marginTop: '10px',
      marginBottom: '10px'
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#C09665",
          }),
        }),
      },
    },
  },
});

export default theme;
