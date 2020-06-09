<script>

  import { getResults } from '../Game/fetch'
  import { gameProgress } from '../Game/gameStore'
  import { userColours, userColoursPerc } from '../Game/colourStore'
  import { setButtonTextToFinish } from '../Game/display'
  import { newRound } from '../Game/progress'

  $: arduinoInfo = getResults($userColoursPerc.red, $userColoursPerc.green, $userColoursPerc.blue);
  $: buttonText = setButtonTextToFinish($gameProgress.round);

</script>


<style>
  h2 {
    margin: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: 'Avenir Next Bold';
    color: white;
		font-size: 30px;
  }
  #results {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 80px;
  }
  #arduino {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-right: 20px;
  }
  #user {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-left: 20px;
  }
  #summary {
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
  <div id="results">
    <div id="arduino">
      <h3>Arduino</h3>
      <div class="boxArduino" style="background-color: rgb({item.red}, {item.green}, {item.blue})"/>
      <div id="arduinoResults">
        <p>{item.redPerc}% red</p>
        <p>{item.greenPerc}% green</p>
        <p> {item.bluePerc}% blue</p>
      </div>
    </div>
    <div id="user">
      <h3>User</h3>
      <div class="boxUser" style="background-color: rgb({$userColours.red}, {$userColours.green}, {$userColours.blue})"/>
      <div id="userResults">
        <p>{$userColoursPerc.red}% red</p>
        <p>{$userColoursPerc.green}% green</p>
        <p>{$userColoursPerc.blue}% blue</p>
      </div>
    </div>
  </div>
  <div id="summary&button">
    <p class="summaryParagraph">You got within {item.roundScore}% of the Arduino colour!</p>
    <button on:click={()=>newRound($gameProgress.round, arduinoInfo)}>{buttonText}</button>
  </div>
{:catch error}
  <p class="error" style="color: red">{error.message}</p>
{/await}
