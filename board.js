const gameBoard = document.querySelector("#board")
const infoDisplay = document.querySelector("#info-display")
let puzzleActive = false
let width = 8
let height = 8


const startBoard = [
    knight, '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '' 
]

function createBoard() {
    startBoard.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        const row = Math.floor((63 - i) / 8) + 1
        if ( row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }
        gameBoard.append(square)
    })
}

createBoard()


const allSquare = document.querySelectorAll("#board, .square")

allSquare.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionID 
let DraggedElement

function dragStart (e) {
    startPositionID = e.target.parentNode.getAttribute("square-id")
    DraggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
const valid = checkIfValid(e.target)

    if (valid === true && puzzleActive === true) {
        e.stopPropagation()
        e.target.append(DraggedElement)
    } else if (puzzleActive === false) {
        e.stopPropagation()
        e.target.append(DraggedElement)
    }
    
}

function checkIfValid (target) {
    const targetID = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startid = Number(startPositionID)
    const piece = DraggedElement.id
    if ( startid + width * 2 -1 ===targetID || 
            startid + width * 2 +1 ===targetID || 
            startid + width - 2 ===targetID || 
            startid + width + 2 ===targetID ||
            startid - width * 2 -1 ===targetID || 
            startid - width * 2 +1 ===targetID || 
            startid - width - 2 ===targetID || 
            startid - width + 2 ===targetID) {
                console.log("valid")
                return true
            }
            
    }






function puzzleSwitch () {
    if (puzzleActive === false) { 
        document.querySelector('#activationButton').innerHTML = 'Reset';
        puzzleActive = true 
        console.log("Activated")
    } else {
        document.querySelector('#activationButton').innerHTML = 'Start';
        puzzleActive = false 
        console.log("Deactivated")
    }
}
