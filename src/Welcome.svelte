<script>
  import { createEventDispatcher } from 'svelte';
  import { randomNeonColour } from './calculations.js'

  const dispatch = createEventDispatcher();

  function connectArduino() {
    dispatch('clicked', {
      ready: true,
    });
  }

  // random neon colour for the splash page
  const neonColour = randomNeonColour();

</script>

<style>
  :root {
    --neon-colour: {neonColour};
  }
  body {
    background-image: linear-gradient(to right, var(--neon-colour) , #222222);
  }
  h1 {
    color: white;
		font-size: 35px;
    text-align: center;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    color: white;
		font-size: 13px;
    text-align: center;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .appName {
    font-family: 'Avenir Next Bold';
  }
  button {
    background-image: url("../button/connect.png");
    background-size: 100%;
    border: 1px solid white;
    font-size: 50px;
    position: absolute;
    top: 4.5%;
    left: 97%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  button:hover {
    border: 3px solid white;
  }
</style>

<body style="background-image: linear-gradient(to right, {neonColour} , #222222)"></body>
<h1> Welcome to <span class="appName">LightyLighty</span></h1>
<p> Attach your Arduino, then click the connect button above to begin </p>
<button on:click={connectArduino}></button>
