import { React, useContext, useEffect, useState } from "react";
import "./App.scss";
import Player from "./components/player/player.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Infobar from "./components/infobar/infobar.component";
import { StateContext } from "./context/ProjectDataContext";
import Lightbox from "./components/lightbox/lighbox.component";
import { LivestateContext } from "./context/LivestateContext";
import { Box } from "@mui/material";

import { defaultHoveredUnit } from "./components/canvas/canvasUtils";

function E3DApp() {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [lightboxData, setLightboxData] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // useEffect(() => {
  //   console.log("STATE UNITS ", state.units);
  // }, [livestate]);

  function clickOnFlatCardOrPath(hoveredUnit) {
    if (
      livestate.infobar1Visible !== true &&
      hoveredUnit.title !== defaultHoveredUnit.title
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: true,
        infobar1Obj: hoveredUnit,
        infobar2Visible: false,
      }));
    } else if (
      hoveredUnit !== livestate.infobar1Obj &&
      livestate.infobar2Visible !== true &&
      hoveredUnit.title !== defaultHoveredUnit.title
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: true,
        infobar2Obj: hoveredUnit,
      }));
    } else if (hoveredUnit.title === defaultHoveredUnit.title) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    } else if (
      livestate.infobar1Visible === true &&
      hoveredUnit.title === defaultHoveredUnit.title
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    } else if (
      livestate.infobar2Visible === true &&
      hoveredUnit.title === defaultHoveredUnit.title
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    }
  }

  // if (lightbox) console.log(lightbox.find("https://"));
  // let lightboxSrc, lightboxTitle;
  // if (lightbox) {
  //   if (lightbox.toString().startsWith("http")) {
  //     lightboxSrc = lightbox;
  //     lightboxTitle = "Rundgang";
  //   } else {
  //     lightboxSrc = `${process.env.PUBLIC_URL}/data/views/tour.html?start_scene=${lightbox}`;
  //     lightboxTitle = "Aussicht";
  //   }
  // }

  const infoBoxStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  window.addEventListener("load", (event) =>
    setTimeout(() => {
      document.querySelector("body").classList.remove("preload");
    }, 1500)
  );

  if (state.stateIsLoading === false) {
    return (
      <>
        <div className="e3d-app">
          <Sidebar clickOnFlatCardOrPath={clickOnFlatCardOrPath} />
          <Player clickOnFlatCardOrPath={clickOnFlatCardOrPath} />
        </div>
        {/* <div id="e3d-ui-footer">Impressum</div> */}
        <Infobar
          lightboxData={lightboxData}
          lightboxOpen={lightboxOpen}
          setLightboxOpen={setLightboxOpen}
          setLightboxData={setLightboxData}
        />
        {/* <div id="e3d-ui-contactbox"></div> */}
        {/* <div id="e3d-ui-notifications"></div> */}
        {/* <div id="e3d-ui-cookie-banner"></div> */}
        <div>
          <Lightbox
            lightboxData={lightboxData}
            lightboxOpen={lightboxOpen}
            setLightboxOpen={setLightboxOpen}
            setLightboxData={setLightboxData}
          />
        </div>
      </>
    );
  } else {
    if (state.stateIsLoading === "error") {
      return (
        <Box sx={infoBoxStyle}>
          <Box>
            Probleme mit externer Resource.
            <br />
            Bitte später versuchen.
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={infoBoxStyle}>
          <Box>Wohnungsfinder wird geladen...</Box>
        </Box>
      );
    }
  }
}

export default E3DApp;
