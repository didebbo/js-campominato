// DOM
const dom_Game = document.getElementById("game");

// Vars
const bombs = 16;
let colSize = 10;
let gridSize;
let gameOver = false

let cellClicked = [];
let cellBombs = [];

// Functions

const checkBombsAround = (id) => {
    let counter = 0;
    let log = "Cell: " + id;
    // Up
    log += "\nUp: " + (id - colSize);
    if (cellBombs.includes(id - colSize)) counter++;
    // Down
    log += "\nDown: " + (id + colSize);
    if (cellBombs.includes(id + colSize)) counter++;
    // Left
    log += "\nLeft: " + (id - 1);
    if (cellBombs.includes(id - 1)) counter++;
    // Right
    log += "\nRight: " + (id + 1);
    if (cellBombs.includes(id + 1)) counter++;

    log += "\nBombs around: " + counter;

    document.getElementById(id).innerHTML = counter;

    // alert(log);

}

const clickEvent = (dom_Div) => {
    dom_Div.addEventListener("click", (e) => {
        let id = parseInt(e.target.getAttribute("id"));
        let countBombs = 0;
        if (gameOver) return;
        if (!cellClicked.includes(id)) {
            // alert("Cella: " + id + " Bomb: " + cellBombs.includes(id));
            cellClicked.push(id);
            if (!cellBombs.includes(id)) {
                dom_Div.classList.add("good");

                // Check Bombs Around
                countBombs += checkBombsAround(id);
            }
            else {
                dom_Div.classList.add("bomb");
                // alert("gameover");
                gameOver = true;
            }
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
}

const createGrid = (level) => {
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