// src/components/Favorite.js
import { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Box } from "@mui/material";
import { useFavorites } from "../../context/FavoriteContext";

const Favorite = ({ props, right }) => {
  const { isFavorite, addToFav, removeFromFav } = useFavorites();
  const favorite = isFavorite(props.reference_number);

  const handleClick = () => {
    if (favorite) {
      removeFromFav(props.reference_number);
    } else {
      addToFav(props.reference_number);
    }
  };

  return (
    <Box
      key={props.reference_number}
      title={props.reference_number}
      style={{ position: "absolute", right: right, pointerEvents: "auto" }}
      onClick={handleClick}
      className="e3d-favorite"
    >
      {favorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
    </Box>
  );
};

export default Favorite;
