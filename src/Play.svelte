<script>
  import Preview from './Preview.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let round = 1;
  export let checkRound5;
  let isGuessing = false;

  let userRed = 0;
  $: userRedPercentage = Math.round((userRed/255)*100);
  let userGreen = 0;
  $: userGreenPercentage = Math.round((userGreen/255)*100);
  let userBlue = 0;
  $: userBluePercentage = Math.round((userBlue/255)*100);

  function switchToPreview() {
    isGuessing = false;
  }

  function submitAttempt() {
    dispatch('submitted', {
      redVal: userRed,
      redPerc: userRedPercentage,
      greenVal: userGreen,
      greenPerc: userGreenPercentage,
      blueVal: userBlue,
      bluePerc: userBluePercentage,
      hasGuessed: true,
    });
  }

  function switchToPlay(event){
		isGuessing = event.detail.playMode;
	}

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
    top: 18%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 400;
		font-size: 12px;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .slider {
    webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 80%;
    height: 25px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
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
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .bubble {
    background: red;
    color: white;
    padding: 4px 12px;
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
  }
  .bubble::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 2px;
    background: red;
    top: -1px;
    left: 50%;
  }
  .red {
    top: 25%;
  }
  p.red {
    top: 28%;
  }
  .red::-webkit-slider-thumb {
    background: #B53737;
  }
  .red::-moz-range-thumb {
    background: #B53737;
  }
  .green {
    top: 50%;
  }
  p.green {
    top: 53%;
  }
  .green::-webkit-slider-thumb {
    background: #4CAF50;
  }
  .green::-moz-range-thumb {
    background: #4CAF50;
  }
  .blue {
    top:75%;
  }
  p.blue {
    top: 78%;
  }
  .blue::-webkit-slider-thumb {
    background: #2A9DF4;
  }
  .blue::-moz-range-thumb {
    background: #2A9DF4;
  }
  button {
    background: none;
    color: white;
    font-family: "Lucida Console", Courier, monospace;
    position: absolute;
    top: 90%;
    transform: translate(-50%, -50%);
  }
  button:hover {
    background: white;
    color: #565656;
  }
  button:disabled {
    opacity: 0.3;
  }
  button.preview {
    left: 40%;
  }
  button.submit {
    left: 60%;
  }
  .box {
		width: 50px;
		height: 50px;
		position: absolute;
    top: 88%;
    left: 90%;
		border-radius: 4px;
	}
</style>

<h1> Round {round} </h1>
{#if round ==5}
  <h2> You will not be able to go back to preview mode for this one!</h2>
{/if}
{#if !isGuessing}
	<Preview on:clicked={switchToPlay}/>
{:else}
  <input type="range" class ="slider red" min=0 max=255 bind:value={userRed}>
  <p class="red">Red:{userRedPercentage}%</p>
  <input type="range" class="slider green" min=0 max=255 bind:value={userGreen}>
  <p class="green">Green:{userGreenPercentage}%</p>
  <input type="range" class="slider blue" min=0 max=255 bind:value={userBlue}>
  <p class="blue">Blue:{userBluePercentage}%</p>
  <div class="button">
    <button disabled={checkRound5} class="preview" on:click={switchToPreview}>Preview</button>
    <button class="submit" on:click={submitAttempt}>Submit</button>
  </div>
  <div class="box" style="background-color: rgb({userRed}, {userGreen}, {userBlue})"></div>
{/if}
