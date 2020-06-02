/* ----------------------------App.svelte-----------------------------------*/

export function setButtonText(currentRound) {
  if (currentRound < 5) {
    return 'Next Round';
  } else {
    return 'Finish';
  };
}

export function getBackgroundColour(condition) {
  if (condition) {
    return '#565656';
  } else {
    const neonColour = randomNeonColour();
    return neonColour;
  };
}

 function randomNeonColour() {
  const neonColours = ['#FFFF00', '#FFFF33', '#F2EA02', '#E6FB04', // yellow
                      '#FF0000', '#FD1C03', '#FF3300', '#FF6600', // red
                      '#00FF00', '#00FF33', '#00FF66', '#33FF00', // green
                      '#00FFFF', '#099FFF', '#0062FF', '#0033FF', // blue
                      '#FF00FF', '#FF00CC', '#FF0099', '#CC00FF', // pink
                      '#9D00FF', '#CC00FF', '#6E0DD0', '#9900FF']; // purple
  const randomNumber = Math.floor(Math.random() * 25);
  return neonColours[randomNumber];
}


/* --------------------------GameEnd.svelte---------------------------------*/

export function getHeader(score, requiredScore) {
  if (score <  requiredScore) {
    return 'Enlightylightenment!';
  } else {
    return 'Game Over';
  };
}

export function getParagraph(score, requiredScore) {
  if (score < requiredScore) {
    return `Your accuracy was less than ${requiredScore}%!`;
  } else {
    return `You didn't get within ${requiredScore}%. Try again!`;
  };
}

/* ---------------------------Play.svelte-----------------------------------*/

export function changeTextForRound5(round) {
  if (round == 5) {
    return `You cannot go back to Preview mode for this one.`;
  } else {
    return `You can return to <strong>Preview Mode</strong> for another look. Hit Check when complete`;
  };
}

export function disablePreview(currentRound, isGuessing) {
  if (currentRound == 5 && isGuessing == true) {
    return true;
  } else {
    return false;
  };
}

// function to get the position for display over the slider thumb
export function ledDisplay(colour) {
  /* weird magic number that seems to adjust the position to stay over the
  slider...  https://css-tricks.com/value-bubbles-for-range-inputs */
  const position = (colour + (6 - (colour * 0.15)));
  return position;
}
