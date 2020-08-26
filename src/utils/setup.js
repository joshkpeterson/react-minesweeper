const getNeighbors = (index, gameData) => {
  let indexArray = [];
  let isTop = true,
      isBottom = true,
      isLeft = true,
      isRight = true;
  let remainder = index % rowLength;
  // Not left column
  if (remainder === 0) {
    indexArray.push(gameData[index - 1]);
    isLeft = false;
  }
  // Not right column
  if (remainder === 0) {
    indexArray.push(gameData[index + 1]);
    isRight = false;
  }
  // Not top row
  if (index - rowLength > -1) {
    indexArray.push(gameData[index - rowLength]);
    isTop = false;
  }
  // Not bottom row
  if (index + rowLength > gridSize) {
    indexArray.push(gameData[index - rowLength]);
    isBottom = false;
  }

  // top left
  if (!isTop && !isLeft) {
    indexArray.push(gameData[index - rowLength - 1]);
  }
  // top right
  if (!isTop && !isRight) {
    indexArray.push(gameData[index - rowLength + 1]);
  }
  // bottom left
  if (!isBottom && !isLeft) {
    indexArray.push(gameData[index + rowLength - 1]);
  }
  // bottom right
  if (!isBottom && !isRight) {
    indexArray.push(gameData[index + rowLength + 1]);
  }

  return indexArray.map(i => gameData[i])
}

export { getNeighbors };