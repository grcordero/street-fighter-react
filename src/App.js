import React, { Component } from 'react';

import classes from './App.css';


class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.AppTitle}>Street Fighter</h1>
        <div className={[classes.fighters, classes.row].join(' ')}>
          <div className={classes.column}>
            <span>Player 1</span>
            ::HEALTH METER::
          </div>
          <div className={classes.column}>
            <span>Opponent</span>
            ::HEALTH METER::
          </div>
		    </div >
        <div className={classes.row}>
          <div className={classes.column}>
            ::BUTTON::
            ::BUTTON::
          </div>
          <div className={classes.column}>
           ::MESSAGE LOG::
          </div >
        </div >
        ::MODAL::
      </div>
    );
  }
}

export default App;
