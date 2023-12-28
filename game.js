$(()=>{


//arrays    
const COLOUR_DATABASE = ["red","orange","yellow","green","blue","purple","pink","brown","aqua"];
let copy_COLOUR_DATABASE = Array.from(COLOUR_DATABASE);
let computerColourChoice = new Array (4);
let usersColorsRow = [];
let removeColourIndex;
let totalBoardAndPegCells= 4*7; //4 color multipled 7 rows/possible in future to change rows with a var according to level difficulties
let currentBoardIndex=0;
let userHasWon=false;
let isItARow=false;
//convert colors
const colorMap = {
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
    removeColourIndex = Math.floor(Math.random() * copy_COLOUR_DATABASE.length);
    computerColourChoice[i] = copy_COLOUR_DATABASE.splice(removeColourIndex, 1)[0];
}
//assigning secret combination to visualization
for (let i=1; i<5; i++){
    $(".secret-color"+i).attr("data-color", computerColourChoice[i-1]);
    $(".secret-color"+i).css("background-color",computerColourChoice[i-1]);//se vinci si visualizzano colori da sistemare dopo

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

    
    const colorCellAssign = () => {

        let currentBoardId = "#board" + currentBoardIndex;

        // Add styling to the current board cell
        $(currentBoardId).css("transform", "scale(1.2)");
        $(currentBoardId).css("border", "5px solid black");

        // Handle click event for color assignment
        $(".box").on("click", event => {

            let revealed= $(currentBoardId).attr("data-revealed");
            
            if (revealed==="true" ) {
                
                return;
            }

            let color = $(event.target).attr("data-color");

            $(currentBoardId).css("background-color", color);

            $(currentBoardId).attr("data-revealed", "true");
            //push 4 colors to arrayrow
            
            


            //checking if it is a full 4 color row
            for (let i=0; i<totalBoardAndPegCells; i++) {
                if ($("#board3").attr("data-revealed")==="true"||
                $("#board7").attr("data-revealed")==="true"||
                $("#board11").attr("data-revealed")==="true"||
                $("#board15").attr("data-revealed")==="true"||
                $("#board19").attr("data-revealed")==="true"||
                $("#board23").attr("data-revealed")==="true"||
                $("#board27").attr("data-revealed")==="true") {
                    isItARow=true;
                }
            }
            //caso che la row e´ completa
            if (isItARow) {
                // Check if the user's guess matches the computer's color choice
                let correctColors = 0;

                for (let i = 0; i < 4; i++) {
                // Get the RGB value from the user's guess
                    let userColorRGB = $(`#board${currentBoardIndex - 4 + i}`).css("background-color");

                    // Convert the RGB value to a color name
                    let userColorName = colorMap[userColorRGB];
                    usersColorsRow.push(userColorName);
                    console.log(usersColorsRow)
                    if (userColorName === computerColourChoice[i]) {
                    correctColors++;
                    }
                }
            
                // Handle the result based on the number of correct colors
                if (correctColors === 4) {
                    // All colors are correct - user wins
                    console.log("Congratulations! You guessed the correct combination!");
                    userHasWon = true;
                } else {
                    // Provide feedback or take appropriate actions
                    console.log(`You have ${correctColors} correct color(s). Keep trying!`);
                }
            
                // Reset the user's colors row
                usersColorsRow = [];
            
                // Reset the revealed status of the cells in the current row
                for (let i = currentBoardIndex - 4; i < currentBoardIndex; i++) {
                    $(`#board${i}`).attr("data-revealed", "false");
                }
            
                // Reset the current board index
                currentBoardIndex -= 4;
                isItARow = false;
            
                // Check for the game-winning condition
                if (userHasWon) {
                    // Handle the game-winning scenario
                    console.log("Game over. You win!");
                } else {
                    // Move to the next row
                    console.log("Move to the next row");
                }
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
                colorCellAssign();
                //checkFourColourRow();
            }

            
        })


        
    }
    
/*
    const checkFourColourRow = () => {
        if ($("#board0").attr("data-revealed")==="true"&&
        $("#board1").attr("data-revealed")==="true"&&
        $("#board2").attr("data-revealed")==="true"&&
        $("#board3").attr("data-revealed")==="true" ||
        $("#board4").attr("data-revealed")==="true"&&
        $("#board5").attr("data-revealed")==="true"&&
        $("#board6").attr("data-revealed")==="true"&&
        $("#board7").attr("data-revealed")==="true"||
        $("#board8").attr("data-revealed")==="true"&&
        $("#board9").attr("data-revealed")==="true"&&
        $("#board10").attr("data-revealed")==="true"&&
        $("#board11").attr("data-revealed")==="true"||
        $("#board12").attr("data-revealed")==="true"&&
        $("#board13").attr("data-revealed")==="true"&&
        $("#board14").attr("data-revealed")==="true"&&
        $("#board15").attr("data-revealed")==="true"||
        $("#board16").attr("data-revealed")==="true"&&
        $("#board17").attr("data-revealed")==="true"&&
        $("#board18").attr("data-revealed")==="true"&&
        $("#board19").attr("data-revealed")==="true"||
        $("#board20").attr("data-revealed")==="true"&&
        $("#board21").attr("data-revealed")==="true"&&
        $("#board22").attr("data-revealed")==="true"&&
        $("#board23").attr("data-revealed")==="true" ||
        $("#board24").attr("data-revealed")==="true"&&
        $("#board25").attr("data-revealed")==="true"&&
        $("#board26").attr("data-revealed")==="true"&&
        $("#board27").attr("data-revealed")==="true") {
            console.log("it is a row");
        } else {
            console.log("it is not a row");
        }
        
        
    }
    */
    
    
    
  






    






    $(".start-game").click(()=>colorCellAssign());
    $(".instructions").click(() => {
        $("h4").text("Guess the 4 colours the computer has choosen. \nThe colours choosen by the computer will be ALL different");
    })


})

/*
COME PROSEGUIRE:
sviluppare gioco, la casella deve essere zoomata. 
quandoc clicchi il colore si assegna e si sposta alla casella dopo.
ogni 4 cé il check(fare dopo per ultimo)






DA RIFINIRE ALLA FINE
inserire timer?
inserire statistiche
sistemare bottoni
sistemare pc e tablet
*/