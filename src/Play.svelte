<script>
  import { createEventDispatcher } from 'svelte';
  import { convertToPercentage } from './calculations.js';
  import { disablePreview, changeTextForRound5, ledDisplay } from './display.js'

  const dispatch = createEventDispatcher();

  export let round = 1;

  //variable to track whether to display Preview Mode or Play ('Guessing') Mode
  export let isGuessing = false;

  let buttonText = 'Guess Mode';

  //variable to define when to stop sending data to the server
  let hasGuessed = false;

/* ----------------------------User Colours----------------------------------*/

  // define user values for the RGB colours and their corresponding %s
  let userRed = 0;
  $: userRedPercentage = convertToPercentage(userRed);
  let userGreen = 0;
  $: userGreenPercentage = convertToPercentage(userGreen);
  let userBlue = 0;
  $: userBluePercentage = convertToPercentage(userBlue);

  // display the values of the sliders
  $: redLED = ledDisplay(userRedPercentage);
  $: greenLED = ledDisplay(userGreenPercentage);
  $: blueLED = ledDisplay(userBluePercentage);

  // the api parameters to send the relevant data to the server
  $: colourParams = `${userRed}/${userGreen}/${userBlue}/${isGuessing}`;

/* -------------------------send data to Server------------------------------*/

  /* NOTE FOR MATT: I decided to leave this function here rather than move it to
  fetch.js as I'd find the app easier to understand with this big ol' function
  displayed in the Play.svelte component... not as neat but personally easier to
  follow... so yeah... what be yer thoughts..? */

  async function sendSliderValues() {
    if (!hasGuessed) {
      const serverAddress = 'http://localhost:4000/play/';
      //set up the slider values (and current page of the app) as parameters
      const sliderAddress = serverAddress + colourParams;
      const response = await fetch(sliderAddress);
      const connection = await response.json();
      /* TODO - work out why Arduino isn't being recognised on reconnection.
      Once down the following will check if server says the ardiuno has been
      disconnected and prompt the user to continue or quit */
      if (!connection) {
        const reconnect = confirm('Please reconnect your Arduino');
        if (reconnect) {
          sendSliderValues();
        } else {
          dispatch('quit', {
            isPlaying: false,
          });
        };
      };
    } else {
      //once the guess is complete, stop the updateServer calling this function
      clearInterval(updateServer);
    };
  }

  // call the above function every 500ms
  let updateServer = setInterval(sendSliderValues, 500);

/* ------------------------Event handling------------------------------------*/

  $: checkRound5 = disablePreview(round, isGuessing);

  let secondParagraph = changeTextForRound5(round);

  function switchModes() {
    if (isGuessing) {
      buttonText = 'Guess Mode';
    } else {
      buttonText = 'Preview Mode';
    };
    isGuessing = !isGuessing;
  }

  // once submitted, all relevant data to be passed via event dispatcher
  function submitAttempt() {
    hasGuessed = true;
    dispatch('submitted', {
      redVal: userRed,
      redPerc: userRedPercentage,
      greenVal: userGreen,
      greenPerc: userGreenPercentage,
      blueVal: userBlue,
      bluePerc: userBluePercentage,
      hasGuessed,
    });
  }

/* --------------------------------------------------------------------------*/

</script>

