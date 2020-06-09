<script>
	import Welcome from './Components/Welcome.svelte';
	import ConnectButton from './Components/ConnectButton.svelte';
	import Play from './Components/Play.svelte';
	import Results from './Components/Results.svelte';
	import GameEnd from './Components/GameEnd.svelte';

	import { gameProgress } from './Game/gameStore'
	import { getBackgroundColour } from './Game/display'

	// random neon colour for the splash page or grey fade for rest of the app
	$: backgroundColour = getBackgroundColour($gameProgress.isReady);

</script>

<style>
	#background {
		position: relative;
		height:100%;
		width:100%;
		background-image: linear-gradient(to right, var(--background-colour), #222222);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	#topBar {
		width: 100%;
		height: 50px;
		background-color: #1F1F1F;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
	h1 {
		font-family: 'Avenir Next Bold';
		font-size: 20px;
		padding-left: 10px;
	}
</style>

<div id="background" style="--background-colour: {backgroundColour}">
	<div id="topBar">
		<h1>LightyLighty</h1>
		<ConnectButton/>
</div>
	{#if !$gameProgress.isReady}
		<Welcome/>
	{:else if $gameProgress.gameFinished}
		<GameEnd/>
	{:else if !$gameProgress.guessComplete}
		<Play/>
	{:else}
		<Results/>
	{/if}
</div>
