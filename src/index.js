import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: { type: "dark" },
});

const body = (
  // <ThemeProvider theme={theme}>
  //   <CssBaseline />
    <App />
  // </ThemeProvider>
);

ReactDOM.render(body, document.getElementById("root"));
