// http://johnny-five.io/api/led.rgb/
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

  // Turn it on and set the initial color
  led.on();
  led.intensity(100);
  led.color({ red: R, green: G, blue: B })

});
