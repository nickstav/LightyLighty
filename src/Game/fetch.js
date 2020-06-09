  import { convertToPercentage, getAccuracy } from './calculations.js';
  import { gameProgress } from './gameStore.js';

/* ----------------------------App.svelte-----------------------------------*/

// function to check with the server if the arduino is connected
export async function checkConnection(address) {
  try {
    const response = await fetch(address);
    const connectionStatus = await response.json();
    return connectionStatus;
  } catch (error) {
    handleError(error);
  };
}

/* function that connects to the server via the serverAddress to initiate
 a new random colour at the server */
export async function changeArduinoColour(address) {
  try {
    const response = await fetch(address);
  } catch (error) {
    handleError(error);
  };
}

/* --------------------------Results.svelte---------------------------------*/

async function getArduinoColour(address) {
 try {
   const response = await fetch(address);
   const arduinoRGB = await response.json();
   return arduinoRGB;
 } catch (error) {
   handleError(error);
 };
}

export async function getResults(userRedPerc, userGreenPerc, userBluePerc) {
  const serverAddress = 'http://localhost:4000/results/';
  const arduinoColour = await getArduinoColour(serverAddress);
  const redPerc = convertToPercentage(arduinoColour.arduinoRed);
  const greenPerc = convertToPercentage(arduinoColour.arduinoGreen);
  const bluePerc = convertToPercentage(arduinoColour.arduinoBlue);
  const roundScore = getAccuracy(userRedPerc, redPerc, userGreenPerc, greenPerc, userBluePerc, bluePerc);
  return {
   red: arduinoColour.arduinoRed,
   green: arduinoColour.arduinoGreen,
   blue: arduinoColour.arduinoBlue,
   redPerc,
   greenPerc,
   bluePerc,
   roundScore,
  };
}

export async function updateScore(serverInfo) {
  const resultsFromServer = await serverInfo;
  const score = resultsFromServer.roundScore;
  // parseFloat turns the array values from a string to a number
  gameProgress.saveRoundResults(parseFloat(score));
}

/* --------------------------GameEnd.svelte---------------------------------*/

export async function resultToServer(address, score) {
  const finalScoreAddress = address + score;
  try {
    const response = await fetch(finalScoreAddress);
  } catch (error) {
    handleError(error);
  };
}

/* --------------------------Handle Errors---------------------------------*/

// IS THERE A GOOD REFERENCE WHERE I CAN READ ABOUT ERROR HANDLING..?
function handleError(error) {
  console.error(error);
}
