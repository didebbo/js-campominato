// DOM
const dom_Game = document.getElementById("game");

// Parametri
const bombs = 1;
let score = 0;
let colSize = 10;
let gridSize = colSize * colSize;
let gameOver = false;
let cellClicked = [];
let cellBombs = [];

// Functions

const checkBombsAround = (id) => {
    let counter = 0;
    let log = "Cell: " + id;
    // Up
    log += "\nUp: " + (id - colSize);
    if (cellBombs.includes(id - colSize)) counter++;
    // UpLeft
    log += "\nUpLeft: " + (id - colSize - 1);
    if (cellBombs.includes(id - colSize - 1)) counter++;
    // UpRight
    log += "\nUpRight: " + (id - colSize + 1);
    if (cellBombs.includes(id - colSize + 1)) counter++;
    // Down
    log += "\nDown: " + (id + colSize);
    if (cellBombs.includes(id + colSize)) counter++;
    // DownLeft
    log += "\nDownLeft: " + (id + colSize - 1);
    if (cellBombs.includes(id + colSize - 1)) counter++;
    // DownRight
    log += "\nDownRight: " + (id + colSize + 1);
    if (cellBombs.includes(id + colSize + 1)) counter++;
    // Left
    log += "\nLeft: " + (id - 1);
    if (cellBombs.includes(id - 1)) counter++;
    // Right
    log += "\nRight: " + (id + 1);
    if (cellBombs.includes(id + 1)) counter++;

    log += "\nBombs around: " + counter;

    // document.getElementById(id).innerHTML = counter;

    // alert(log);

}

const discoverBombs = () => {
    for (let i = 1; i <= gridSize; i++) {
        if (cellBombs.includes(i)) document.getElementById(i).classList.add("bomb");
    }
}

const clickEvent = (dom_Div) => {
    dom_Div.addEventListener("click", (e) => {
        let id = parseInt(e.target.getAttribute("id"));
        let countBombs = 0;
        if (gameOver) return;
        if (!cellClicked.includes(id)) {
            cellClicked.push(id);
            if (!cellBombs.includes(id)) {
                dom_Div.classList.add("good");
                score++;
                checkBombsAround(id);
                if ((cellClicked.length + cellBombs.length) >= gridSize) {
                    gameOver = true;
                    let log = "Hai vinto!";
                    log += "\nPunteggio: " + score;
                    discoverBombs();
                    setTimeout(() => {
                        alert(log);
                    }, 100);
                }

            }
            else {
                dom_Div.classList.add("bomb");
                gameOver = true;
                let log = "Hai perso!";
                log += "\nPunteggio: " + score;
                setTimeout(() => {
                    alert(log);
                }, 100);
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
        let positionBomb = 5 /*Math.floor(Math.random() * gridSize) + 1*/;
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