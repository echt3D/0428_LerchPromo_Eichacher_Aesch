// src/contexts/FavoritesContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite as isFav,
} from "./../utils/favorites";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const initialFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(initialFavorites);
  }, []);

  const addToFav = (flatReference) => {
    addToFavorites(flatReference);
    setFavorites([...favorites, flatReference]);
  };

  const removeFromFav = (flatReference) => {
    removeFromFavorites(flatReference);
    setFavorites(favorites.filter((fav) => fav !== flatReference));
  };

  const isFavorite = (flatReference) => {
    return isFav(flatReference);
  };

  const value = {
    favorites,
    addToFav,
    removeFromFav,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
