// DOM
const dom_Game = document.getElementById("game");

// Functions
const drawGrid = (colSize) => {
    let gridSize = colSize * colSize;
    let dom_Grid = document.createElement("ul");
    dom_Game.appendChild(dom_Grid);
    for (let i = 1; i <= gridSize; i++) {
        let dom_Cell = document.createElement("li");
        let dom_Div = document.createElement("div");
        dom_Div.innerHTML = i;
        dom_Cell.appendChild(dom_Div);
        dom_Grid.appendChild(dom_Cell);

        // Style 
        dom_Cell.style.width = "calc(100% / " + colSize + ")";
    }
}

const createGrid = (level) => {
    let colSize = 10;
    if (level > 1) colSize -= 2;
    if (level > 2) colSize -= 3;

    // alert("colSize: " + gridSize)
    drawGrid(colSize);
}

const main = () => {
    let level;
    let msg = "Inserisci livello di difficoltà";
    msg += "\nMin: 1 - Max: 3"
    do level = parseInt(prompt(msg));
    while (isNaN(level) || level < 1 || level > 3);
    createGrid(level);
}

// Main
main();