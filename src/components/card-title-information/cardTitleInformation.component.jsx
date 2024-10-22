// src/components/CardTitleInformation.js
import { React } from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Favorite from "../unit-favorite/unitFavorite.component";
import { useFavorites } from "./../../context/FavoriteContext";
import CloseModal from "../close-modal/closeModal.component";
import { useMediaQuery } from "../../utils/useMediaQuery";
import UnitAdditionalIcons from "../unit-additional-icons/unitAdditionalIcons.component";

function CardTitleInformation({
  props,
  chipColor,
  chipTextColor,
  status,
  modalToClose,
  hasChip,
}) {
  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  let right;

  if (modalToClose) {
    right = "45px";
  } else {
    right = "15px";
  }

  return (
    <>
      <Favorite
        key={props.title}
        color="text.primary"
        props={props}
        right={right}
      />
      {modalToClose ? <CloseModal modalToClose={modalToClose} /> : ""}
      <Typography component="h3" variant="h5">
        {props?.rooms}-Zimmer{" "}
        {isBigScreen ? props.short_title : props.short_title}
        {props?.property_type}
      </Typography>
      <Typography
        component="h2"
        variant="h6"
        sx={{ fontWeight: "300" }}
        gutterBottom
      >
        {/* {isBigScreen ? `Wohnungsnummer:` : `Wohnungsnr:`} */} {props?.title}
      </Typography>
      {status && hasChip ? (
        <Box sx={{ mb: isBigScreen ? 1 : 0 }}>
          <Chip
            label={status.dsc}
            sx={{
              backgroundColor: chipColor,
              color: chipTextColor,
              minWidth: "150px",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          />
          <UnitAdditionalIcons unit={props} />
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default CardTitleInformation;
