<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function quitGame() {
    const confirmation = confirm('Are you sure you want to quit?');
    if (confirmation) {
      dispatch('quit', {
        isPlaying: false,
      });
    };
  }

</script>

<style>
  button {
    background: none;
    color: white;
    font-family: "Lucida Console", Courier, monospace;
    font-size: 10px;
    position: absolute;
    top: 3.5%;
    left: 97%;
    transform: translate(-50%, -50%);
  }
  button:hover {
    background: white;
    color: #565656;
  }
</style>

<button on:click={quitGame}>Quit</button>
