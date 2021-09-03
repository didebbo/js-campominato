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
let matrix = [];

// Functions

const checkBombsAround = (dom_Td) => {
    let counter = 0;
    let rowIndex = dom_Td.parentNode.rowIndex;
    let cellIndex = dom_Td.cellIndex;

    alert("[Cell] rowIndex: " + (rowIndex + 1) + " cellIndex: " + (cellIndex + 1));

    // console.log(parseInt(dom_Td.dataset.bomb));

    let log = "[Target] rowIndex: " + (rowIndex + 1) + " cellIndex: " + (cellIndex + 1);

    // Up
    // TODO Controlli celle angolari
    log += "\n[Up] rowIndex: " + (rowIndex - 1) + " cellIndex: " + (cellIndex);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex].dataset.bomb)) counter++;

    // UpLeft
    log += "\n[UpLeft] rowIndex: " + (rowIndex - 1) + " cellIndex: " + (cellIndex - 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex - 1].dataset.bomb)) counter++;

    //UpRight
    log += "\n[UpRight] rowIndex: " + (rowIndex - 1) + " cellIndex: " + (cellIndex + 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex + 1].dataset.bomb)) counter++;

    // Down
    log += "\n[Down] rowIndex: " + (rowIndex + 1) + " cellIndex: " + (cellIndex);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex].dataset.bomb)) counter++;

    // DownLeft
    log += "\n[DownLeft] rowIndex: " + (rowIndex + 1) + " cellIndex: " + (cellIndex - 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex - 1].dataset.bomb)) counter++;

    // DownRight
    log += "\n[DownRight] rowIndex: " + (rowIndex + 1) + " cellIndex: " + (cellIndex + 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex + 1].dataset.bomb)) counter++;

    // Left
    log += "\n[Left] rowIndex: " + (rowIndex) + " cellIndex: " + (cellIndex - 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex - 1].dataset.bomb)) counter++;

    // Right
    log += "\n[Right] rowIndex: " + (rowIndex) + " cellIndex: " + (cellIndex + 1);
    if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex + 1].dataset.bomb)) counter++;

    log += "\nBombs around: " + counter;

    dom_Td.innerHTML = counter;

    alert(log);

}

const discoverBombs = () => {
    for (let i = 1; i <= gridSize; i++) {
        if (cellBombs.includes(i)) document.getElementById(i).classList.add("bomb");
    }
}

const clickEvent = (dom_Td) => {
    dom_Td.addEventListener("click", () => {

        console.log("Bomb: " + parseInt(dom_Td.dataset.bomb));

        if (!parseInt(dom_Td.dataset.bomb)) {
            dom_Td.classList.add("good");
            score++;
            checkBombsAround(dom_Td);
        }
        else {
            dom_Td.classList.add("boom");
        }
        return;
        let id = parseInt(e.target);
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
                        location.reload();
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
                    location.reload();
                }, 100);
            }
        }
    })
}

const genMatrix = () => {
    // matrix.length = colSize;
    for (let x = 0; x < colSize; x++) {
        matrix[x] = [];
        for (let y = 0; y < colSize; y++) {
            matrix[x][y] = y;
            for (let z = 0; z < x; z++) {
                // TODO MATRIX
            }
        }
    }
    console.log(matrix);
}

const genGrid = () => {
    let dom_Table = document.createElement("table");
    let dom_Tr;
    let dom_Td;
    let counter = 1;
    dom_Game.appendChild(dom_Table);
    for (let y = 0; y < colSize; y++) {
        dom_Tr = document.createElement("tr");
        for (let x = 0; x < colSize; x++) {
            dom_Td = document.createElement("td");
            if (cellBombs.includes(counter)) dom_Td.dataset.bomb = 1;
            else dom_Td.dataset.bomb = 0;
            clickEvent(dom_Td);
            dom_Tr.appendChild(dom_Td);
            counter++;
        }
        dom_Table.appendChild(dom_Tr);

        // Style 
        dom_Td.style.width = "calc(100% / " + colSize + ")";
        dom_Td.style.height = "calc(100% / " + colSize + ")";
    }

    // console.log(dom_Table.children[1].children);
}

const genBombs = () => {
    gridSize = colSize * colSize;
    let currentBomb = 1;
    while (currentBomb <= bombs) {
        let positionBomb = 5 /*Math.floor(Math.random() * gridSize) + 1*/;
        if (!cellBombs.includes(positionBomb)) {
            cellBombs.push(positionBomb);
            cellBombs.sort(function (a, b) { return a - b });
            currentBomb++;
        }
    }
    console.log(cellBombs);
}

const createGrid = (level) => {
    if (level > 1) colSize -= 2;
    if (level > 2) colSize -= 3;

    // genMatrix();
    genBombs();
    genGrid();
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