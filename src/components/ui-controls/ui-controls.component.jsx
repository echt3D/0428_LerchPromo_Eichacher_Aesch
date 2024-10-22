import { React, useContext, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import { LivestateContext } from "../../context/LivestateContext";
import { StateContext } from "../../context/ProjectDataContext";
import UiSettings from "../ui-settings/uiSettings.component";
import UiNorthArrow from "../ui-north-arrow/uiNorthArrow.component";
import { Button, Chip, useTheme } from "@mui/material";
import { useMediaQuery } from "../../utils/useMediaQuery";

import * as AppSetup from "../../custom/appSetup";

function UiControls() {
  const [state, setState] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);

  const theme = useTheme();

  const isBigScreen = useMediaQuery("(min-width: 640px)");

  // const handleSettingsClick = () => {
  //   console.log("Settings");
  // };

  const handleRotateRightClick = () => {
    const actualIndex = livestate.backgroundImgIndex;
    let newIndex;

    if (AppSetup.is360degree && actualIndex === 0) {
      newIndex = state.project.backgroundImages.length - 1; // Go to the last image
    } else {
      newIndex = Math.max(actualIndex - 1, 0); // Regular right rotation
    }

    setLivestate((prevS) => ({
      ...prevS,
      backgroundImgIndex: newIndex,
    }));
  };

  const handleRotateLeftClick = () => {
    const actualIndex = livestate.backgroundImgIndex;
    let newIndex;

    if (
      AppSetup.is360degree &&
      actualIndex === state.project.backgroundImages.length - 1
    ) {
      newIndex = 0; // Go to the first image
    } else {
      newIndex = Math.min(
        actualIndex + 1,
        state.project.backgroundImages.length - 1
      ); // Regular left rotation
    }

    setLivestate((prevS) => ({
      ...prevS,
      backgroundImgIndex: newIndex,
    }));
  };

  // const handleSidebarToggle = () => {
  //   if (livestate.sidebarVisible === true)
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       sidebarVisible: false,
  //     }));
  //   else
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       sidebarVisible: true,
  //     }));
  // };

  const IconsStyles = {
    PointerEvent: "pointer",
    textAlign: "right",
    width: "calc(100% - 20px)",
    right: "10px",
    position: "absolute",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: isBigScreen ? "center" : "space-between",
    alignItems: "center",
  };

  const FabStyle = { mx: 0.5 };

  return (
    <>
      <Box sx={IconsStyles} style={{ top: "10px" }}>
        {/* <Tooltip title="Sidebar ein/ausschalten" arrow>
          <Fab
            sx={FabStyle}
            aria-label="toggle-sidebar"
            onClick={handleSidebarToggle}
          >
            <ViewSidebarOutlinedIcon />
          </Fab>
        </Tooltip> */}
        <UiSettings />
        {/* <Tooltip title="zur Homepage des Projekts" arrow>
          <Fab
            sx={FabStyle}
            href="https://vip.uetliblick-gattikon.ch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HomeRoundedIcon />
          </Fab>
        </Tooltip> */}

        {/* {state.project.location.url ? (
          <Tooltip title="Google Maps Link" arrow>
            <Fab
              sx={FabStyle}
              aria-label="toggle-sidebar"
              href={state.project.location.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOnRoundedIcon />
            </Fab>
          </Tooltip>
        ) : (
          ""
        )} */}
        {/* <UiSettings /> */}
      </Box>
      <Box sx={IconsStyles} style={{ bottom: "10px" }}>
        <Fab
          sx={FabStyle}
          aria-label="rotate-right"
          onClick={handleRotateRightClick}
        >
          <RotateRightIcon />
        </Fab>
        <UiNorthArrow />
        <Fab
          sx={FabStyle}
          aria-label="rotate-left"
          onClick={handleRotateLeftClick}
        >
          <RotateLeftIcon />
        </Fab>
      </Box>
      <Box
        style={{
          PointerEvent: "pointer",
          textAlign: "right",
          width: "100%",
          bottom: "10px",
          right: "10px",
          position: "absolute",
        }}
      ></Box>
    </>
  );
}

export default UiControls;
