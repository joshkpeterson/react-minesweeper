import React, { useState, useEffect } from 'react';
import { clone, each, shuffle } from 'lodash';
import styles from './game.module.scss';
import Cell from 'components/Cell'
import { CELL_TYPES } from 'utils/constants'
import { getNeighbors } from 'utils/setup'

const rowLength = 24;
const columnLength = 20;
const gridSize = rowLength * columnLength;
const bombCount = 20;
const cellDataStub = {
  nearBombCount: 0,
  type: CELL_TYPES.EMPTY,
  isRevealed: false,
  neighbors: [],
}
let tempGameData = [];

// Create initial game state for each cell
for (let i = 0; i < gridSize; i++) {
  const dataForCell = clone(cellDataStub);

  if (i < bombCount - 1) {
    dataForCell.type = CELL_TYPES.BOMB;
  }

  tempGameData.push(dataForCell);
}

// Randomize bomb position
tempGameData = shuffle(tempGameData);

// get neighbors and mutuate tempGameData
for (let i = 0; i < gridSize; i++) {
  console.log(i)
  let neighbors = getNeighbors(i, tempGameData, rowLength, gridSize);
  
  if (tempGameData[i].type === CELL_TYPES.BOMB) {
    console.log(neighbors)
    each(neighbors, function(cell) {
      if (cell.type !== CELL_TYPES.BOMB) {
        cell.nearBombCount += 1;
        cell.type = CELL_TYPES.COUNT;
      }
    });
  }

  tempGameData[i].neighbors = neighbors;
}


// _.each(tempGameData, function(item) {
//   getNeighbors(item, tempGameData)
//   if (item.)
// })

//for all these indices: 
// edit type
// for each neighbor, increment nearbombcount
// for each:  if type is bomb








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
        {gameData.map((cellData, index) => <Cell key={index} data={cellData} />)}
      </div>
    </div>
  );
}

export default Game;
