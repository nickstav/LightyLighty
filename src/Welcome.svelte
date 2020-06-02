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
  .welcomeText {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  p.intro {
		font-size: 35px;
  }
  p.instructions {
		font-size: 13px;
  }
  .appName {
    font-family: 'Avenir Next Bold';
  }
  button {
    background-image: url("../button/connect.png");
    background-size: 100%;
    width: 40px;
    height: 40px;
    border: 1px solid white;
    position: absolute;
    top: 4.2%;
    left: 97%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  button:hover {
    border: 3px solid white;
  }
</style>

<div class="welcomeText">
  <p class="intro">Welcome to <span class="appName">LightyLighty</span></p>
  <p class="instructions">Attach your Arduino, then click the connect button above to begin</p>
</div>
<button on:click={connectArduino}></button>
