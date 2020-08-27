import React, { useState, useEffect } from 'react';
import styles from './cell.module.scss';
import classNames from 'classnames';
import { CELL_TYPES } from 'utils/constants'


function Cell(props) {
  let [ isRevealed, setIsRevealed ] = useState(false);
  let [ isFlagged, setIsFlagged ] = useState(false);

  useEffect(() => {
    console.log('heyy')

    // console.log(
    //   JSON.stringify(props.data.neighbors.map(item => {
    //     const { neighbors, ...otherAttributes } = item;

    //     return ({
    //       neighbors: [],
    //     ...otherAttributes
    //     });
    //   }))
    // )


  },[
    JSON.stringify(props.data.neighbors.map(item => {
      const { neighbors, ...otherAttributes } = item;

      return ({
        neighbors: [],
      ...otherAttributes
      });
    }))
  ])

  const revealCell = (e) => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  }

  const toggleFlag = (e) => {
    e.preventDefault();
    setIsFlagged(!isFlagged);
  }

  let cellClasses = classNames(
    styles.cell,
    { [styles.cell___isRevealed]: isRevealed }
  );

  return (
    <div className={cellClasses} onClick={revealCell} onContextMenu={toggleFlag}>
      <span className={styles.cell__content}>
        {isFlagged && !isRevealed && '🚩'}
        {isRevealed && props.data.type === CELL_TYPES.BOMB && '💣'}
        {isRevealed && props.data.type === CELL_TYPES.COUNT && props.data.nearBombCount}
      </span>
    </div>
  );
}

export default Cell;
