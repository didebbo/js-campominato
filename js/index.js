// DOM
const dom_Game = document.getElementById("grid");
const dom_timer = document.getElementById("timer");
const punteggio = document.getElementById("punteggio");
const btnRefresh = document.getElementById("refresh");

// Parametri
const bombs = 16;
const timeout = 0;
let score = 0;
let colSize = 10;
let gridSize = colSize * colSize;
let gameOver = false;
let cellClicked = [];
let cellBombs = [];

// Functions

const clickCellsAround = (rowIndex, cellIndex) => {
    let log_rowIndex = rowIndex + 1;
    let log_cellIndex = cellIndex + 1;
    let min = 0;
    let max = colSize - 1;

    let log = "[Target] rowIndex: " + log_rowIndex + " cellIndex: " + log_cellIndex;

    // Up
    if (rowIndex > min) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + cellIndex + "']").click();

    // UpLeft
    if (rowIndex > min && cellIndex > min) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").click();

    // UpRight
    if (rowIndex > min && cellIndex < max) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").click();

    // Down
    if (rowIndex < max) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + cellIndex + "']").click();

    // DownLeft
    if (rowIndex < max && cellIndex > min) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").click();

    // DownRight
    if (rowIndex < max && cellIndex < max) document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").click();

    // Left
    if (cellIndex > min) document.querySelector("ul").querySelector("li[data-y='" + rowIndex + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").click();

    // Right
    if (cellIndex < max) document.querySelector("ul").querySelector("li[data-y='" + rowIndex + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").click();

}

const checkBombsAround = (dom_Tr, dom_Td) => {
    let counter = 0;
    let rowIndex = parseInt(dom_Tr.dataset.y);
    let log_rowIndex = rowIndex + 1;
    let cellIndex = parseInt(dom_Td.dataset.x);
    let log_cellIndex = cellIndex + 1;
    let min = 0;
    let max = colSize - 1;

    let log = "[Target] rowIndex: " + log_rowIndex + " cellIndex: " + log_cellIndex;

    // Up
    if (rowIndex > min) {
        log += "\n[Up] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + cellIndex + "']").dataset.bomb)) counter++;
    }

    // UpLeft
    if (rowIndex > min && cellIndex > min) {
        log += "\n[UpLeft] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").dataset.bomb)) counter++;
    }

    //UpRight
    if (rowIndex > min && cellIndex < max) {
        log += "\n[UpRight] rowIndex: " + (log_rowIndex - 1) + " cellIndex: " + (log_cellIndex + 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex - 1) + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").dataset.bomb)) counter++;
    }

    // Down
    if (rowIndex < max) {
        log += "\n[Down] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + cellIndex + "']").dataset.bomb)) counter++;
    }

    // DownLeft
    if (rowIndex < max && cellIndex > min) {
        log += "\n[DownLeft] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").dataset.bomb)) counter++;
    }

    // DownRight
    if (rowIndex < max && cellIndex < max) {
        log += "\n[DownRight] rowIndex: " + (log_rowIndex + 1) + " cellIndex: " + (log_cellIndex + 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + (rowIndex + 1) + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").dataset.bomb)) counter++;
    }

    // Left
    if (cellIndex > min) {
        log += "\n[Left] rowIndex: " + (log_rowIndex) + " cellIndex: " + (log_cellIndex - 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + rowIndex + "']").querySelector("div[data-x='" + (cellIndex - 1) + "']").dataset.bomb)) counter++;
    }

    // Right
    if (cellIndex < max) {
        log += "\n[Right] rowIndex: " + (rowIndex) + " cellIndex: " + (cellIndex + 1);
        if (parseInt(document.querySelector("ul").querySelector("li[data-y='" + rowIndex + "']").querySelector("div[data-x='" + (cellIndex + 1) + "']").dataset.bomb)) counter++;
    }

    log += "\nBombs around: " + counter;

    if (counter != 0) {
        dom_Td.innerHTML = counter;
        if (counter > 0) dom_Td.style.color = "green";
        if (counter > 1) dom_Td.style.color = "blue";
        if (counter > 2) dom_Td.style.color = "red";
    }
    else setTimeout(() => {
        dom_Td.innerHTML = "";
        clickCellsAround(rowIndex, cellIndex);
    }, timeout);

    // console.log(log);

}

