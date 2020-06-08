import { gameProgress } from './gameStore';
import { userColours } from './colourStore';
import { checkConnection } from './fetch'


export async function startGame() {
  const serverAddress = 'http://localhost:4000/startRound';
  const arduinoConnected = await checkConnection(serverAddress);
  if (arduinoConnected) {
    gameProgress.beginGame();
  } else {
    alert('No Arduino detected. Please connect your device');
  };
}

// reset game variables upon quiting the game
export function quitGame() {
  const confirmation = confirm('Are you sure you want to quit?');
  if (confirmation) {
    gameProgress.resetGame();
  };
}
