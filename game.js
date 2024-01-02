$(()=>{

//Arrays    
const COLOUR_DATABASE = ["red","orange","yellow","green","blue","purple","pink","brown","aqua"];
let computerColourChoice = new Array (4);
let usersColorsRow = [];
//Variables
let totalBoardAndPegCells= 4*7; //4 color multipled 7 rows/possible in future inplementation to change rows with a var according to level difficulties
let currentBoardIndex=0;
let isItARow=false;
let rowNumber=0;
let correctColors = 0;
let gameOver=false;
//Statistics variables
let totalGames=0;
let totalWins=0;
let totalLosses=0;

//Convert RGB colors object
const colorTranslator = {
    "rgb(255, 255, 255)": "white",
    "rgb(255, 0, 0)": "red",
    "rgb(255, 165, 0)": "orange",
    "rgb(255, 255, 0)": "yellow",
    "rgb(0, 128, 0)": "green",
    "rgb(0, 0, 255)": "blue",
    "rgb(128, 0, 128)": "purple",
    "rgb(255, 192, 203)": "pink",
    "rgb(165, 42, 42)": "brown",
    "rgb(0, 255, 255)": "aqua"
}

//Create boards cells-
for(let i=0; i<totalBoardAndPegCells; i++) {
    let cell = "<div class=\"board-cell\" id=board"+i+" data-revealed=\"false\"></div>";
    $(".board").append(cell);
}
for(let i=0; i<totalBoardAndPegCells; i++) {
    let cell = "<div class=\"peg-cell\" id=peg"+i+"></div>";
    $(".pegs").append(cell);
}

//FUNCTIONS
//assigning colors to secret combination so that user can visualize them
const showSecretCode = () => {
    for (let i=0; i<4; i++) {
        $(".secret-color"+i).attr("data-color", computerColourChoice[i]);
        $(".secret-color"+i).css("background-color", computerColourChoice[i]);
    }
}
const hideSecretCode = () => {
    for (let i=0; i<4; i++) {
        $(".secret-color"+i).attr("data-color", "black");
        $(".secret-color"+i).css("background-color", "black");
    }
}

//Update statistics
const statisticsUpdates = () => {
    $(".stat.games").text("Games: "+ totalGames);
    $(".stat.wins").text("Wins: "+ totalWins);
    $(".stat.losses").text("Losses: "+ totalLosses);
}

//calculates which row is
const rowNumberCalculator = () => {
    if ($("#board27").attr("data-revealed")==="true") {
        return rowNumber=7, isItARow=true;

    } else if ($("#board23").attr("data-revealed")==="true") {
        return rowNumber=6, isItARow=true;

    } else if ($("#board19").attr("data-revealed")==="true") {
        return rowNumber=5, isItARow=true;

    } else if ($("#board15").attr("data-revealed")==="true") {
        return rowNumber=4, isItARow=true;

    } else if ($("#board11").attr("data-revealed")==="true") {
        return rowNumber=3, isItARow=true;

    } else  if ($("#board7").attr("data-revealed")==="true") {
        return rowNumber=2, isItARow=true;

    } else if ($("#board3").attr("data-revealed")==="true") {
        return rowNumber=1, isItARow=true;
    }
}

// check Win or Loss
const checkWinOrLoss = () => {

    //Victory
    if (correctColors === 4) {
        
        $("h1").text("You won!");
        $("h3").text("Win-press new game or refresh stat");
        $(".box").off();
        showSecretCode();
        gameOver=true;
        totalWins++;
    
    //Loss
    } else if (currentBoardIndex === totalBoardAndPegCells) {
            
            $("h3").text("Sorry you lost");
            showSecretCode();
            gameOver=true;
            totalLosses++;
    //Neither win or loss- the game continu e
    } else {
        
        game();
    }

}


const startNewGame = () => {

    totalGames++;
    statisticsUpdates();

    // Reset the game var+block all clicliking funct
    gameOver = false;
    $(".box").off(); 
    $(".new-game").off(); 
    $(".box").on("click", game);
    $(".new-game").on("click", startNewGame);
    currentBoardIndex = 0;
    correctColors = 0;
    isItARow = false;
    rowNumber=0;
    usersColorsRow = [];
    computerColourChoice = [];
   
    //Computer colour array generator
    for (let i = 0; i < 4; i++) {
        let randomColourIndex = Math.floor(Math.random() * COLOUR_DATABASE.length);
        computerColourChoice.push(COLOUR_DATABASE[randomColourIndex]);
    }
    console.log("the secret code is " + computerColourChoice.join(" "));
    $(".board-cell").css("background-color", "").css("border", "3px solid black").attr("data-revealed", "false");
    $(".peg-cell").css("background-color", "");
    $("h1").text("Mastermind");
    $("h3").text("");
    hideSecretCode();
    game();
}
const pegCellMarker = (rowNumber) => {
        const boardColors = [];
        const sevenRowsOfComputerColorChoiceArraY= [
            ...computerColourChoice, 
            ...computerColourChoice, 
            ...computerColourChoice,
            ...computerColourChoice, 
            ...computerColourChoice, 
            ...computerColourChoice,
            ...computerColourChoice
        ]
    
        for (let i = 0; i < rowNumber*4; i++) {
            const currentBoardId = "#board" + i;
            const boardCellColor = colorTranslator[$(currentBoardId).css("background-color")];
            boardColors.push(boardCellColor);
        }
        
        for (let i = 0; i < rowNumber*4; i++) {
            let currentPegId = "#peg" + i;
            if (boardColors[i]===sevenRowsOfComputerColorChoiceArraY[i]) {
                
                $(currentPegId).css("background-color", "springgreen");
            } else if (sevenRowsOfComputerColorChoiceArraY.includes(boardColors[i])) {
                $(currentPegId).css("background-color", "grey");
            }
        }
    
}
//Main game functions
const game = () => {
    
    let currentBoardId = "#board" + currentBoardIndex;//inizia da 0

    // Add styling to the current board cell
    $(currentBoardId).css("border", "5px solid black");

    // Handle click event for color assignment
    $(".box").on("click", event => {

        if (gameOver) {
            return; 
        }

    let revealed= $(currentBoardId).attr("data-revealed");
            
    if (revealed==="true" ) {
            return;
    }

    //get attribute data color from the click and put same color as background color- convert data-revealed from false to true
    let color = $(event.target).attr("data-color");
    $(currentBoardId).css("background-color", color);
    $(currentBoardId).attr("data-revealed", "true");

    //checking if it is a full 4 color row  
    rowNumberCalculator();
    pegCellMarker(rowNumber);
    
    if (isItARow) {
        correctColors = 0;
        correctButWrongPositionColors=0;
        notCorrectColors=0;

        // Get the RGB value from the user's guess and convert them
        for (let i = 0; i < 4; i++) {
            let userColorRGB = $(`#board${currentBoardIndex - 3 + i}`).css("background-color");
            let userColorName = colorTranslator[userColorRGB];
            usersColorsRow.push(userColorName);

            if (usersColorsRow[i] === computerColourChoice[i]) {
                correctColors++;
               
                } else if (computerColourChoice.includes(usersColorsRow[i])) {
                    correctButWrongPositionColors++;
        
                } 
        }
        // Reset the user's colors row and put isItArow back to default value.
        isItARow=false;
        usersColorsRow = [];  
             
    }
     
    // Move to the next board cell
    currentBoardIndex++;
    
    checkWinOrLoss();
    
    })//end of $(".box").on("click")

}//end of function game ();
    



$(".new-game").click(()=> {
    gameOver =false;
    startNewGame();
})

$(".refresh-session").click(()=> {
    //reset all statistics
    totalGames=0;
    totalWins=0;
    totalLosses=0;
    gameOver =false;
    startNewGame();
})

$(".instructions").click(() => {
    $("h3").html("Guess the 4 colors the computer has chosen.<br>Same color might be chosen multiple times by the PC<br>Green peg means correct color in correct place.<br>Grey peg correct color but in the wrong place.")
})

})//end of Jquery function
