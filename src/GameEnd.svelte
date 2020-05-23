<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let oneScore, twoScore, threeScore, fourScore, fiveScore, finalScore;

  const requiredScore = 10;

  function quitGame() {
      dispatch('quit', {
        isPlaying: false,
      });
    }

  function getHeader(score) {
    if (score <  requiredScore) {
      return 'Congratulations!';
    } else {
      return 'Game Over';
    };
  }

  function getParagraph(score) {
    if (score < requiredScore) {
      return `Your accuracy was less than ${requiredScore}%!`;
    } else {
      return `You didn't get within ${requiredScore}%. Try again!`;
    };
  }

  const resultHeader = getHeader(finalScore);
  const resultParagraph = getParagraph(finalScore);

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
  table {
    color: white;
    border: 1px white;
    font-family: "Lucida Console", Courier, monospace;
    font-weight: 100;
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
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 12px;
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
