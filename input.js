let inputDirection = { x: 0, y: 0 }; // by default snake dont move
let lastInputDirection = { x: 0, y: 0 }; // to be used as a check

let startX;
let startY;
let endX;
let endY;

const board = document.getElementById('board-container')

export function mobileMovment() {
  window.addEventListener('touchstart', (e) => {
    // Getting finger down details
    const touchList = e.changedTouches;
    const swipe = touchList.item(0)
    startX = swipe.screenX
    startY = swipe.screenY


  })
  window.addEventListener('touchend', (e) => {
    // Getting finger up location
    const touchList = e.changedTouches;
    const swipe = touchList.item(0)
    endX = swipe.screenX
    endY = swipe.screenY
    decideSwipes()
  })
}

export function keyboardMovment() {
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp' :
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: -1}
        break
      case 'ArrowDown' :
        if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: 1}
        break
      case 'ArrowRight' :
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: 1, y: 0}
        break
      case 'ArrowLeft' :
        if (lastInputDirection.x !== 0) break;
        inputDirection = { x: -1, y: 0}
    }
  })
}

function decideSwipes() {
  // Getting total distance finger traveled on screen
  const distanceHorizontal = Math.abs(startX - endX)
  const distanceVertical = Math.abs(startY - endY)

  // Deciding if user meant vertical of horizontal weipe && if move is legal
  if (distanceHorizontal > distanceVertical && lastInputDirection.x === 0) {
    // thre user attempted horizontal swipe
    if (startX < endX) {
      // swipe right
      inputDirection = { x: 1, y: 0}
    } else {
      // swipe left
      inputDirection = { x: -1, y: 0}
    }
  } else if (distanceHorizontal < distanceVertical && lastInputDirection.y === 0) {
    // the user attempted vertical swipe
    if (startY < endY) {
      // swipe down
      inputDirection = { x: 0, y: 1}
    } else {
      // Swipe up
      inputDirection = { x: 0, y: -1}
    }
  }
}

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection
}

export function reset() {
  inputDirection = { x: 0, y: 0 };
  lastInputDirection = { x: 0, y: 0 }
}
