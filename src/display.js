/* ----------------------------App.svelte-----------------------------------*/

export function setButtonText(currentRound) {
  if (currentRound < 5) {
    return 'Next Round';
  } else {
    return 'Finish';
  };
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
  const position = (colour + (8 - (colour * 0.15)));
  return position;
}
