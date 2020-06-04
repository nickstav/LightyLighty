export function getAccuracy(red1, red2, green1, green2, blue1, blue2) {
  const accuracyRed = Math.abs(red1 - red2);
  const accuracyGreen = Math.abs(green1 - green2);
  const accuracyBlue = Math.abs(blue1 - blue2);
  const accuracyTotal = ((accuracyRed + accuracyBlue + accuracyGreen)/3).toFixed(2);
  return accuracyTotal;
}

export function convertToPercentage(colour) {
  return Math.round((colour/255)*100);
}
