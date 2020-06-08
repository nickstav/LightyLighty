import { writable } from 'svelte/store';

 const defaultValues = {
  isReady: false,
  results: [],
  round: 1,
  isGuessing: false,
  guessComplete: false,
  gameFinished: false
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function beginGame() {
    update(progress => {
      return {
        ...progress,
        isReady: true
      };
    });
  }

  function switchView() {
    update(progress => {
      return {
        ...progress,
        isGuessing: !progress.isGuessing
      };
    });
  }

  function finishGuessing() {
    update(progress => {
      return {
        ...progress,
        isGuessing: false,
        guessComplete: true
      }
    });
  }

  function newRound() {
    update(progress => {
      return {
        ...progress,
        guessComplete: false,
        round: progress.round + 1
      }
    });
  }

  function saveRoundResults(newResult) {
    update(progress => {
  		progress.results.push(newResult);
	    return progress;
	  });
  }

  function endGame() {
    update(progress => {
	    return {
	      ...progress,
	      gameFinished: true
	    };
	  });
  }

  function resetGame() {
    set(defaultValues);
  }

  return {
		subscribe,
		beginGame,
    switchView,
		finishGuessing,
    newRound,
    saveRoundResults,
    endGame,
		resetGame
	};

}

export const gameProgress = setUpStore();
