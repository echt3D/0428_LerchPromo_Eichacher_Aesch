import { React, useTheme } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";

import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";
import LineWeightRoundedIcon from "@mui/icons-material/LineWeightRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";

import "./unitInformationGrid.styles.scss";
// import clientTheme from "../../theme/clientTheme";
import baseThemeLight from "../../theme/baseThemeLight";

const UnitInformationGrid = ({ props }) => {
  const gridStyling = {
    "--Grid-borderWidth": "1px",
    borderTop: "var(--Grid-borderWidth) solid",
    borderLeft: "var(--Grid-borderWidth) solid",
    borderColor: "divider",
    "& > div": {
      borderRight: "var(--Grid-borderWidth) solid",
      borderBottom: "var(--Grid-borderWidth) solid",
      borderColor: "divider",
    },
    backgroundColor: baseThemeLight.palette.background.default,
    padding: "0px",
    border: "1px solid black",
    textAlign: "center",
    mt: 2,
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        // sx={gridStyling}
        sx={gridStyling}
      >
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Box sx={{ p: 2 }}>
            <Box>
              <AspectRatioRoundedIcon />
            </Box>
            {props.area} m²
          </Box>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Box sx={{ p: 2 }}>
            <Box>
              <BalconyRoundedIcon />
            </Box>
            {props.terrace_area} m²
          </Box>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Box sx={{ p: 2 }}>
            <Box>
              <KingBedRoundedIcon />
            </Box>
            {props.rooms}
          </Box>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 2 }}>
          <Box sx={{ p: 2 }}>
            <Box>
              <LineWeightRoundedIcon />
            </Box>
            {props.floor}
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Button
          component="a"
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
        >

        </Button>
      </Box>
    </Box>
  );
};

export default UnitInformationGrid;
