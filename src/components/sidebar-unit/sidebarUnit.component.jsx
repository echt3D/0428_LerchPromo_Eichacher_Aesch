import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardTitleInformation from "../card-title-information/cardTitleInformation.component";

import { useTheme } from "@mui/material";

import "./sidebarUnit.styles.scss";
import { formatPrice } from "../../utils/formatFunctions";
import { shortenFloorNameOrNumber } from "../../utils/shortenFloorNameOrNumber";

import { useMediaQuery } from "../../utils/useMediaQuery";

import * as AppSetup from "../../custom/appSetup";

function SidebarUnit({ props, statustable, className, styling, hasChip }) {
  const theme = useTheme();

  const showPrice = React.useMemo(
    () => statustable[props.state_simplyfied_en]?.price || "0",
    [props.state_simplyfied_en, statustable]
  );
  const status = React.useMemo(
    () => statustable[props.state_simplyfied_en] || "",
    [props.state_simplyfied_en, statustable]
  );

  const chipColor = React.useMemo(
    () => theme.palette.customChipColors[status.colorCode],
    [status.colorCode, theme.palette.customChipColors]
  );
  const chipTextColor = React.useMemo(
    () => theme.palette.customChipTextColor[status.colorCode],
    [status.colorCode, theme.palette.customChipTextColor]
  );

  // if (statustable[props.state_simplyfied_en]) {
  //   showPrice = statustable[props.state_simplyfied_en].price;
  //   status = statustable[props.state_simplyfied_en];
  // }

  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  // const chipColor = theme.palette.customChipColors[status.colorCode];
  // const chipTextColor = theme.palette.customChipTextColor[status.colorCode];

  return (
    <Card>
      <CardContent
        sx={{ pb: 0 }}
        style={{ pointerEvents: isBigScreen ? "auto" : "none" }}
      >
        <CardTitleInformation
          props={props}
          chipColor={chipColor}
          chipTextColor={chipTextColor}
          status={status}
          hasChip={hasChip || false}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            textAlign: "right",
            p: 0.25,
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              {isBigScreen ? "Wohnfläche" : "Wohnfl."}
            </Typography>
            {props.area} m²
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              Geschoss
            </Typography>
            {shortenFloorNameOrNumber(props.floor)}
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              {AppSetup.projectType === "sell" ? "Kaufpreis" : "Bruttomiete"}
            </Typography>
            {AppSetup.projectType === "sell"
              ? showPrice === "1"
                ? formatPrice(props.selling_price, "CHF", true)
                : "--"
              : showPrice === "1"
              ? formatPrice(props.rentalgross, "CHF", true)
              : "--"}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
export default React.memo(SidebarUnit);
