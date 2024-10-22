import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { LivestateContext } from "../../context/LivestateContext";

export function InfoboxButtonElement(props) {
  const {
    name,
    icon,
    onClickHandler = openLightbox,
    href,
    isBigScreen,
  } = props;
  const theme = useTheme();

  const [livestate, setLivestate] = useContext(LivestateContext);

  function openLightbox() {
    setLivestate((prevLS) => ({
      ...prevLS,
      lightbox: href,
    }));
  }

  if (!onClickHandler && !href) {
    console.warn(
      `Please provide a click handler or a href on button "${name}"`
    );
    return;
  }
  if (onClickHandler && href) {
    console.warn(
      `Please provide only one: a click handler or a href on button "${name}"`
    );
    return;
  }
  return (
    <Button
      color="button"
      variant="outlined"
      sx={{
        pointerEvents: "none",
        textDecoration: "line-through",
        mt: isBigScreen ? 1.25 : 0.75,
        width: "100%",
        backgroundColor: theme.palette.button.main,
        color: theme.palette.button.text,
        "&:hover": {
          backgroundColor: theme.palette.button.mainHover,
          color: theme.palette.button.textHover,
        },
      }}
      onClick={onClickHandler ? onClickHandler : openLightbox}
      // href={href}
    >
      {React.createElement(icon)} {name}
    </Button>
  );
}
