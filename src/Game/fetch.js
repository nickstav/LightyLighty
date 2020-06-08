  import { convertToPercentage, getAccuracy } from './calculations.js';

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

export async function getResults(address, userRedPerc, userGreenPerc, userBluePerc) {
  const arduinoColour = await getArduinoColour(address);
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
