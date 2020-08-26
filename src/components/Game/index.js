import React, { useState, useEffect } from 'react';
import { clone } from 'lodash';
import styles from './game.module.scss';
import Cell from 'components/Cell'


const gridSize = 24 * 20;
const cellDataStub = {
  nearBombCount: 0,
  isBomb: false,
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
        {gameData.map((cellData, index) => <Cell key={index}/>)}
      </div>
    </div>
  );
}

export default Game;