import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    fontSize: 16,
  },
  palette: {
    primary: {
      light: '#41A0A3',
      main: "#0000FF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF0000",
    },
  },
  pagination: {
    fontFamily: 'Times New Roman',
  }
});

export default theme;