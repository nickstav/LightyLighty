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
  h2 {
    font-family: 'Avenir Next Bold';
    color: white;
		font-size: 30px;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .results {
    position: absolute;
    height: 50%;
    width: 20%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .arduino {
    height: 300px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .user {
    height: 300px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .summary {
    position: absolute;
    height: 30%;
    width: 80%;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    color: white;
		font-size: 12px;
    text-align: center;
  }
  p {
    color: white;
		font-size: 10px;
  }
  p.summaryParagraph {
    color: white;
		font-size: 16px;
    text-align: center;
  }
  p.error {
    font-size: 20px;
  }
  button {
    width: 100px;
    height: 30px;
    background: black;
    border: none;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background: white;
    color: #565656;
  }
  .boxArduino {
		width: 50px;
		height: 50px;
	}
  .boxUser {
		width: 50px;
		height: 50px;
	}
</style>
{#await arduinoInfo}
  <p>loading...</p>
{:then item}
  <h2>Results</h2>
  <div class = "results">
    <div class="arduino">
      <h3> Arduino Colour </h3>
      <div class="boxArduino" style="background-color: rgb({item.red}, {item.green}, {item.blue})"></div>
      <div class="arduinoResults">
        <p>{item.redPerc}% red</p>
        <p>{item.greenPerc}% green</p>
        <p> {item.bluePerc}% blue</p>
      </div>
    </div>
    <div class="user">
      <h3> User Colour </h3>
      <div class="boxUser" style="background-color: rgb({redValue}, {greenValue}, {blueValue})"></div>
      <div class="userResults">
        <p>{redPercentage}% red</p>
        <p>{greenPercentage}% green</p>
        <p>{bluePercentage}% blue</p>
      </div>
    </div>
  </div>
  <div class="summary">
    <p class="summaryParagraph">You got within {item.roundScore}% of the Arduino colour!</p>
    <button on:click={newRound}>{buttonText}</button>
  </div>
{:catch error}
  <p class="error" style="color: red">{error.message}</p>
{/await}
