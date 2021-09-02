// DOM
const dom_Game = document.getElementById("game");

// Vars
const bombs = 16;
let gridSize;

let cellClicked = [];
let cellBombs = [];


// Functions
const clickEvent = (dom_Div) => {
    dom_Div.addEventListener("click", (e) => {
        let id = e.target.getAttribute("id");
        console.log(id);
        if (!cellClicked.includes(id)) {
            alert(id);
            cellClicked.push(id);
            dom_Div.classList.add("good");
        }
    })
}

const drawGrid = (colSize) => {
    gridSize = colSize * colSize;
    let dom_Grid = document.createElement("ul");
    dom_Game.appendChild(dom_Grid);
    for (let i = 1; i <= gridSize; i++) {
        let dom_Cell = document.createElement("li");
        let dom_Div = document.createElement("div");
        dom_Div.setAttribute("id", i);
        // dom_Div.innerHTML = i;
        dom_Cell.appendChild(dom_Div);
        dom_Grid.appendChild(dom_Cell);

        // Style 
        dom_Cell.style.width = "calc(100% / " + colSize + ")";

        // Click Event
        clickEvent(dom_Div);
    }
}

const setBombs = () => {
    let currentBomb = 1;
    while (currentBomb <= bombs) {
        let positionBomb = Math.floor(Math.random() * gridSize) + 1;
        if (!cellBombs.includes(positionBomb)) {
            cellBombs.push(positionBomb);
            currentBomb++;
        }
    }
    console.log(cellBombs);
    for (let i = 1; i <= cellBombs.length; i++) {
        let bombCel = document.getElementById(i);
        if (cellBombs.includes(i)) bombCel.classList.add("bomb");
    }
}

const createGrid = (level) => {
    let colSize = 10;
    if (level > 1) colSize -= 2;
    if (level > 2) colSize -= 3;

    // alert("colSize: " + gridSize)
    drawGrid(colSize);
    setBombs();
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