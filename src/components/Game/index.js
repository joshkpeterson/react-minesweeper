import React, { useState, useEffect } from 'react';
import styles from './game.module.scss';

function Game() {
  // let seconds = 0;
  const [ bombCount, setBombCount ] = useState(20);
  const [ seconds, setSeconds ] = useState(0);
  let isPause = false;

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
    </div>
  );
}

export default Game;