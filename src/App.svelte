<script>
	import Welcome from './Welcome.svelte';
	import QuitButton from './QuitButton.svelte';
	import Play from './Play.svelte';
	import Results from './Results.svelte';
	import GameEnd from './GameEnd.svelte';

	import { checkConnection, changeArduinoColour } from './fetch.js'
	import { setButtonText, disablePreview } from './display.js'

	//define a server address for starting the game and moving onto subsequent rounds
	const serverAddress = 'http://localhost:4000/startRound';
	// define packages to be passed onto the Svelte components
	let pkgRound, pkgEnd;
	// define an array to store each rounds results
	let results = [];
	// start at round 1
	let round = 1;
	// define variables to track progress of game
	let isReady = false;
	let guessComplete = false;
	let gameFinished = false;
	// define variable to check if we are round 5 or not (to disable Preview)
	let checkRound;

/* ------------------------Event handling------------------------------------*/

	async function startGame(event) {
		const arduinoConnected = await checkConnection(serverAddress);
		if (arduinoConnected) {
			isReady = event.detail.ready;
		} else {
			alert('No Arduino detected. Please connect your device');
		};
	}

  // use event dispatcher from QuitButton to quit the game and reset game variables
	function quitGame(event) {
		isReady = event.detail.isPlaying;
		round = 1;
		results = [];
		gameFinished = false;
		guessComplete = false;
	}

	function showResult(event) {
		// obtain the user colour values and send to the Results component (w/ button text)
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

	function startNextRound(event) {
		// parseFloat turns the array values from a string to a number
		results.push(parseFloat(event.detail.score));
		if (round < 5) {
			//move onto the next round and check if we need to disable the preview button
			guessComplete = false;
			round += 1;
			checkRound = disablePreview(round);
			changeArduinoColour(serverAddress);
		} else {
			//game is finished and call the finishGame function
			finishGame();
		};
	}

/* ------------------------Finish the game-----------------------------------*/

	function finishGame() {
		gameFinished = true;
		// get the average value of an array using reduce function
		const averageScore = (results.reduce((a, b) => a + b, 0)) / 5;
		pkgEnd = {
			oneScore: results[0],
			twoScore: results[1],
			threeScore: results[2],
			fourScore: results[3],
			fiveScore: results[4],
			finalScore: averageScore.toFixed(2),
		};
		guessComplete = false;
	}

/* --------------------------------------------------------------------------*/

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
