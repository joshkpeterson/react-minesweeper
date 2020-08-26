import React, { useState, useEffect } from 'react';
import { clone } from 'lodash';
import styles from './game.module.scss';
import Cell from 'components/Cell'
import { CELL_TYPES } from 'utils/constants'

const rowLength = 24;
const columnLength = 20;
const gridSize = rowLength * columnLength;
const cellDataStub = {
  nearBombCount: 3,
  type: CELL_TYPES.COUNT,
  isRevealed: false,
}
let tempGameData = [];

// Create initial game state for each cell
for (var i = 0; i < gridSize; i++) {
    tempGameData.push(clone(cellDataStub));
}

function Game() {
  const [ bombCount, setBombCount ] = useState(20);
  const [ seconds, setSeconds ] = useState(0);
  let isPause = false;

  const [ gameData, setGameData ] = useState(tempGameData);
  const [ neighbors, setNeighbors ] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPause) {
        setSeconds(prevSeconds => prevSeconds + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPause]);

  // useEffect(() => {
  //   setNeighbors = getNeighbors()
  // }, []);

  const getNeighbors = (index) => {
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

  return (
    <div className={styles.game_container}>
      <div className={styles.game__header}>
        <div className={styles.game__bomb_counter}>
          {bombCount}
        </div>
        <button className={styles.game__reset_button} onClick={()=> setSeconds(0)}>Reset</button>
        <div className={styles.game__clock}>{seconds}</div>
      </div>
      <div className={styles.game__grid}>
        {gameData.map((cellData, index) => <Cell key={index} data={cellData} neighbors={getNeighbors(index)} />)}
      </div>
    </div>
  );
}

export default Game;
