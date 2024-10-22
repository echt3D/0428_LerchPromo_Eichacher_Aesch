export function addToFavorites(flatReference) {
  const favorites = getFavoritesFromCookie();
  const flatExists = isFavorite(flatReference);

  if (!flatExists) {
    const newFavorites = [...favorites, flatReference];
    setFavoritesToCookie(newFavorites);
  }
}

export function removeFromFavorites(flatReference) {
  const favorites = getFavoritesFromCookie();
  const index = favorites.findIndex((f) => f === flatReference);

  if (index !== -1) {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavoritesToCookie(newFavorites);
  }
}

export function isFavorite(flatReference) {
  const favorites = getFavoritesFromCookie();
  const flatExists = favorites.some((f) => f === flatReference);
  return flatExists;
}

export function setFavoritesToCookie(newFavorites) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // set the expiration date to 30 days from now
  const cookieValue = JSON.stringify(newFavorites);
  document.cookie = `favorites=${cookieValue};expires=${expirationDate.toUTCString()};path=/`;
}

export function getFavoritesFromCookie() {
  const cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)favorites\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return cookieValue ? JSON.parse(cookieValue) : [];
}
