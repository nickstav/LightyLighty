<script>

  import { gameProgress } from '../Game/gameStore'
  import { startGame, quitGame } from '../Game/progress'

</script>

<style>

  button.quit {
    background-image: url("../button/disconnect.png");
  }
  button.connect {
    background-image: url("../button/connect.png");
  }
  button {
    background-size: 100%;
    border: 1px solid white;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  button:hover {
    border: 3px solid white;
  }

</style>

{#if $gameProgress.isReady}
  <button class="quit" on:click={quitGame}></button>
{:else}
  <button class="connect" on:click={startGame}></button>
{/if}
