import { React, useState, useContext, useEffect } from "react";
import "./infobar.styles.scss";
import * as AppSetup from "../../custom/appSetup";

import Lightbox from "../lightbox/lighbox.component";

import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";

import CardTitleInformation from "../card-title-information/cardTitleInformation.component";
import { Box, Button, useTheme } from "@mui/material";
import UnitInformationGrid from "../unit-information-grid/unitInformationGrid.component";
import CloseModal from "../close-modal/closeModal.component";

import PanoramaHorizontalRoundedIcon from "@mui/icons-material/PanoramaHorizontalRounded";
import BorderStyleRoundedIcon from "@mui/icons-material/BorderStyleRounded";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { getProjectPlans } from "../../utils/getProjectPlans";

const Overlay = ({ onClick, visible }) => {
  return (
    <div
      className={`overlay ${visible ? "visible" : "hidden"}`}
      onClick={onClick}
    />
  );
};

const Infobar = ({
  lightboxData,
  lightboxOpen,
  setLightboxOpen,
  setLightboxData,
}) => {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [sidebarWidth] = useState(state.config.ui.sidebarWidth);
  const statustable = state.project.settings.statustable;

  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  let status1,
    status2 = "";

  const baseThemeLight = useTheme();
  let chipColor1 = "lightgrey",
    chipColor2 = "lightgrey",
    chipTextColor1 = "black",
    chipTextColor2 = "black",
    url1,
    url2;

  if (livestate.infobar1Obj && livestate.infobar1Obj.state_simplyfied_en) {
    if (statustable[livestate.infobar1Obj.state_simplyfied_en]) {
      status1 = statustable[livestate.infobar1Obj.state_simplyfied_en];
      chipColor1 = baseThemeLight.palette.customChipColors[status1.colorCode];
      url1 = livestate.infobar1Obj.url;
      chipTextColor1 =
        baseThemeLight.palette.customChipTextColor[status1.colorCode];
    }
  }

  if (livestate.infobar2Obj && livestate.infobar2Obj.state_simplyfied_en) {
    if (statustable[livestate.infobar2Obj.state_simplyfied_en]) {
      status2 = statustable[livestate.infobar2Obj.state_simplyfied_en];
      chipColor2 = baseThemeLight.palette.customChipColors[status2.colorCode];
      url2 = livestate.infobar2Obj.url;
      chipTextColor2 =
        baseThemeLight.palette.customChipTextColor[status2.colorCode];
    }
  }

  // const clickHandlerAussicht = () => {
  //   if (livestate.infobar1Visible === true) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       lightbox: livestate.infobar1Obj.title
  //         .replaceAll(" ", "_")
  //         .replaceAll(".", ""),
  //     }));
  //   } else if (livestate.infobar2Visible === true) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       lightbox: livestate.infobar2Obj.title
  //         .replaceAll(" ", "_")
  //         .replaceAll(".", ""),
  //     }));
  //   } else {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       lightbox: false,
  //     }));
  //   }
  // };

  let tour1, tour2;
  if (livestate.infobar1Obj?.title)
    tour1 = state.tours[livestate.infobar1Obj.title];
  if (livestate.infobar2Obj?.title)
    tour2 = state.tours[livestate.infobar2Obj.title];

  const plans1 = getProjectPlans(livestate.infobar1Obj, state);
  const plans2 = getProjectPlans(livestate.infobar2Obj, state);

  const clickHandlerRundgang = () => {
    let src = "";
    if (livestate.infobar1Visible === true) {
      src = state.tours[livestate.infobar1Obj.title];
    } else if (livestate.infobar2Visible === true) {
      src = state.tours[livestate.infobar2Obj.title];
    }
    setLightboxOpen(true);
    setLightboxData({
      type: "tour", // replace with actual type
      src, // replace with actual src
    });
  };

  const clickHandlerGrundriss = () => {
    let src = "";
    if (livestate.infobar1Visible === true) {
      src = plans1.factsheet;
    } else if (livestate.infobar2Visible === true) {
      src = plans2.factsheet;
    }
    setLightboxOpen(true);
    setLightboxData({
      type: "pdf", // replace with actual type
      src, // replace with actual src
    });
  };

  const hideInfobar = () => {
    setLivestate((prevS) => ({
      ...prevS,
      infobar1Visible: false,
      infobar2Visible: false,
      infobar1Obj: false,
      infobar2Obj: false,
    }));
  };

  let infobar1Position;
  let infobar2Position;

  if (isBigScreen) {
    infobar1Position = livestate.infobar1Visible
      ? `translate(0px, 0px)`
      : `translate(${sidebarWidth}px, 0px)`;
  } else {
    infobar1Position = livestate.infobar1Visible
      ? `translate(0px, 0px)`
      : `translate(0px, 100%)`;
  }

  if (isBigScreen) {
    infobar2Position = livestate.infobar2Visible
      ? `translate(0px, 0px)`
      : `translate(${sidebarWidth}px, 0px)`;
  } else {
    infobar2Position = livestate.infobar2Visible
      ? `translate(0px, 0px)`
      : `translate(0px, 100%)`;
  }

  const ButtonStyle = {
    mt: isBigScreen ? 1.25 : 0.75,
    mr: "8px",
    width: isBigScreen ? "100%" : "calc(50% - 8px)",
    backgroundColor: baseThemeLight.palette.button.main,
    color: baseThemeLight.palette.button.text,
    "&:hover": {
      backgroundColor: baseThemeLight.palette.button.mainHover,
      color: baseThemeLight.palette.button.textHover,
    },
  };

  return (
    <>
      {(livestate.infobar1Visible || livestate.infobar2Visible) && (
        <Overlay
          onClick={hideInfobar}
          visible={livestate.infobar1Visible || livestate.infobar2Visible}
        />
      )}
      <Box
        id="e3d-ui-infobar-container-1"
        className="e3d-ui-infobar-container"
        style={{
          backgroundColor: baseThemeLight.palette.background.default,
          width: isBigScreen ? sidebarWidth : "100vw",
          minWidth: "320px",
          transform: infobar1Position,
        }}
      >
        {livestate.infobar1Obj ? (
          <>
            {/* <CloseModal modalToClose="infobar1Visible" /> */}
            <CardTitleInformation
              props={livestate.infobar1Obj}
              chipColor={chipColor1}
              chipTextColor={chipTextColor1}
              status={status1}
              modalToClose="infobar1Visible"
              hasChip={true}
            />
            <UnitInformationGrid
              props={livestate.infobar1Obj}
              status={status1}
              statustable={statustable}
            />
          </>
        ) : (
          ""
        )}
        <Box>
          {tour1 ? (
            <Button
              color="button"
              variant="outlined"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                mx: "2px",
                width: isBigScreen ? "100%" : "50%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
              onClick={clickHandlerRundgang}
            >
              <TransferWithinAStationIcon /> Rundgang
            </Button>
          ) : (
            ""
          )}
          {/* <Button
            color="button"
            variant="outlined"
            sx={{
              mt: isBigScreen ? 1.25 : 0.75,
              width: isBigScreen ? "100%" : "50%",
              backgroundColor: baseThemeLight.palette.button.main,
              color: baseThemeLight.palette.button.text,
              "&:hover": {
                backgroundColor: baseThemeLight.palette.button.mainHover,
                color: baseThemeLight.palette.button.textHover,
              },
            }}
            onClick={clickHandlerAussicht}
          >
            <PanoramaHorizontalRoundedIcon /> Aussicht
          </Button> */}
          {plans1 ? (
            <Button
              color="button"
              variant="outlined"
              sx={ButtonStyle}
              onClick={clickHandlerGrundriss}
            >
              <BorderStyleRoundedIcon /> Grundriss
            </Button>
          ) : (
            ""
          )}

          {livestate.infobar1Obj &&
          livestate.infobar1Obj.state_simplyfied_en === "free" ? (
            <Button
              color="button"
              variant="outlined"
              component="a"
              href={url1}
              target="_blank"
              rel="noopener noreferrer"
              sx={ButtonStyle}
            >
              <DriveFileRenameOutlineRoundedIcon /> zur Reservation
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box
        id="e3d-ui-infobar-container-2"
        className="e3d-ui-infobar-container"
        style={{
          backgroundColor: baseThemeLight.palette.background.default,
          width: isBigScreen ? sidebarWidth : "70vw",
          minWidth: "320px",
          transform: infobar2Position,
        }}
      >
        {" "}
        {livestate.infobar2Obj ? (
          <>
            {/* <CloseModal modalToClose="infobar2Visible" /> */}
            <CardTitleInformation
              props={livestate.infobar2Obj}
              chipColor={chipColor2}
              chipTextColor={chipTextColor2}
              status={status2}
              modalToClose="infobar2Visible"
              hasChip={true}
            />
            <UnitInformationGrid
              props={livestate.infobar2Obj}
              status={status2}
            />
          </>
        ) : (
          ""
        )}
        <Box>
          {tour2 ? (
            <Button
              color="button"
              variant="outlined"
              sx={ButtonStyle}
              onClick={clickHandlerRundgang}
            >
              <TransferWithinAStationIcon /> Rundgang
            </Button>
          ) : (
            ""
          )}
          {/* <Button
            color="button"
            variant="outlined"
            sx={{
              mt: isBigScreen ? 1.25 : 0.75,
              width: isBigScreen ? "100%" : "50%",
              backgroundColor: baseThemeLight.palette.button.main,
              color: baseThemeLight.palette.button.text,
              "&:hover": {
                backgroundColor: baseThemeLight.palette.button.mainHover,
                color: baseThemeLight.palette.button.textHover,
              },
            }}
            onClick={clickHandlerAussicht}
          >
            <PanoramaHorizontalRoundedIcon /> Aussicht
          </Button> */}
          {plans2 ? (
            <Button
              color="button"
              variant="outlined"
              sx={ButtonStyle}
              onClick={clickHandlerGrundriss}
            >
              <BorderStyleRoundedIcon /> Grundriss
            </Button>
          ) : (
            ""
          )}
          {livestate.infobar2Obj &&
          livestate.infobar2Obj.state_simplyfied_en === "free" ? (
            <Button
              color="button"
              variant="outlined"
              component="a"
              href={url2}
              target="_blank"
              rel="noopener noreferrer"
              sx={ButtonStyle}
            >
              <DriveFileRenameOutlineRoundedIcon /> zur Reservation
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default Infobar;
