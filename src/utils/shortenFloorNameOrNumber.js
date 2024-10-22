export function shortenFloorNameOrNumber(floornameOrNumber) {
  if (
    floornameOrNumber === "" ||
    floornameOrNumber === null ||
    floornameOrNumber === undefined
  )
    return;
  if (typeof floornameOrNumber === "number") {
    if (Math.floor(floornameOrNumber) === 0) {
      return "EG";
    } else if (floornameOrNumber < 0) {
      return `${-1 * floornameOrNumber}. UG`;
    } else if (floornameOrNumber > 0) {
      return `${floornameOrNumber}. OG`;
    }
  }

  if (floornameOrNumber.indexOf("geschoss") !== -1) {
    return floornameOrNumber.replace("geschoss", "gesch.");
  }
}
