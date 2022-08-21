const rockImg = document.getElementById('rockImg');
const paperImg = document.getElementById('paperImg');
const scissorsImg = document.getElementById('scissorsImg');
const opponentDiv = document.getElementById('opponent-area');
const buttonsDiv = document.getElementById('buttons');
const resultsDiv = document.getElementById('results');
const stateDiv = document.getElementById('gameState');

const maxRounds = 3;
let roundsPlayed = 0;
let opponentRoundsWon = 0;
let opponentThinking = false;
let selectedChoice = 'none';

updateGameState();

function updateGameState(gameEnd, winner) {
    if (gameEnd){
        stateDiv.innerText = `Game Over! And the winner is the ${winner}!!`;
        return;
    }

    const playerRoundsWon = roundsPlayed - opponentRoundsWon;
    const rounds = `Round ${roundsPlayed + 1}/${maxRounds}`;
    const state = `Player: ${playerRoundsWon} | Opponent: ${opponentRoundsWon}`;
    stateDiv.innerText = `${rounds} || ${state}`;
}

function selectChoice(choice) {
    if (opponentThinking){
        // we have to wait for our opponent before making another move
        return;
    }

    opponentThinking = true;
    selectedChoice = choice;
    changeSelectedImage(choice, true);
    opponentTurn();
}

function changeSelectedImage(choice, highlight) {
    let img;
    switch (choice){
        case 'rock':{
            img = rockImg;
        } break;
        case 'paper':{
            img = paperImg;
        } break;
        default: {
            img = scissorsImg;
        } break;
    }

    const classList = img.classList;
    const style = 'selected-img';
    if (highlight){
        classList.add(style);
    } else {
        classList.remove(style);
    }
}

function opponentTurn() {
    opponentDiv.innerHTML = '<img src="pics/question_mark.png" class="thinking" alt="opponent thinking">';

    setTimeout(opponentChoice, 4000);
}

function opponentChoice() {
    const randChoice = Math.random();
    let choice;
    if (randChoice > 0.66){
        choice = 'rock';
    } else if (randChoice > 0.33){
        choice = 'paper';
    } else {
        choice = 'scissors';
    }
    opponentDiv.innerHTML = `<img src="pics/${choice}.png" alt="opponent choice">`;

    setTimeout(function() {
        if (selectedChoice === choice){
            showDraw();
        } else {
            determineWinner(selectedChoice, choice);
        }
    }, 2000);
}

function showDraw() {
    showResult('Draw!');
}

function showResult(result, endState = false) {
    resultsDiv.innerText = result;
    showDiv(resultsDiv, true);

    showDiv(buttonsDiv, false);
    showDiv(opponentDiv, false);

    const thinkingDuration = Math.floor(Math.random() * (5000 - 1500)) + 1500;
    if (!endState) {
        setTimeout(nextRound, thinkingDuration);
    }
}

function nextRound() {
    showDiv(buttonsDiv, true);
    showDiv(opponentDiv, true);
    showDiv(resultsDiv, false);

    changeSelectedImage(selectedChoice, false);
    opponentDiv.innerText = '';

    opponentThinking = false;
}

function determineWinner(ownChoice, opponentChoice){
    let opponentWins;
    switch (ownChoice){
        case 'rock':{
            opponentWins = opponentChoice === 'paper';
        } break;
        case 'paper':{
            opponentWins = opponentChoice === 'scissors';
        } break;
        default: {
            opponentWins = opponentChoice === 'rock';
        } break;
    }

    roundsPlayed++;
    if (opponentWins) {
        opponentRoundsWon++;
    }
    const gameEnd = determineGameEnd();

    if (opponentWins) {
        showResult('Opponent wins!', gameEnd[0]);
    } else {
        showResult('You win!', gameEnd[0]);
    }
    updateGameState(gameEnd[0], gameEnd[1]);
}

function determineGameEnd() {
    switch (roundsPlayed){
        case 0:
        case 1: break;
        case 2: {
            if (opponentRoundsWon === 2){
                return [true, 'opponent'];
            }
            if (opponentRoundsWon === 0){
                return [true, 'player'];
            }
        } break;
        case 3: {
            if (opponentRoundsWon === 1){
                return [true, 'player'];
            }
            return [true, 'opponent'];
        }
    }
    return [false, null];
}

function showDiv(div, show) {
    if (show){
        div.style.display = 'block';
    } else {
        div.style.display = 'none'
    }
}
