# What is LightyLighty?
 LightyLighty is a game created with Svelte for the Arduino and a RGB LED. It was tested using an Elegoo UNO R3.

 The aim of the game is to observe a random colour from the RGB LED and then attempt to recreate it from memory using 3 sliders for the red, green and blue components of the colour. The game will score the player and, if accurate enough, will award the player with a RGB LED light show at the end!

# Instructions
1. Make sure you've got [NodeJS](https://nodejs.org/en/download/) installed
2. Run `npx degit nickstav/LightyLighty your-folder`
3. `cd your-folder`
4. Run `npm i` to install Svelte dependencies
5. Set up your Arduino circuit as per [this diagram](https://create.arduino.cc/projecthub/muhammad-aqib/arduino-rgb-led-tutorial-fc003e)
6. `npm run project` to run the app and server in parallel