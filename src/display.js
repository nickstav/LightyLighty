/* ----------------------------App.svelte-----------------------------------*/

export function disablePreview(currentRound) {
  if (currentRound == 5) {
    return true;
  } else {
    return false;
  };
}

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
