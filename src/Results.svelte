<script>
  import { createEventDispatcher } from 'svelte';
  import { getResults } from './fetch.js'

  export let redValue, greenValue, blueValue;
  export let redPercentage, greenPercentage, bluePercentage;
  export let buttonText;

  const serverAddress = 'http://localhost:4000/results/';

  const dispatch = createEventDispatcher();

/* --------------------------Get the results---------------------------------*/

  let arduinoInfo = getResults(serverAddress, redPercentage, greenPercentage, bluePercentage);

/* ------------------------Event handling------------------------------------*/

  async function newRound(){
    const results = await arduinoInfo;
    const score = results.roundScore;
    dispatch('nextRound', {
      score: score,
    });
  }

/* --------------------------------------------------------------------------*/

</script>


<style>
  h1 {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 30px;
    text-align: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h2 {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 12px;
    text-align: center;
    position: absolute;
    top: 30%;
    transform: translate(-50%, -50%);
  }
  h2.arduino {
    left: 40%;
  }
  h2.user {
    left: 60%;
  }
  p {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 10px;
    text-align: center;
  }
  button {
    background: none;
    color: white;
    font-family: "Lucida Console", Courier, monospace;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  button:hover {
    background: white;
    color: #565656;
  }
  .play {
    border: 1px solid white;
    padding: 4px;
  }
  .boxArduino {
		width: 50px;
		height: 50px;
		position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
	}
  .boxUser {
		width: 50px;
		height: 50px;
		position: absolute;
    top: 40%;
    left: 60%;
    transform: translate(-50%, -50%);
	}
  .arduinoResults {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
  }
  .userResults {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
  }
  p.results {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
{#await arduinoInfo}
<p>loading...</p>
{:then item}
<h1> Results </h1>
<h2 class="arduino"> Arduino Colour </h2>
<div class="boxArduino" style="background-color: rgb({item.red}, {item.green}, {item.blue})"></div>
<div class="arduinoResults">
  <p>{item.redPerc}% red</p>
  <p>{item.greenPerc}% green</p>
  <p> {item.bluePerc}% blue</p>
</div>
<h2 class="user"> User Colour </h2>
<div class="boxUser" style="background-color: rgb({redValue}, {greenValue}, {blueValue})"></div>
<div class="userResults">
  <p>{redPercentage}% red</p>
  <p>{greenPercentage}% green</p>
  <p> {bluePercentage}% blue</p>
</div>
<p class="results">You got within {item.roundScore}% of the Arduino colour!</p>
<button on:click={newRound}>{buttonText}</button>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
