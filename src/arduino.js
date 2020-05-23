export const arduinoRed = Math.floor(Math.random() * 256);
export const arduinoGreen = Math.floor(Math.random() * 256);
export const arduinoBlue = Math.floor(Math.random() * 256);

export const arduinoRedPerc = Math.round((arduinoRed/255)*100);
export const arduinoGreenPerc = Math.round((arduinoGreen/255)*100);
export const arduinoBluePerc = Math.round((arduinoBlue/255)*100);

export function getAccuracy(red1, red2, green1, green2, blue1, blue2) {
  const accuracyRed = Math.abs(red1 - red2);
  const accuracyGreen = Math.abs(green1 - green2);
  const accuracyBlue = Math.abs(blue1 - blue2);
  const accuracyTotal = ((accuracyRed + accuracyBlue + accuracyGreen)/3).toFixed(2);
  return accuracyTotal;
}

export function connectArduino() {
  //const board = new Board();
}

export function setArduinoColour() {
}


/* http://johnny-five.io/api/led.rgb/

export function connectArduino() {
  const { Board, Led } = require("johnny-five");
  const board = new Board();

  board.on("ready", () => {
  // Initialize the RGB LED
    const led = new Led.RGB({
      pins: {
        red: 6,
        green: 5,
        blue: 3
      }
    });

    // RGB LED alternate constructor
    // This will normalize an array of pins in [r, g, b]
    // order to an object (like above) that's shaped like:
    // {
    //   red: r,
    //   green: g,
    //   blue: b
    // }
    // const led = new Led.RGB([3,5,6]);

    // Add led to REPL [Read–Eval–Print Loop] (optional)
    board.repl.inject({ led });

    // Turn it on and set the random color
    //led.on();
    //led.intensity(100);
    //led.color({ red: arduinoRed, green: arduinoGreen, blue: arduinoBlue });
  });
}

export function setArduinoColour() {
  led.on();
  led.intensity(100);
  led.color({red: 255, green: 0, blue: 0 });
  //led.color({ red: arduinoRed, green: arduinoGreen, blue: arduinoBlue });
}
*/
