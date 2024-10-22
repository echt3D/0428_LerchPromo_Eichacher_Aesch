import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import E3DApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import ProjectData from "./context/ProjectDataContext";
import Livestate from "./context/LivestateContext";
import baseThemeLight from "./theme/baseThemeLight";
import { FavoritesProvider } from "./context/FavoriteContext";

const root = ReactDOM.createRoot(document.getElementById("e3d-app-root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={baseThemeLight}>
    <Livestate>
      <ProjectData>
        <FavoritesProvider>
          <E3DApp />
        </FavoritesProvider>
      </ProjectData>
    </Livestate>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
