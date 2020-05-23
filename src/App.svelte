<script>
	import { connectArduino, setArduinoColour } from './arduino.js';
	import Welcome from './Welcome.svelte';
	import QuitButton from './QuitButton.svelte';
	import Play from './Play.svelte';
	import Results from './Results.svelte';
	import GameEnd from './GameEnd.svelte';

	let pkgRound, pkgEnd;
	let results = [];
	let checkRound;
	let round = 1;
	let isReady = false;
	let guessComplete = false;
	let gameFinished = false;

	function startGame(event) {
		connectArduino();
		isReady = event.detail.ready;
	}

	function quitGame(event) {
		isReady = event.detail.isPlaying;
		round = 1;
		results = [];
		gameFinished = false;
	}

	function disablePreview(currentRound) {
		if (currentRound == 5) {
			return true;
		} else {
			return false;
		};
	}

	function setButtonText(currentRound) {
		if (currentRound < 5) {
			return 'Next Round';
		} else {
			return 'Finish';
		};
	}

	function showResult(event) {
		pkgRound = {
			redValue: event.detail.redVal,
			redPercentage: event.detail.redPerc,
			greenValue: event.detail.greenVal,
			greenPercentage: event.detail.greenPerc,
			blueValue: event.detail.blueVal,
			bluePercentage: event.detail.bluePerc,
			buttonText: setButtonText(round),
		};
		guessComplete = event.detail.hasGuessed;
	}

	function finishgame() {
		gameFinished = true;
		guessComplete = false;
		const averageScore = (results.reduce((a, b) => a + b, 0)) / 5;
		pkgEnd = {
			oneScore: results[0],
			twoScore: results[1],
			threeScore: results[2],
			fourScore: results[3],
			fiveScore: results[4],
			finalScore: averageScore.toFixed(2),
		};
	}

	function startNextRound(event) {
		results.push(parseFloat(event.detail.score));
		if (round < 5) {
			guessComplete = false;
			round += 1;
			checkRound = disablePreview(round);
		} else {
			finishgame();
		};
	}

</script>

<style>
	body {
		background-color: #565656;
		padding: 0px;
	}
	h1 {
		width: 100%;
		padding-top: 10px;
		padding-bottom: 10px;
		background-color: #262626;
		font-family: "Lucida Console", Courier, monospace;
		font-weight: 900;
		font-size: 16px;
		color: white;
	}
</style>

<body>
	<h1>LightyLighty</h1>
	<QuitButton on:quit={quitGame}/>
{#if !isReady}
	<Welcome on:clicked={startGame}/>
{:else if gameFinished}
	<GameEnd on:quit={quitGame} {...pkgEnd}/>
{:else if !guessComplete}
	<Play checkRound5={checkRound} round={round} on:submitted={showResult}/>
{:else}
	<Results on:nextRound={startNextRound} {...pkgRound}/>
{/if}
</body>
