<script>
	import Welcome from './Components/Welcome.svelte';
	import ConnectButton from './Components/ConnectButton.svelte';
	import Play from './Components/Play.svelte';
	import Results from './Components/Results.svelte';
	import GameEnd from './Components/GameEnd.svelte';

	import { gameProgress } from './Game/store'
	import { changeArduinoColour } from './Game/fetch'
	import { getBackgroundColour, setButtonTextToFinish } from './Game/display'

	// packages to be sent to Results and GameEnd components
	let pkgEnd, pkgRound;

/* --------------------------Set Background---------------------------------*/

	// random neon colour for the splash page or grey fade for rest of the app
	$: backgroundColour = getBackgroundColour($gameProgress.isReady);

	/* ------------------------Event Handling---------------------------------*/

	// obtain user colour values and send to Results component (w/ button text)
	function showResult(event) {
		pkgRound = {
			redValue: event.detail.redVal,
			redPercentage: event.detail.redPerc,
			greenValue: event.detail.greenVal,
			greenPercentage: event.detail.greenPerc,
			blueValue: event.detail.blueVal,
			bluePercentage: event.detail.bluePerc,
			buttonText: setButtonTextToFinish($gameProgress.round),
		};
		gameProgress.update(progress => {
			return {
				...progress,
				isGuessing: false,
				guessComplete: true
			}
		});
	}

	// add results to array & move onto next round (or finish game if at round 5)
	function startNextRound(event) {
		const roundResults = $gameProgress.results;
		// parseFloat turns the array values from a string to a number
		roundResults.push(parseFloat(event.detail.score));
	  gameProgress.update(progress => {
	    return {
	      ...progress,
	      results: roundResults
	    };
	  });
	  if ($gameProgress.round < 5) {
	    //move onto the next round
	    gameProgress.update(progress => {
	      return {
	        ...progress,
	        guessComplete: false,
					hasGuessed: false,
	        round: $gameProgress.round + 1
	      }
	    });
			const serverAddress = 'http://localhost:4000/startRound';
	    changeArduinoColour(serverAddress);
	  } else {
	    //game is finished and call the finishGame function below
	    finishGame();
	  };
	}

	function finishGame() {
	  gameProgress.update(progress => {
	    return {
	      ...progress,
	      gameFinished: true
	    };
	  });
	  // get the average value of an array using reduce function
	  const averageScore = ($gameProgress.results.reduce((a, b) => a + b, 0)) / 5;
		// compile results in a package to send to GameEnd component
	  pkgEnd = {
	    oneScore: $gameProgress.results[0],
	    twoScore: $gameProgress.results[1],
	    threeScore: $gameProgress.results[2],
	    fourScore: $gameProgress.results[3],
	    fiveScore: $gameProgress.results[4],
	    finalScore: averageScore.toFixed(2),
	  };
	}

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
		<GameEnd {...pkgEnd}/>
	{:else if !$gameProgress.guessComplete}
		<Play on:submitted={showResult}/>
	{:else}
		<Results on:nextRound={startNextRound} {...pkgRound}/>
	{/if}
</div>
