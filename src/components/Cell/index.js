import React, { useState } from 'react';
import styles from './cell.module.scss';
import classNames from 'classnames';


function Cell() {
  let [ isRevealed, setIsRevealed ] = useState();

  const revealCell = () => {
    console.log('asdf')

    if (!isRevealed) {
      setIsRevealed(true);
    }
  }


  let cellClasses = classNames(
    styles.cell,
    { [styles.foo]: isRevealed }
  );

  return (
    <div className={cellClasses} onClick={revealCell}>
    foo
    </div>
  );
}

export default Cell;