<style>
/* -----------------------------Positioning----------------------------------*/
  h2 {
    font-family: 'Avenir Next Bold';
		font-size: 35px;
    text-align: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    font-size: 12px;
  }
  p.round5Warning {
    font-size: 12px;
    position: absolute;
    top: 18%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .previewInstructions {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 5%;
    width: 80%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .guessInstructions {
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
    height: 10%;
    width: 80%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .userSliders {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .redDisplay {
    width: 10px;
    position: absolute;
    top: 22%;
    left: var(--positionRed);
    pointer-events: none;
  }
  .greenDisplay {
    width: 10px;
    position: absolute;
    top: 45%;
    left: var(--positionGreen);
    pointer-events: none;
  }
  .blueDisplay {
    width: 10px;
    position: absolute;
    top: 68%;
    left: var(--positionBlue);
    pointer-events: none;
  }
  .button {
    width: 30%;
    height: 5%;
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
  }
/* -----------------------------Styling--------------------------------------*/
  .slider {
    -webkit-appearance: none;  /* Override default CSS styles */
            appearance: none;
    background: none;
    border: none;
  }
  .slider::-webkit-progress-value {
    height: 25px;
    border-top: 2px solid #959595;
    border-bottom: 2px solid #959595;
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  }
  .slider::-moz-range-progress {
    height: 25px;
    border-top: 2px solid #959595;
    border-bottom: 2px solid #959595;
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  }
  .slider:hover {
    opacity: 1;
  }
  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
            appearance: none;
    width: 55px;
    height: 55px;
    border-radius: 10% 50% 50% 10%;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 55px;
    height: 55px;
    border-radius: 10% 50% 50% 10%;
    border: none;
    cursor: pointer;
  }
  .red::-webkit-slider-thumb {
    background-color: rgb(var(--redLED),0,0);
    box-shadow: 0px 0px var(--redGlow) 0px rgb(var(--redLED),0,0);
  }
  .red::-moz-range-thumb {
    background-color: rgb(var(--redLED),0,0);
    box-shadow: 0px 0px var(--redGlow) 0px rgb(var(--redLED),0,0);
  }
  .green::-webkit-slider-thumb {
    background-color: rgb(0,var(--greenLED),0);
    box-shadow: 0px 0px var(--greenGlow) 0px rgb(0,var(--greenLED),0);
  }
  .green::-moz-range-thumb {
    background-color: rgb(0,var(--greenLED),0);
    box-shadow: 0px 0px var(--greenGlow) 0px rgb(0,var(--greenLED),0);
  }
  .blue::-webkit-slider-thumb {
    background-color: rgb(0,0,var(--blueLED));
    box-shadow: 0px 0px var(--blueGlow) 0px rgb(0,0,var(--blueLED));
  }
  .blue::-moz-range-thumb {
    background-color: rgb(0,0,var(--blueLED));
    box-shadow: 0px 0px var(--blueGlow) 0px rgb(0,0,var(--blueLED));
  }
  button {
    font-size: 15px;
    color: white;
    background: black;
    border: none;
    width: 120px;
    padding: 5px;
    cursor: pointer;
  }
  button:hover {
    background: white;
    color: #565656;
  }
  button:disabled {
    opacity: 0.3;
  }
</style>

<h2> Round {round} </h2>
<div class="button">
  <button disabled={checkRound5} class="preview" on:click={switchModes}>{buttonText}</button>
  <button disabled={!isGuessing} class="submit" on:click={submitAttempt}>Check</button>
</div>
{#if round ==5}
  <p class="round5Warning"> You will not be able to go back to preview mode for this one!</p>
{/if}
{#if isGuessing}
  <div class="userSliders">
    <input style="--redLED: {userRed};--redGlow:{userRedPercentage}px" type="range" class ="slider red" min=0 max=255 bind:value={userRed}>
    <input style="--greenLED: {userGreen};--greenGlow:{userGreenPercentage}px" type="range" class="slider green" min=0 max=255 bind:value={userGreen}>
    <input style="--blueLED: {userBlue};--blueGlow:{userBluePercentage}px" type="range" class="slider blue" min=0 max=255 bind:value={userBlue}>
  </div>
  <div class="redDisplay" style="--positionRed: {redLED}%">
    <p>Red {userRedPercentage}%</p>
  </div>
  <div class="greenDisplay" style="--positionGreen: {greenLED}%">
    <p>Green {userGreenPercentage}%</p>
  </div>
  <div class="blueDisplay" style="--positionBlue: {blueLED}%">
    <p>Blue {userBluePercentage}%</p>
  </div>
  <div class="guessInstructions">
    <p>This is <strong>Guess Mode</strong>. Adjust your sliders to closely match the target LED colour.</p>
    <p>{@html secondParagraph}</p>
  </div>
{:else}
  <div class="previewInstructions">
    <p>You are in <strong>Preview Mode</strong>. Take note of the LED colour you need to match</p>
    <p>Click the <strong>Guess Mode</strong> button below to adjust your own RGB values</p>
  </div>
{/if}
