import { React, useTheme, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";
import LineWeightRoundedIcon from "@mui/icons-material/LineWeightRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";

import { useMediaQuery } from "../../utils/useMediaQuery";
import { shortenFloorNameOrNumber } from "../../utils/shortenFloorNameOrNumber";

import "./unitInformationGrid.styles.scss";
// import clientTheme from "../../theme/clientTheme";
import baseThemeLight from "../../theme/baseThemeLight";

import { formatPrice } from "../../utils/formatFunctions";
import checkBalconyTerrace from "../../utils/checkBalconyTerrace";

import * as AppSetup from "../../custom/appSetup";

const UnitInformationGrid = ({ props, statustable }) => {
  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  // const showPrice = React.useMemo(
  //   () => statustable[props.state_simplyfied_en]?.price || "0",
  //   [props.state_simplyfied_en, statustable]
  // );
  const showPrice = statustable[props.state_simplyfied_en]?.price || "0";

  const { exportName, exportArea } = checkBalconyTerrace(
    props.garden_sitting_place_area,
    props.terrace_area,
    props.loggia_area
  );

  const BoxStyling = {
    mt: isBigScreen ? 1.5 : 0.75,
    width: isBigScreen ? "100%" : "50%",
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: isBigScreen ? "block" : "flex",
        flexWrap: "wrap",
      }}
    >
      <Box sx={BoxStyling}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Wohnfläche
        </Typography>
        <Typography variant="h5">{props.area} m²</Typography>
      </Box>
      {props.garden_sitting_place_area > 0 ? (
        <Box sx={BoxStyling}>
          <Typography
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontSize: "12px" }}
          >
            Gartenfläche
          </Typography>
          <Typography variant="h5">
            {props.garden_sitting_place_area} m²
          </Typography>
        </Box>
      ) : (
        ""
      )}
      {props.balcony > 0 ? (
        <Box sx={BoxStyling}>
          <Typography
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontSize: "12px" }}
          >
            Balkonfläche
          </Typography>
          <Typography variant="h5">{props.balcony} m²</Typography>
        </Box>
      ) : (
        ""
      )}
      <Box sx={BoxStyling}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Geschoss
        </Typography>
        <Typography variant="h5">
          {shortenFloorNameOrNumber(props.floor)}
        </Typography>
      </Box>
      {/* <Box sx={BoxStyling}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          {exportName}
        </Typography>
        <Typography variant="h5">{exportArea} m²</Typography>
      </Box> */}
      {AppSetup.projectType === "sell" ? (
        ""
      ) : (
        <Box sx={BoxStyling}>
          <Typography
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontSize: "12px" }}
          >
            Bruttomiete
          </Typography>
          <Typography variant="h5">
            {formatPrice(props.rentalgross, "CHF", true)}
          </Typography>
        </Box>
      )}
      <Box sx={BoxStyling}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          {AppSetup.projectType === "sell" ? "Kaufpreis" : "Nettomiete"}
        </Typography>

        <Typography variant="h5">
          {AppSetup.projectType === "sell"
            ? showPrice === "1"
              ? formatPrice(props.selling_price, "CHF", true)
              : "--"
            : showPrice === "1"
            ? formatPrice(props.rentalgross, "CHF", true)
            : "--"}
        </Typography>
      </Box>
      {/* <Box sx={BoxStyling}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Nebenkosten
        </Typography>
        <Typography variant="h5">
          {formatPrice(props.incidentals, "CHF", true)}
        </Typography>
      </Box> */}
    </Box>
  );
};

export default UnitInformationGrid;
