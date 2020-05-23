<script>
  import { createEventDispatcher } from 'svelte';
  import { arduinoRed, arduinoGreen, arduinoBlue, setArduinoColour } from './arduino.js';

  const dispatch = createEventDispatcher();

  function goToPlay() {
    dispatch('clicked', {
      playMode: true,
    });
  }

</script>

<style>
  p {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 12px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  button {
    background: none;
    color: white;
    font-family: "Lucida Console", Courier, monospace;
    position: absolute;
    top: 60%;
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
  .box {
		width: 50px;
		height: 50px;
		position: absolute;
    top: 88%;
    left: 90%;
		border-radius: 4px;
	}
</style>

<p>Observe the LCD colour and click <span class="play">Play</span> to make your choice</p>
<button on:click={goToPlay}>Play</button>
<div class="box" style="background-color: rgb({arduinoRed}, {arduinoGreen}, {arduinoBlue})"></div>
