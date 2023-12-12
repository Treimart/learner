import { createTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

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
    fontFamily: ["roboto", "sans-serif"].join(","),
    h1: {
      fontSize: 57,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: "30px"
    },
    h2: {
      fontSize: 44,
      fontWeight: 300,
      lineHeight: 1.25,
      marginBottom: "20px",
      marginTop: "15px"
    },
    h3: {
      fontSize: 25,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: "15px"
    },
    h4: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.25,
      marginBottom: "10px"
    },
    subtitle1: {
      fontWeight: 400,
      lineHeight: 1.25,
      marginTop: "10px",
      marginBottom: "10px"
    },
    button: {
      fontWeight: 600
    }
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        TransitionComponent: Zoom,
      },
      styleOverrides: {
        tooltip: {
          maxWidth: "120px",
          textAlign: "center",
        }
      }
    },
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
