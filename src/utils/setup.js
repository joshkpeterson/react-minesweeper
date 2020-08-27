const getNeighbors = (index, gameData, rowLength, gridSize) => {
  let indexArray = [];
  let isTop = true,
      isBottom = true,
      isLeft = true,
      isRight = true;
  let remainder = index % rowLength;

  // Not left column
  if (remainder !== 0) {
    indexArray.push(index - 1);
    isLeft = false;
  }
  // Not right column
  if (remainder + 1 !== rowLength) {
    indexArray.push(index + 1);
    isRight = false;
  }
  // Not top row
  if (index - rowLength > -1) {
    indexArray.push(index - rowLength);
    isTop = false;
  }
  // Not bottom row
  if (index + rowLength < gridSize) {
    indexArray.push(index + rowLength);
    isBottom = false;
  }

  // top left
  if (!isTop && !isLeft) {
    indexArray.push(index - rowLength - 1);
  }
  // top right
  if (!isTop && !isRight) {
    indexArray.push(index - rowLength + 1);
  }
  // bottom left
  if (!isBottom && !isLeft) {
    indexArray.push(index + rowLength - 1);
  }
  // bottom right
  if (!isBottom && !isRight) {
    indexArray.push(index + rowLength + 1);
  }

  return indexArray.map(i => gameData[i]);
}

export { getNeighbors };