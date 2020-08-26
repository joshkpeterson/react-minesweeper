import React from 'react';
import styles from './app.module.scss';
import Game from 'components/Game/index.js';

function App() {
  return (
    <div className={styles.page_container}>
      <Game />
    </div>
  );
}

export default App;
