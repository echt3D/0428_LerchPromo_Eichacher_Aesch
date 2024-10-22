import { React, useContext, useEffect, useRef, useTheme } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Button, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import * as AppSetup from "./../../custom/appSetup.js";
import Ansprechperson from "./../../custom/ansprechperson.jpg";

// import "./unitInformationBox.styles.scss";
import baseThemeLight from "../../theme/baseThemeLight";
import { Image } from "@mui/icons-material";
import { StateContext } from "../../context/ProjectDataContext.js";
import { useMediaQuery } from "../../utils/useMediaQuery.js";

const ContactPerson = ({ props }) => {
  const [state] = useContext(StateContext);
  const sidebarWidth = state.config.ui.sidebarWidth;
  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  let contactPersonWidth;
  if (isBigScreen) {
    contactPersonWidth = Math.max(sidebarWidth * 0.25, 120) - 32 + "px";
  } else {
    contactPersonWidth = window.innerWidth * 0.25 - 32;
  }

  if (contactPersonWidth > 90) contactPersonWidth = 90;

  // const ansprechpersonImg = useRef(null);
  // useEffect(() => {
  //   ansprechpersonImg.current.style.height =
  //     ansprechpersonImg.current.offsetWidth;
  // }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: baseThemeLight.palette.background.default,
        padding: "0px",
        mt: 2,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: isBigScreen ? "column-reverse" : "row",
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundImage: `url(${Ansprechperson})`,
          backgroundSize: "cover",
          backgroundPosition: "center, top",
          borderRadius: "100%",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          minWidth: contactPersonWidth,
          minHeight: contactPersonWidth,
          maxWidth: contactPersonWidth,
          maxHeight: contactPersonWidth,
        }}
      />
      <Box
        sx={{
          p: 2,
          display: "inline-block",
          maxWidth: isBigScreen
            ? "100%"
            : `${Math.max(
                sidebarWidth * 0.75 - 64,
                sidebarWidth - 120 - 64
              )}px`,
          wordWrap: "break-word",
        }}
      >
        <Typography color="text.primary">
          {AppSetup.ansprechperson.name}
        </Typography>
        <Typography color="text.primary">
          {AppSetup.ansprechperson.function}
        </Typography>
        <Typography>
          <Link href={`mailto:${AppSetup.ansprechperson.email}`}>
            {AppSetup.ansprechperson.email}
          </Link>
        </Typography>
        <Typography>
          <Link href={`tel:${AppSetup.ansprechperson.tel.replaceAll(" ", "")}`}>
            {AppSetup.ansprechperson.tel}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactPerson;
