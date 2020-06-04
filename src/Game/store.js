import { writable } from 'svelte/store';

export const gameProgress = writable({
  isReady: false,
  results: [],
  round: 1,
  isGuessing: false,
  guessComplete: false,
  gameFinished: false
});
