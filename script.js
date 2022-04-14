function computerPlay() {
    let pick = Math.floor(Math.random() * 3);

    switch(pick) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            console.log("Error - Computer tried to pick an unavailable option");
    }
}

function playRound(playerInput, computerInput) {
    
}

function getPlayerInput() {

}

function game() {
    console.log("Welcome to the Rock Paper Scissors game!");
    console.log("The game will be best out of 3!\n");

    let playerScore = 0, computerScore = 0;

    const SCORE_LIMIT = 3;

    while(playerScore < SCORE_LIMIT || computerScore < SCORE_LIMIT) {
        let roundResult = playRound(getPlayerInput(), computerPlay());

        switch(roundResult) {
            case "player":
                console.log("Player win! Current score: Player " + ++playerScore + " | Computer " + computerScore);
                break;
            case "computer":
                console.log("Computer win! Current score: Player " + playerScore + " | Computer " + ++computerScore);
                break;
            case "draw":
                console.log("Round draw! Current score: Player " + playerScore + " | Computer " + computerScore);
                break;
            default:
                console.log("Error - unexpected round result");
        }
    }

    if(playerScore === SCORE_LIMIT) {
        console.log("Congratulations, you won!");
    } else if (computerScore === SCORE_LIMIT) {
        console.log("Oops, you lost! Better luck next time!");
    }
}