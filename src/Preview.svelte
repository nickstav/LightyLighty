<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // call function to switch to PLay mode when button is pressed
  function goToPlay() {
    dispatch('clicked', {
      playMode: true,
    });
  }

</script>

<style>
  p {
    color: white;
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
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  button:hover {
    background: white;
    color: #565656;
  }
  .play {
    border: 1px solid white;
    padding: 4px;
  }
</style>

<p>Observe the LCD colour and click <span class="play">Play</span> to make your choice</p>
<button on:click={goToPlay}>Play</button>
