$(()=>{

//arrays    
const COLOUR_DATABASE = ["red","orange","yellow","green","blue","purple","pink","brown","aqua"];
let copy_COLOUR_DATABASE = Array.from(COLOUR_DATABASE);
let computerColourChoice = new Array (4);
let usersColorsRow = [];
let totalBoardAndPegCells= 4*7; //4 color multipled 7 rows/possible in future to change rows with a var according to level difficulties
let currentBoardIndex=0;
let isItARow=false;
let rowNumber;
let correctColors = 0;
let correctButWrongPositionColors=0;
let notCorrectColors=0;
let gameOver=false;

//Statistics variables
let totalGames=0;
let totalWins=0;
let totalLosses=0;
//convert colors
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


//create boards cells-
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
        $(".secret-color"+i).css("background-color",computerColourChoice[i]);
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
        $("h3").text("Win-press new game or continue session");
        $(".box").off();
        showSecretCode();
        gameOver=true;
        totalWins++;

    } else if (currentBoardIndex ===totalBoardAndPegCells) {
            
            $("h3").text("Sorry you lost");
            showSecretCode();
            gameOver=true;
            totalLosses++;

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
    correctButWrongPositionColors = 0;
    isItARow = false;
    usersColorsRow = [];
    computerColourChoice = [];
   
    //Computer colour array generator
    for (let i = 0; i < 4; i++) {
        let removeColourIndex = Math.floor(Math.random() * copy_COLOUR_DATABASE.length);
        computerColourChoice[i] = copy_COLOUR_DATABASE.splice(removeColourIndex, 1)[0];
    }
    console.log("the secret code is " + computerColourChoice.join(" "));
    $(".board-cell").css("background-color", "").css("border", "3px solid black").attr("data-revealed", "false");
    $(".peg-cell").css("background-color", "");
    $("h1").text("Mastermind");
    $("h3").text("");
    hideSecretCode();
    game();
}
const pegCellMarker = () => {
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
    
        for (let i = 0; i < totalBoardAndPegCells; i++) {
            const currentBoardId = "#board" + i;
            const boardCellColor = colorTranslator[$(currentBoardId).css("background-color")];
            boardColors.push(boardCellColor);
        }
        console.log(boardColors)
        console.log(sevenRowsOfComputerColorChoiceArraY);
        for (let i = 0; i < totalBoardAndPegCells; i++) {
            if (boardColors[i]===sevenRowsOfComputerColorChoiceArraY[i]) {
                let currentPegId = "#peg" + i;
                $(currentPegId).css("background-color", "springgreen");
            }
        }
        return boardColors;
    
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
    
    console.log("row?"+rowNumber)
    if (isItARow) {
        correctColors = 0;
        correctButWrongPositionColors=0;
        notCorrectColors=0;

        // Get the RGB value from the user's guess and convert them
        for (let i = 0; i < 4; i++) {
            let userColorRGB = $(`#board${currentBoardIndex - 3 + i}`).css("background-color");
            let userColorName = colorTranslator[userColorRGB];
            usersColorsRow.push(userColorName);
            
//************//sviluppare da qui 
            if (usersColorsRow[i] === computerColourChoice[i]) {
                        
                correctColors++;
               
                } else if (computerColourChoice.includes(usersColorsRow[i])) {
                    correctButWrongPositionColors++;
                   
                } else {
                    notCorrectColors++;
                }
        }
        // Reset the user's colors row and put isItArow back to default menu.
        isItARow=false;
        usersColorsRow = [];      
    }
    pegCellMarker();  
    // Move to the next board cell
    currentBoardIndex++;
    
    checkWinOrLoss();

    })//end of $(".box").on("click")
    

}//end of function game ();
    



$(".new-game").click(()=> {
    //reset all statistics
    totalGames=0;
    totalWins=0;
    totalLosses=0;

    gameOver =false;
    startNewGame();
})

$(".continue-session").click(()=> {
    gameOver =false;
    startNewGame();
})

$(".instructions").click(() => {
    $("h3").text("Guess the 4 colours the computer has choosen. \nThe colours choosen by the computer will be ALL different");
})

})//end of Jquery function
