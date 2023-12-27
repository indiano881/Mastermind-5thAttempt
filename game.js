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
//create de cells
    for(let i=0; i<28; i++) {
        let cell = "<div class=\"board-cell\" id=board"+i+"></div>";
        $(".board").append(cell);
    }
    for(let i=0; i<28; i++) {
        let cell = "<div class=\"peg-cell\" id=peg"+i+"></div>";
        $(".pegs").append(cell);
    }


})