const discoverBombs = () => {
    for (let y = 0; y < colSize; y++) {
        for (let x = 0; x < colSize; x++) {
            let el = document.querySelector("ul").querySelector("li[data-y='" + y + "']").querySelector("div[data-x='" + x + "']")
            if (parseInt(el.dataset.bomb)) {
                el.innerHTML = "";
                el.classList.add("boom");
            }
            // console.log(y, x, el);
        }
    }
}

const isClicked = (dom_Tr, dom_Td) => {
    if (dom_Td.classList.length > 0) return true;
    cellClicked.push([dom_Tr.dataset.y, dom_Td.dataset.x]);
    return false;
}

const refreshScore = (score) => {
    if (score <= 9) punteggio.innerHTML = "00" + score;
    else if (score <= 99) punteggio.innerHTML = "0" + score;
}

const wheelEvent = (dom_Tr, dom_Td) => {
    dom_Td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (isClicked(dom_Tr, dom_Td) || gameOver) return;
        if (dom_Td.innerHTML == "") dom_Td.innerHTML = "<i class=\"fas fa-flag\"></i>";
        else dom_Td.innerHTML = "";
    });
}

const clickEvent = (dom_Tr, dom_Td) => {
    dom_Td.addEventListener("click", () => {
        if (isClicked(dom_Tr, dom_Td) || gameOver) return;
        if (!parseInt(dom_Td.dataset.bomb)) {
            dom_Td.classList.add("good");
            score++;
            // console.log(score);
            refreshScore(score);
            checkBombsAround(dom_Tr, dom_Td);
            if ((cellClicked.length + cellBombs.length) >= gridSize) {
                gameOver = true;
                let log = "Hai vinto!";
                log += "\nPunteggio: " + score;
                discoverBombs();
                setTimeout(() => {
                    alert(log);
                    // location.reload();
                }, 100);
            }
        }
        else {
            dom_Td.classList.add("boom");
            gameOver = true;
            let log = "Hai perso!";
            log += "\nPunteggio: " + score;
            discoverBombs();
            setTimeout(() => {
                alert(log);
                // location.reload();
            }, 100);
        }
    })
}

const genGrid = () => {
    let dom_Table = document.createElement("ul");
    let dom_Tr;
    let dom_Td;
    let counter = 1;
    dom_Game.appendChild(dom_Table);
    for (let y = 0; y < colSize; y++) {
        dom_Tr = document.createElement("li");
        dom_Tr.dataset.y = y;
        dom_Tr.style.height = "calc(100% / " + colSize + ")";
        // console.log(dom_Tr);
        for (let x = 0; x < colSize; x++) {
            dom_Td = document.createElement("div");
            dom_Td.dataset.x = x;
            dom_Td.style.width = "calc(100% / " + colSize + ")";
            if (cellBombs.includes(counter)) dom_Td.dataset.bomb = 1;
            else dom_Td.dataset.bomb = 0;
            // console.log(dom_Td);
            dom_Tr.appendChild(dom_Td);
            clickEvent(dom_Tr, dom_Td);
            wheelEvent(dom_Tr, dom_Td);
            counter++;
        }
        dom_Table.appendChild(dom_Tr);
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

btnRefresh.addEventListener("click", () => {
    location.reload();
});

const runTimer = (currentTime) => {
    const timer = setInterval(() => {
        if (currentTime <= 9) dom_timer.innerHTML = "00" + currentTime;
        else if (currentTime <= 99) dom_timer.innerHTML = "0" + currentTime;
        else dom_timer.innerHTML = currentTime;
        currentTime++;
        if (currentTime > 999) gameOver = true;
        if (gameOver) clearInterval(timer);
    }, 1000);
}

const main = () => {
    let currentTime = 0;
    let level;
    let msg = "Inserisci livello di difficoltà";
    msg += "\nMin: 1 - Max: 3";
    punteggio.innerHTML = "000";
    do level = parseInt(prompt(msg));
    while (isNaN(level) || level < 1 || level > 3);
    createGrid(level);
    runTimer(currentTime);
}


// Main
main();