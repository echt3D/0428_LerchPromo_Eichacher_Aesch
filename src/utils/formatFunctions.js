export function formatPrice(
  price,
  currency = "CHF",
  hasCurrencySymbol = true,
  fractionDigits = 2
) {
  let millionText = "";
  if (price >= 1000000) {
    price /= 1000000;
    millionText = "Mio.";
  }
  fractionDigits = 3;
  const formattedPrice = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
    .format(price)
    .replace(currency, "")
    .trim();

  return hasCurrencySymbol
    ? `${millionText ? "" : "CHF\xa0"}${formattedPrice}\xa0${millionText}`
    : formattedPrice + millionText;
}
