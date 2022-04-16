// Create enum because javascript is bad
const Option = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
};
Object.freeze(Option);

const ROCK_CLASSES = "fa-solid fa-hand-back-fist";
const PAPER_CLASSES = "fa-solid fa-hand";
const SCISSORS_CLASSES = "fa-solid fa-hand-scissors";
const DEFAULT_CLASSES = "fa-solid fa-circle-question";

// DOM Elements
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

const playerSelection = document.getElementById("player-selection");
const computerSelection = document.getElementById("computer-selection");
const msg = document.getElementById("msg");

//Global Variables
let pScore = 0, cScore = 0;

// Event listeners
rock.addEventListener('click', (e) => { PlayRound(e.target, Option.ROCK); });
paper.addEventListener('click', (e) => { PlayRound(e.target, Option.PAPER); });
scissors.addEventListener('click', (e) => { PlayRound(e.target, Option.SCISSORS); });

function ComputerPlay() {
    return Math.floor(Math.random() * 3);
}

function PlayRound(selected, playerInput) {
    NewRound();

    selected.classList.add("selected");

    let computerInput = ComputerPlay();
    
    // Error Handling
    if(playerInput < Option.ROCK || playerInput > Option.SCISSORS ||
       computerInput < Option.ROCK || computerInput > Option.SCISSORS) {
        DisplayError("Input out of bounds");
        return -1;
    }
    UpdateSelection(playerInput, playerSelection);
    UpdateSelection(computerInput, computerSelection);
    UpdateGame(GetRoundResult(playerInput, computerInput));
}

function GetRoundResult(playerInput, computerInput) {
    if(playerInput === computerInput) {
        return "DRAW";
    } else if (playerInput === Option.ROCK) {
        return (computerInput === Option.PAPER ? "COMPUTER" : "PLAYER");
    } else if (playerInput === Option.PAPER) {
        return (computerInput === Option.ROCK ? "PLAYER" : "COMPUTER");
    } else if (playerInput === Option.SCISSORS) {
        return (computerInput === Option.ROCK ? "COMPUTER" : "PLAYER");
    }
}

function UpdateSelection(input, element) {
    switch(input) {
        case Option.ROCK:
            element.className = ROCK_CLASSES;
            break;
        case Option.PAPER:
            element.className = PAPER_CLASSES;
            break;
        case Option.SCISSORS:
            element.className = SCISSORS_CLASSES;
            break;
        default:
            break;
    }
}

function UpdateGame(result) {
    let newMsg = document.createElement('p');

    if(result === "DRAW") {
        newMsg.textContent = "The round ends in a draw!"

    } else if (result === "PLAYER") {
        newMsg.textContent = "That's another goal for Engine Parts!";
        pScore += 1;

    } else if (result === "COMPUTER") {
        newMsg.textContent = "Oof! These bots have hands!";
        cScore += 1;

    } else {
        DisplayError("Unintended round result!");
        return 0;
    }

    UpdateScore();
    msg.replaceChildren(newMsg);
}

function UpdateScore() {
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
}

// Cleans necessary elements for a new game
function NewGame() {
    NewRound();

    playerSelection.className = DEFAULT_CLASSES;
    computerSelection.className = DEFAULT_CLASSES;

    pScore = 0;
    cScore = 0;

    UpdateScore();
}

// Cleans necessary elements for a new round
function NewRound() {
    if(msg.classList.contains('error')) msg.classList.remove('error');

    rock.className = ROCK_CLASSES;
    paper.className = PAPER_CLASSES;
    scissors.className = SCISSORS_CLASSES;
}

function DisplayError(err) {
    let errorMsg = document.createElement('p');
    errorMsg.textContent = "ERROR - " + err;
    errorMsg.classList.add('error');

    msg.replaceChildren(errorMsg);
}