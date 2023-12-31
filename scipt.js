/*counter */

const scoreCounter = document.querySelector('.score-counter')
console.log(scoreCounter);


/*cells*/

const grid = document.querySelector('.grid')


/*end game screen*/

const endGameScreen = document.querySelector('.end-game-screen')


/* end game text */

const endGameText = document.querySelector('.end-game-text')

/* play again button */

const playAgainButton = document.querySelector('.play-again')
console.log(playAgainButton);

/*info utii alla logica*/

const totalCells = 100;
const totalBombs = 6;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let specialCell;
let score = 0;

/*random bomb generator*/

/*until the length of bombList is less than totalBombs execute this condition*/
while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1      /*to avoid having duplicate numbers I use if to say if the randomly drawn number is not in the bombList then add it to the bombList*/

    if (!bombsList.includes(number)) {
        bombsList.push(number)
    }
}
console.log(bombsList);


do {
    specialCell = Math.floor(Math.random() * totalCells) + 1;
} while (bombsList.includes(specialCell));
console.log("Special Cell:", specialCell);


/*grid*/

let isCellEven = false;
let isRowEven = false;

/* Creation of cells with class cell*/

for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell')
    // cell.innerText = i;

    isCellEven = i % 2 === 0;     /*checks whether the cell is even, if it is, assigns it the cell-dark class */


    /*if the row is even and the cell is even or if the row is odd and the cell is odd : add class grey box*/
    if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) cell.classList.add('cell-dark')


    /*To achieve the chessboard effect, I check that they are at the end of the row. 
    And then I say if the number at the end of the row is divisible by 10,
     whatever colour the next row had applies its opposite */
    if (i % 10 === 0) isRowEven = !isRowEven

    /* handling cell clicks*/

    cell.addEventListener('click', () => {
        /*I check that the cell has not already been clicked */
        if (cell.classList.contains('cell-clicked')) return;

        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb')
            endGame(false)
        } else if (specialCell === i) {
            cell.classList.add('special-cell')
            endGame(true)
        }
        else {
            cell.classList.add('cell-clicked')
            updateScore()
        }

    })

    grid.appendChild(cell)
}


/* Functions */

//
const updateScore = () => {
    //increase the score
    score++;
    //I insert it into the counter
    scoreCounter.innerText = String(score).padStart(5, 0)
    //I check if the user has won
    if (score === maxScore) endGame(true)

}


const endGame = (isVictory) => {
    if (isVictory === true) {
        endGameScreen.classList.add('win')
        endGameText.innerHTML = 'YOU <br> WIN'
        endGameText.classList.add('end-game-text2')

    } else {
        //if i loose show all the bombs
        revealAllBombs()
    }
    endGameScreen.classList.remove('hidden')
}

//reveal all bombs when you loose
const revealAllBombs = () => {
    const cells = document.querySelectorAll('.cell');
    console.log(cells);
    for (let i = 1; i <= cells.length; i++) {
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1]
            cellToReveal.classList.add('cell-bomb')
        }
    }


}

/* play game button */

playAgainButton.addEventListener('click', () => {
    location.reload()
})

for (i = 0; i < bombsList.length; i++) {

    if (bombsList[i].type == "checkbox") {
        let cellBonus = bombsList[2]
        console.log(cellBonus);
    }
}