// DOM
const dom_Game = document.getElementById("game");

// Parametri
const bombs = 16;
let score = 0;
let colSize = 10;
let gridSize = colSize * colSize;
let gameOver = false;
let cellClicked = [];
let cellBombs = [];

// Functions

const clickCellsAround = (dom_Td) => {
    let rowIndex = parseInt(dom_Td.parentNode.rowIndex);
    let log_rowIndex = rowIndex + 1;
    let cellIndex = parseInt(dom_Td.cellIndex);
    let log_cellIndex = cellIndex + 1;
    let min = 0;
    let max = colSize - 1;

    let log = "[Target] rowIndex: " + log_rowIndex + " cellIndex: " + log_cellIndex;

    // Up
    if (rowIndex > min) document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex].click();

    // UpLeft
    if (rowIndex > min && cellIndex > min) document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex - 1].click();

    // UpRight
    if (rowIndex > min && cellIndex < max) document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex + 1].click();

    // Down
    if (rowIndex < max) document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex].click();

    // DownLeft
    if (rowIndex < max && cellIndex > min) document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex - 1].click();

    // DownRight
    if (rowIndex < max && cellIndex < max) document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex + 1].click();

    // Left
    if (cellIndex > min) document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex - 1].click();

    // Right
    if (cellIndex < max) document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex + 1].click();

}

const checkBombsAround = (dom_Td) => {
    let counter = 0;
    let rowIndex = parseInt(dom_Td.parentNode.rowIndex);
    let log_rowIndex = rowIndex + 1;
    let cellIndex = parseInt(dom_Td.cellIndex);
    let log_cellIndex = cellIndex + 1;
    let min = 0;
    let max = colSize - 1;

    let log = "[Target] rowIndex: " + log_rowIndex + " cellIndex: " + log_cellIndex;

    // Up
    if (rowIndex > min) {
        log += "\n[Up] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex].dataset.bomb)) counter++;
    }
    // UpLeft
    if (rowIndex > min && cellIndex > min) {
        log += "\n[UpLeft] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex - 1].dataset.bomb)) counter++;
    }

    //UpRight
    if (rowIndex > min && cellIndex < max) {
        log += "\n[UpRight] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex + 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex - 1].children[cellIndex + 1].dataset.bomb)) counter++;
    }

    // Down
    if (rowIndex < max) {
        log += "\n[Down] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex].dataset.bomb)) counter++;
    }

    // DownLeft
    if (rowIndex < max && cellIndex > min) {
        log += "\n[DownLeft] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex - 1].dataset.bomb)) counter++;
    }

    // DownRight
    if (rowIndex < max && cellIndex < max) {
        log += "\n[DownRight] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex + 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex + 1].children[cellIndex + 1].dataset.bomb)) counter++;
    }

    // Left
    if (cellIndex > min) {
        log += "\n[Left] rowIndex: " + (log_rowIndex) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex - 1].dataset.bomb)) counter++;
    }

    // Right
    if (cellIndex < max) {
        log += "\n[Right] rowIndex: " + (rowIndex) + " cellIndex: " + (cellIndex + 1);
        if (parseInt(document.getElementsByTagName("table")[0].children[rowIndex].children[cellIndex + 1].dataset.bomb)) counter++;
    }

    log += "\nBombs around: " + counter;

    if (counter == 0) clickCellsAround(dom_Td);
    else dom_Td.innerHTML = counter;

    // console.log(log);

}

const discoverBombs = () => {
    console.log(document.getElementsByTagName("table")[0]);
    for (let y = 0; y < colSize; y++) {
        for (let x = 0; x < colSize; x++) {
            let el = document.getElementsByTagName("table")[0].children[y].children[x];
            if (parseInt(el.dataset.bomb)) el.classList.add("boom");
            // console.log(y, x, el);
        }
    }
}

const isClicked = (dom_Td) => {
    let rowIndex = parseInt(dom_Td.parentNode.rowIndex + 1);
    let cellIndex = parseInt(dom_Td.cellIndex + 1);
    for (let i = 0; i < cellClicked.length; i++) {
        let el = cellClicked[i];
        if (el[0] == rowIndex && el[1] == cellIndex) return true;
    }
    cellClicked.push([rowIndex, cellIndex]);
    return false;
}

const clickEvent = (dom_Td) => {
    dom_Td.addEventListener("click", () => {
        if (gameOver) return;
        if (!isClicked(dom_Td)) {
            if (!parseInt(dom_Td.dataset.bomb)) {
                dom_Td.classList.add("good");
                score++;
                checkBombsAround(dom_Td);
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
                dom_Td.classList.add("boom");
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
}

const genBombs = () => {
    gridSize = colSize * colSize;
    let currentBomb = 1;
    while (currentBomb <= bombs) {
        let positionBomb = Math.floor(Math.random() * gridSize) + 1;
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