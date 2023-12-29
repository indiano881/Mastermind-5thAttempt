$(()=>{


//arrays    
const COLOUR_DATABASE = ["red","orange","yellow","green","blue","purple","pink","brown","aqua"];
let copy_COLOUR_DATABASE = Array.from(COLOUR_DATABASE);
let computerColourChoice = new Array (4);
let usersColorsRow = [];
let totalBoardAndPegCells= 4*7; //4 color multipled 7 rows/possible in future to change rows with a var according to level difficulties
let currentBoardIndex=0;
let userHasWon=false;
let isItARow=false;
let rowNumber;
let correctColors = 0;
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
};

//Computer colour array generator
for (let i = 0; i < computerColourChoice.length; i++) {
    let removeColourIndex = Math.floor(Math.random() * copy_COLOUR_DATABASE.length);
    computerColourChoice[i] = copy_COLOUR_DATABASE.splice(removeColourIndex, 1)[0];
}
console.log("the secret code is " +computerColourChoice.join(" "))

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
//checking if it is a full 4 color row
const isFullRow = () => {
    
    for (let i=0; i<totalBoardAndPegCells; i++) {
        if ($("#board3").attr("data-revealed")==="true"||
        $("#board7").attr("data-revealed")==="true"||
        $("#board11").attr("data-revealed")==="true"||
        $("#board15").attr("data-revealed")==="true"||
        $("#board19").attr("data-revealed")==="true"||
        $("#board23").attr("data-revealed")==="true"||
        $("#board27").attr("data-revealed")==="true") {
           return isItARow=true;
        }
    }
}
//calculates which row is
const rowNumberCalculator = () => {
    if ($("#board27").attr("data-revealed")==="true") {
        return rowNumber=7;

    } else if ($("#board23").attr("data-revealed")==="true") {
        return rowNumber=6;

    } else if ($("#board19").attr("data-revealed")==="true") {
        return rowNumber=5;

    } else if ($("#board15").attr("data-revealed")==="true") {
        return rowNumber=4;

    } else if ($("#board11").attr("data-revealed")==="true") {
        return rowNumber=3;

    } else  if ($("#board7").attr("data-revealed")==="true") {
        return rowNumber=2;

    } else if ($("#board3").attr("data-revealed")==="true") {
        return rowNumber=1;
    }
}

// check Win or Loss
 const checkWinOrLoss = () => {
    // Handle the result based on the number of correct colors
    if (correctColors === 4) {
        console.log("Congratulations! You guessed the correct combination!");
        userHasWon = true;
        //assigning secret combination to visualization
        for (let i=1; i<5; i++){
            $(".secret-color"+i).attr("data-color", computerColourChoice[i-1]);
            $(".secret-color"+i).css("background-color",computerColourChoice[i-1]);//se vinci si visualizzano colori da sistemare dopo+muoivere tutto for loop???
}
        
    } else {
        // Provide feedback or take appropriate actions
        console.log(`You have ${correctColors} correct color(s). Keep trying!`);
    }

 }




//Main game functions
const game = () => {

    let currentBoardId = "#board" + currentBoardIndex;//inizia da 0

    // Add styling to the current board cell
    $(currentBoardId).css("transform", "scale(1.2)");
    $(currentBoardId).css("border", "5px solid black");

    // Handle click event for color assignment
    $(".box").on("click", event => {

    let revealed= $(currentBoardId).attr("data-revealed");
            
    if (revealed==="true" ) {
                
            return;
    }
    //get attribute data color from the click and put same color as background color- convert data-revealed from false to true
    let color = $(event.target).attr("data-color");
    $(currentBoardId).css("background-color", color);
    $(currentBoardId).attr("data-revealed", "true");

    //checking if it is a full 4 color row
    isFullRow();   
    rowNumberCalculator();
    console.log("row number is "+rowNumber);
//********** *//FINO A QUI FUNZIONA BENE-CONTINUARE A DIVIDERE PER FUNZIONI
    //caso che la row e´ completa
    if (isItARow) {
        // Check if the user's guess matches the computer's color choice
        correctColors = 0;

        for (let i = 0; i < 4; i++) {
        // Get the RGB value from the user's guess
            let userColorRGB = $(`#board${currentBoardIndex - 3 + i}`).css("background-color");

            // Convert the RGB value to a color name
            let userColorName = colorTranslator[userColorRGB];
            usersColorsRow.push(userColorName);
            console.log(usersColorsRow)

//************//sviluppare da qui
            if (userColorName === computerColourChoice[i]) {
                        
                correctColors++;
                }
        }
            
        checkWinOrLoss();
            
        // Reset the user's colors row
        usersColorsRow = [];
              
    }
            
    // Move to the next board cell
    currentBoardIndex++;

    console.log(currentBoardIndex);

    // Check for game completion 
    if (currentBoardIndex >= totalBoardAndPegCells) {
        // Add logic for reaching the end of the board
        console.log("Sorry you lost");
        } else {
        // Continue the game by calling colorCellAssign 
        game();
        //checkFourColourRow();
        }

    })//end of $(".box").on("click")

}//end of function game ();
    



$(".start-game").click(()=>game());

$(".instructions").click(() => {

    $("h4").text("Guess the 4 colours the computer has choosen. \nThe colours choosen by the computer will be ALL different");

})


})

/*
COME PROSEGUIRE:
Assegnare pegs
sistemare vittoria sconfitta

DA RIFINIRE ALLA FINE
inserire timer?
inserire statistiche
sistemare bottoni
sistemare pc e tablet
*/