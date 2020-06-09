import { gameProgress } from './gameStore';
import { userColours } from './colourStore';
import { checkConnection, updateScore, changeArduinoColour } from './fetch'


export async function startGame() {
  const serverAddress = 'http://localhost:4000/startRound';
  const arduinoConnected = await checkConnection(serverAddress);
  if (arduinoConnected) {
    gameProgress.beginGame();
  } else {
    alert('No Arduino detected. Please connect your device');
  };
}


export function quitGame() {
  const confirmation = confirm('Are you sure you want to quit?');
  if (confirmation) {
    gameProgress.resetGame();
  };
}


export function submitAttempt(red, green, blue) {
  userColours.updateValues(red, green, blue);
  gameProgress.finishGuessing();
}

export async function newRound(currentRound, serverInfo) {
  updateScore(serverInfo);
  userColours.resetValues();
  if (currentRound < 5) {
    //move onto the next round
    gameProgress.newRound();
    const serverAddress = 'http://localhost:4000/startRound';
    changeArduinoColour(serverAddress);
  } else {
    //game is finished and call the finishGame function below
    gameProgress.endGame();
  };
}
