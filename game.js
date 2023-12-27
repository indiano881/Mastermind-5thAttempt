$(()=>{


//arrays    
const COLOUR_DATABASE = ["red","orange","yellow","green","blue","purple","pink","brown","aqua"];
let copy_COLOUR_DATABASE = Array.from(COLOUR_DATABASE);
let computerColourChoice = new Array (4);
let removeColourIndex;


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
//create boards cells-possible in future to change 28 in a var according to level difficulties
    for(let i=0; i<28; i++) {
        let cell = "<div class=\"board-cell\" id=board"+i+" data-isValid=\"false\"></div>";
        $(".board").append(cell);
    }
    for(let i=0; i<28; i++) {
        let cell = "<div class=\"peg-cell\" id=peg"+i+"></div>";
        $(".pegs").append(cell);
    }
    const colorCellAssign = (board) => {
        $(".box").click(event => {
            let color= $(event.target).attr("data-color");
            $(board).css("background-color", color);
        })
        


        /*
 $(".color").click(function() {
        let color= $(this).attr("id");
        currentColor= color;
        $(".currentColor").css("background-color", color);

    })
        */
    }
    for(let i=0; i<28; i++) {
       colorCellAssign("#board"+i)
    }





    for(let i=0; i<28; i++) {
        //prima situazione e vittoria
        //seconda situazione :perso perche finite opportunita
        //terzo caso- ne vittoria ne perso- gioco vero e proprio
    }













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