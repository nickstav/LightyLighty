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
    background-image: url("../button/disconnect.png");
    background-size: 100%;
    border: 1px solid white;
    width: 40px;
    height: 40px;
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

<button on:click={quitGame}></button>
