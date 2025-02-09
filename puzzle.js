let TILES = [1,2,3,4,5,6,7,8,null];
let TILE_ELEMENTS = null;

function createPuzzle() {
    TILE_ELEMENTS = [];
    const puzzleContainer = document.querySelector('.puzzle-container');
    puzzleContainer.innerHTML = '';
    TILES.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.addEventListener('click', () => moveTile(index));

        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
        }
        puzzleContainer.appendChild(tileElement);
        TILE_ELEMENTS.push(tileElement);
    })
}

function moveTile(index) {
    let [canMove, emptyIndex] = hasValidMove(index, TILES);
    if (canMove) {
        TILES[emptyIndex] = TILES[index];
        TILE_ELEMENTS[emptyIndex].classList.remove('empty');
        TILE_ELEMENTS[emptyIndex].textContent = TILES[emptyIndex];

        TILES[index] = null; 
        TILE_ELEMENTS[index].classList.add('empty');
        TILE_ELEMENTS[index].textContent = '';
    }
}

function hasValidMove(index) {
    let emptyIndex = TILES.indexOf(null);
    const rowDiff = Math.abs(Math.floor(index / 3) - Math.floor(emptyIndex / 3));
    const colDiff = Math.abs((index % 3) - (emptyIndex % 3));

    // A valid move occurs if the tile is adjacent to the empty space
    return [(rowDiff + colDiff === 1), emptyIndex];
}

function shuffle() {
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    do {
        shuffleArray(TILES);
    } while (!isSolvable(TILES));

    createPuzzle();
}

function changeStateTiles(disabled=true) {
    for (const tile of TILE_ELEMENTS) {
        if (disabled) {
            tile.classList.add('disabled')
        } else {
            tile.classList.remove('disabled')
        }
    }
}

async function moveSolve(goal) {
    const moves = solve(TILES, goal);
    for (const m of moves) {
        moveTile(m);
        await new Promise(resolve => setTimeout(resolve, 350));
    }
}

createPuzzle();
const solveButton = document.querySelector('.solve-btn');
const shuffleButton = document.querySelector('.shuffle-btn')
const hintButton = document.querySelector('.hint-btn')

let solving = false;
solveButton.addEventListener('click', async () => {
    if (solving) return;
    solveButton.disabled = true;
    shuffleButton.disabled = true;
    hintButton.disabled = true;
    solving = true;
    changeStateTiles(true);
    
    await moveSolve([1,2,3,4,5,6,7,8,null]);

    solveButton.disabled = false;
    shuffleButton.disabled = false;
    hintButton.disabled = false;
    solving = false;
    changeStateTiles(false);
});

let debounce = false;
hintButton.addEventListener('click', async () => {
    if (debounce) return;
    solveButton.disabled = true;
    shuffleButton.disabled = true;
    hintButton.disabled = true;
    debounce = true;

    let move = solve(TILES, [1,2,3,4,5,6,7,8,null]);
    if (move.length) {
        moveTile(move[0]);
        await new Promise(resolve => setTimeout(resolve, 500));
    };
    debounce = false;
    solveButton.disabled = false;
    shuffleButton.disabled = false;
    hintButton.disabled = false;
});