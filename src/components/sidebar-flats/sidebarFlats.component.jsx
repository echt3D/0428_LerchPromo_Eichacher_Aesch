import { React, useContext, useEffect, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import SidebarUnit from "../sidebar-unit/sidebarUnit.component";
import "./sidebarFlats.styles.scss";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";
import { Box } from "@mui/material";
import * as AppSetup from "../../custom/appSetup";

import { useMediaQuery } from "../../utils/useMediaQuery";
import { defaultHoveredUnit } from "../canvas/canvasUtils";

function SidebarFlats(props) {
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [state, setState] = useContext(StateContext);

  const theme = useTheme();

  useEffect(() => {
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const allFlatCards = document.querySelectorAll(
    ".e3d-ui-sidebar_flat-list-item"
  );

  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  let lastHoveredFlatItem = undefined;

  function handleMouseOver(e) {
    const targetCard = e.target.closest(".e3d-ui-sidebar_flat-list-item");
    if (!targetCard) return;
    allFlatCards.forEach((el) => el.classList.remove("active"));
    if (targetCard) {
      const hoveredUnitObj = Object.values(state.units).find(
        (unit) => unit.title === targetCard.dataset.id
      );
      targetCard.classList.add("active");
      if (lastHoveredFlatItem) {
        if (targetCard.dataset.id === lastHoveredFlatItem.dataset.id) {
          setLivestate((prevS) => ({
            ...prevS,
            hoveredUnit: hoveredUnitObj,
            isHovered: true,
          }));
        }
      }
    }
    lastHoveredFlatItem = targetCard;
  }


  
  const resetFilter = () => {

    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        area: [AppSetup.flatsMinArea, AppSetup.flatsMaxArea],
        price: [AppSetup.flatsMinPrice, AppSetup.flatsMaxPrice],
        floor: [AppSetup.flatsMinFloor, AppSetup.flatsMaxFloor],
        rooms: AppSetup.flatsRooms,
        onlyAvailable: false,
        onlyFavorites: false,
      },
    }));
  }

  // function clickOnFlatCard(hoveredUnit) {
  //   if (
  //     livestate.infobar1Visible !== true &&
  //     hoveredUnit.title !== defaultHoveredUnit.title
  //   ) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       infobar1Visible: true,
  //       infobar1Obj: hoveredUnit,
  //       infobar2Visible: false,
  //     }));
  //   } else if (
  //     hoveredUnit !== livestate.infobar1Obj &&
  //     livestate.infobar2Visible !== true &&
  //     hoveredUnit.title !== defaultHoveredUnit.title
  //   ) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       infobar1Visible: false,
  //       infobar2Visible: true,
  //       infobar2Obj: hoveredUnit,
  //     }));
  //   } else if (hoveredUnit.title === defaultHoveredUnit.title) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       infobar1Visible: false,
  //       infobar2Visible: false,
  //     }));
  //   } else if (
  //     livestate.infobar1Visible === true &&
  //     hoveredUnit.title === defaultHoveredUnit.title
  //   ) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       infobar1Visible: false,
  //       infobar2Visible: false,
  //     }));
  //   } else if (
  //     livestate.infobar2Visible === true &&
  //     hoveredUnit.title === defaultHoveredUnit.title
  //   ) {
  //     setLivestate((prevS) => ({
  //       ...prevS,
  //       infobar1Visible: false,
  //       infobar2Visible: false,
  //     }));
  //   }
  // }

  const sidebarWidth = state.config.ui.sidebarWidth;

  const handleClick = (unit) => {
    props.clickOnFlatCardOrPath(unit);
  };

  return (
    <>
      <div
        className="e3d-ui-sidebar__list-wrapper"
        style={{
          height: isBigScreen
            ? `calc(100vh - ${sidebarWidth / 2}px - 49px - 23px)`
            : "auto",
        }}
      >
        <div className="e3d-ui-sidebar__list">
          <div className="e3d-ui-sidebar__list-actions"></div>
          <div
            className="e3d-ui-sidebar__list-group scrollbar--light"
            style={{
              display: !isBigScreen ? "flex" : "",
              flexDirection: !isBigScreen ? "row" : "",
            }}
          >
            {props.numberOfResults < state.units.length ? (
              <Box sx={{ padding: "14px", textAlign: "center" }}>
                <Box>
                  <Typography color="text.secondary">
                    Filter aktiv. Nur {isBigScreen ? <br /> : ""}{" "}
                    {props.numberOfResults} von {state.units.length} sichtbar.
                  </Typography>
                </Box>

                <Button
                  color="button"
                  variant="outlined"
                  onClick={resetFilter}
                >
                  {isBigScreen ? "Filter" : ""} zurücksetzen
                </Button>
              </Box>
            ) : (
              ""
            )}
            {props.unitsToRender.map((unit, i) => {
              const status =
                state.project.settings.statustable[unit.state_simplyfied_en];
              const chipColor =
                theme.palette.customChipColors[status.colorCode];
              return (
                <Box
                  key={i}
                  className={
                    unit.title === livestate.hoveredUnit.title
                      ? "e3d-ui-sidebar_flat-list-item active"
                      : "e3d-ui-sidebar_flat-list-item"
                  }
                  onClick={() => handleClick(unit)}
                  data-id={unit.title}
                  sx={{ mt: 1.5, mr: !isBigScreen ? 1.5 : 0 }}
                  style={{
                    minWidth: !isBigScreen ? "320px" : "",
                    boxShadow: isBigScreen
                      ? ""
                      : `8px 0px 0px 0px ${chipColor} inset`,
                  }}
                >
                  <SidebarUnit
                    props={unit}
                    statustable={state.project.settings.statustable}
                    className="e3d-ui-sidebar_flat_container"
                    hasChip={isBigScreen ? true : false}
                  />
                </Box>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default SidebarFlats;
