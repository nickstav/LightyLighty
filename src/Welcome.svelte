<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function connectArduino() {
  dispatch('clicked', {
    ready: true,
  });
}

</script>

<style>
  h1 {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 20px;
    text-align: center;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    color: white;
    font-family: "Lucida Console", Courier, monospace;
		font-weight: 100;
		font-size: 12px;
    text-align: center;
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .appName {
    font-weight: 900;
    font-size: 24px;
  }
  button {
    background: none;
    color: white;
    font-family: "Lucida Console", Courier, monospace;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  button:hover {
    background: white;
    color: #565656;
  }
</style>

<h1> Welcome to <span class="appName">LightyLighty</span></h1>
<p> Please connect your Arduino and click the Connect button to begin </p>
<button on:click={connectArduino}>Connect</button>
