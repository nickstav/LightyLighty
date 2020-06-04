<script>

  import { gameProgress } from '../Game/store'
  import { resultToServer } from '../Game/fetch';
  import { getHeader, getParagraph } from '../Game/display'
  import { quitGame } from '../Game/progress'

  // define required % accuracy to win the game
  const requiredScore = 15;

  export let oneScore, twoScore, threeScore, fourScore, fiveScore, finalScore;

/* ---------Send results to the server for light show-------------------------*/

const serverAddress = 'http://localhost:4000/enlightylightenment/';
resultToServer(serverAddress, finalScore);

/* ------------- --Display the results on the page----------------------------*/

  const resultHeader = getHeader(finalScore, requiredScore);
  const resultParagraph = getParagraph(finalScore, requiredScore);

/* --------------------------------------------------------------------------*/

</script>


<style>
  h2 {
    font-family: 'Avenir Next Bold';
    font-size: 30px;
    margin: 0;
    padding: 10px;
  }
  #results {
    padding: 60px;
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
  p {
		font-size: 12px;
    text-align: center;
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

</style>

<h2>{resultHeader}</h2>
<div id="results">
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
