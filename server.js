/* ----------------------Get required npm packages------------------------------*/

const express = require("express");
const cors = require("cors");
const { Board, Led } = require("johnny-five");

/* -----------------------Set up server on a local port------------------------ */

const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

/* ------Define variables for the Arduino & the score required to win game------*/

let requiredScore = 15;
let arduinoConnected = false;
let arduinoRed = 0;
let arduinoGreen = 0;
let arduinoBlue = 0;
let led;

/* -----------------------Set up the Arduino------------------------------------*/

const board = new Board();

board.on("ready", setUpLED);

board.on("close", notifyBoardHasDisconnected);


function setUpLED() {
  // Initialize the RGB LED
  led = new Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  led.on();
  led.intensity(100);
  led.color({red: 0, green: 0, blue: 0});

  arduinoConnected = true;
  console.log('Board connected');
};

function notifyBoardHasDisconnected() {
  arduinoConnected = false;
  console.log('Board disconnected');
}

/* --------------------Interaction with the front end---------------------------*/

app.get('/startRound', startRound);

app.get('/play/:red/:green/:blue/:isGuessing', updateArduino);

app.get('/results', sendArduinoColours);

app.get('/enlightylightenment/:score', displayLightShow);

/* ------------------async (req, res) Functions---------------------------------*/

async function startRound(req, res) {
  try {
    res.send(arduinoConnected);
    generateRandomColour();
    resetLED();
  } catch (error) {
    handleError(error);
  };
}

async function updateArduino(req, res) {
  try {
    //get user RGB values and whether on Play or Preview page from the front end
    const params = req.params;
    res.send(arduinoConnected);
    if (params.isGuessing == 'true') {
      displayRelevantColour(params.red, params.green, params.blue);
    } else if (params.isGuessing == 'false') {
      displayRelevantColour(arduinoRed, arduinoGreen, arduinoBlue);
    };
  } catch (error) {
    handleError(error);
  };
}

async function sendArduinoColours(req, res) {
  try {
    const arduinoColour = { arduinoRed, arduinoGreen, arduinoBlue };
    res.send(arduinoColour);
  } catch (error) {
    handleError(error);
  };
}

async function displayLightShow(req, res) {
  try {
    const params = req.params;
    const score = params.score;
    if (params.score < requiredScore) {
      enlightylightenment();
      console.log('Enlightylightenment!')
    } else {
      fadeOut();
      console.log('Womp Womp!');
    };
  } catch (error) {
    handleError(error);
  };
}

/* -----------------------Display Functions-------------------------------------*/

function randomRGB() {
  return Math.floor(Math.random() * 256);
}

function generateRandomColour() {
  arduinoRed = randomRGB();
  arduinoGreen = randomRGB();
  arduinoBlue = randomRGB();
}

function displayRelevantColour(red, green, blue) {
  led.color({red: red, green: green, blue: blue });
}

function resetLED() {
  led.color({red: 0, green: 0, blue: 0});
}

// light show if the user 'wins' the game
function enlightylightenment() {
  let index = 0;
  const display = [];
  // create 40 random colours to add to the display array
  for (i = 0; i < 40; i++) {
    displayColour = {red: randomRGB(), green: randomRGB(), blue: randomRGB()};
    display.push(displayColour);
  }
  // display each colour in the array every 250ms
  board.loop(250, () => {
    if (index + 1 === display.length) {
      index = 0;
    }
    led.color(display[index++]);
  });
}

// a red light that fades out to represent game over
function fadeOut() {
  let intensity = 100;
  led.color({red: 255, green: 0, blue: 0 });
  // fade out the led over 5 seconds (from intensity 100 to intensity 0)
  board.loop(50, () => {
    led.intensity(intensity--);
    if (intensity == 0) {
      led.off();
    };
  });
}

/* -------------------------Handle Errors---------------------------------------*/

// IS THERE A GOOD REFERENCE WHERE I CAN READ ABOUT ERROR HANDLING..?
function handleError(error) {
  console.log(error);
}
