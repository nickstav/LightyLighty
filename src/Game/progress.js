import { gameProgress } from './store';
import { checkConnection } from './fetch'


export async function startGame() {
  const serverAddress = 'http://localhost:4000/startRound';
  const arduinoConnected = await checkConnection(serverAddress);
  if (arduinoConnected) {
    gameProgress.update(progress => {
      return {
        ...progress,
        isReady: true
      };
    });
  } else {
    alert('No Arduino detected. Please connect your device');
  };
}

// reset game variables upon quiting the game
export function quitGame() {
  const confirmation = confirm('Are you sure you want to quit?');
  if (confirmation) {
    gameProgress.update(progress => {
      progress.isReady = false;
      progress.results = [];
      progress.round = 1;
      progress.guessComplete = false;
      progress.gameFinished = false;
      progress.hasGuessed = false;
      return progress;
    });
  };
}
