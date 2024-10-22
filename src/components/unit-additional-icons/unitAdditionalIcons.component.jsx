import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import createFlatIcons from "./../../utils/createFlatIcons";

import DeckIconRounded from "@mui/icons-material/Deck";
import BalconyIconRounded from "@mui/icons-material/Balcony";
import WarehouseIconRounded from "@mui/icons-material/Warehouse";
import TourIconRounded from "@mui/icons-material/Tour";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import { StateContext } from "../../context/ProjectDataContext";
import { useMediaQuery } from "../../utils/useMediaQuery";

const icons = {
  has_tour: TourIconRounded,
  has_cellar: WarehouseIconRounded,
  terrace: BalconyIconRounded,
  garden_sitting_place: DeckIconRounded,
  balcony: CalendarViewWeekIcon,
};
const dsc = {
  has_tour: "3D-Rundgang",
  has_cellar: "Kellerabteil",
  terrace: "Terrasse",
  garden_sitting_place: "Sitzplatz / Garten",
  balcony: "Balkon",
};

const UnitAdditionalIcons = ({ unit }) => {
  const [state] = useContext(StateContext);
  const iconsArray = createFlatIcons(unit, state);
  const isBigScreen = useMediaQuery("(min-width: 640px)");

  return isBigScreen ? (
    <>
      <Box
        sx={{
          display: isBigScreen ? "inline-flex" : "flex",
          height: "32px",
          verticalAlign: "middle",
          alignItems: "center",
          px: isBigScreen ? 0.5 : 0,
          pt: isBigScreen ? 0 : 1,
        }}
      >
        {iconsArray.map((iconName, i) =>
          icons[iconName] ? (
            <Tooltip key={i} title={dsc[iconName]}>
              <Box
                sx={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  py: "2px",
                  px: "4px",
                  mx: 0.5,
                }}
              >
                {React.createElement(icons[iconName])}
              </Box>
            </Tooltip>
          ) : (
            ""
          )
        )}
      </Box>
    </>
  ) : (
    ""
  );
};

export default UnitAdditionalIcons;
