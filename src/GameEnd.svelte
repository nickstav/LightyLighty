<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { resultToServer } from './fetch.js';
  import { getHeader, getParagraph } from './display.js'

  const serverAddress = 'http://localhost:4000/enlightylightenment/'

  // define required % accuracy to win the game
  const requiredScore = 15;

  export let oneScore, twoScore, threeScore, fourScore, fiveScore, finalScore;

/* -----------------Event dispatcher to quit the game-------------------------*/

  function quitGame() {
      dispatch('quit', {
        isPlaying: false,
      });
    }

/* ---------Send results to the server for light show-------------------------*/

resultToServer(serverAddress, finalScore);

/* ------------- --Display the results on the page----------------------------*/

  const resultHeader = getHeader(finalScore, requiredScore);
  const resultParagraph = getParagraph(finalScore, requiredScore);

/* --------------------------------------------------------------------------*/

</script>


<style>
  h1 {
    font-family: 'Avenir Next Bold';
    color: white;
    font-size: 30px;
    text-align: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  table {
    color: white;
    border: 1px white;
    font-size: 12px;
    text-align: center;
    margin: auto;
    border-collapse: collapse;
  }
  table, th, td {
  border: 1px solid white;
  }
  th, td {
  padding: 10px;
  }
  .results {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    color: white;
		font-weight: 100;
		font-size: 12px;
    text-align: center;
  }
  button {
    background: black;
    border: none;
    color: white;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  button:hover {
    background: white;
    color: #565656;
  }

</style>

<h1>{resultHeader}</h1>
<div class="results">
  <table style="width:30%">
    <tr>
      <th>Round</th>
      <th>Accuracy</th>
    </tr>
    <tr>
      <td>1</td>
      <td>{oneScore}%</td>
    </tr>
    <tr>
      <td>2</td>
      <td>{twoScore}%</td>
    </tr>
    <tr>
      <td>3</td>
      <td>{threeScore}%</td>
    </tr>
    <tr>
      <td>4</td>
      <td>{fourScore}%</td>
    </tr>
    <tr>
      <td>5</td>
      <td>{fiveScore}%</td>
    </tr>
    <tr>
      <td>Overall</td>
      <td>{finalScore}%</td>
    </tr>
  </table>
  <p>{resultParagraph}</p>
</div>
<button on:click={quitGame}>Back to Start</button>
