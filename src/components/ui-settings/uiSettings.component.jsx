import React, { useState, useContext } from "react";
import {
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import Fab from "@mui/material/Fab";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { LivestateContext } from "../../context/LivestateContext";

import { useMediaQuery } from "../../utils/useMediaQuery";

const UiSettings = () => {
  const [livestate, setLivestate] = useContext(LivestateContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const isBigScreen = useMediaQuery("(min-width: 640px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarToggle = () => {
    if (livestate.sidebarVisible === true)
      setLivestate((prevS) => ({
        ...prevS,
        sidebarVisible: false,
      }));
    else
      setLivestate((prevS) => ({
        ...prevS,
        sidebarVisible: true,
      }));
  };

  const handleToggle = () => {
    setLivestate((prevS) => ({
      ...prevS,
      drawMarksAlways: !livestate.drawMarksAlways,
      testMARKS: true,
    }));
    handleClose(); // close the menu after the state change
  };

  const handleMenuClose = () => {
    handleClose(); // close the menu when it's clicked outside
  };

  // console.table("UISETTING:", livestate);
  const FabStyle = { mx: 0.5 };

  return (
    <>
      <Fab onClick={handleClick}>
        <SettingsRoundedIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose} // close the menu when it's clicked outside
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isBigScreen ? (
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={livestate.drawMarksAlways}
                  onChange={handleToggle}
                />
              }
              label="Alle Wohnungen anzeigen"
            />
          </MenuItem>
        ) : (
          ""
        )}
        {/* <MenuItem>
          <FormControlLabel
            control={
              <>
                <Checkbox
                  checked={livestate.sidebarVisible}
                  onChange={handleSidebarToggle}
                />
              </>
            }
            label="Sidebar sichtbar"
          />
        </MenuItem> */}
        <MenuItem>
          <Link
            href="https://echt3d.ch/impressum.php"
            target="_blank"
            noopener
            noreferer
            color="text.secondary"
            sx={{ textDecoration: "none", fontSize: "14px" }}
          >
            Herausgeber / Impressum
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UiSettings;
