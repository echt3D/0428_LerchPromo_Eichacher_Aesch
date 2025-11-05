export function formatPrice(price, currency = "CHF", hasCurrencySymbol = true) {
  const formattedPrice = new Intl.NumberFormat("de-CH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return hasCurrencySymbol ? `${currency} ${formattedPrice}` : formattedPrice;
}
