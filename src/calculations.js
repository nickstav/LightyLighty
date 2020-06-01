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

export function randomNeonColour() {
  const neonColours = ['#FFFF00', '#FFFF33', '#F2EA02', '#E6FB04', // yellow
                      '#FF0000', '#FD1C03', '#FF3300', '#FF6600', // red
                      '#00FF00', '#00FF33', '#00FF66', '#33FF00', // green
                      '#00FFFF', '#099FFF', '#0062FF', '#0033FF', // blue
                      '#FF00FF', '#FF00CC', '#FF0099', '#CC00FF', // pink
                      '#9D00FF', '#CC00FF', '#6E0DD0', '#9900FF']; // purple
  const randomNumber = Math.floor(Math.random() * 25);
  return neonColours[randomNumber];
}
