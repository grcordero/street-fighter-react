import React, { Component } from 'react';

import classes from './App.css';
import Button from './components/Button/Button';
import Log from './components/Log/Log';


class App extends Component {

  state = {
    playerHealth: 100,
    opponentHealth: 100,
    messageLog: [],
    gameInPlay: true,
    showModal: false,
    gameOverMessage: ""
  }

  getRandomDamageAmount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handlePunchButton = () => {
    let damage = this.getRandomDamageAmount(5,9);
    let opponentHealth = this.state.opponentHealth - damage;
    opponentHealth = opponentHealth < 0 ? 0 : opponentHealth;
    let messageLog = [...this.state.messageLog];
    messageLog.push(`Player used Punch and did ${damage} damage.`);
    this.setState({ opponentHealth, messageLog }, () => {
      this.checkForGameOver();
      this.opponentsTurns();
    });
  }

  handleSpecialButton = () => {
    alert('You punched someone harder?');
  }

  opponentsTurns = () => {
    if (this.state.gameInPlay) {
      let damage = this.getRandomDamageAmount(5,15);
      let playerHealth = this.state.playerHealth - damage;
      playerHealth = playerHealth < 0 ? 0 : playerHealth;
      let messageLog = [...this.state.messageLog];
      messageLog.push(`Opponent Attacked and did ${damage} damage`);
      this.setState({playerHealth, messageLog});
    }
  }

  checkForGameOver = () => {
    if (this.state.opponentHealth <= 0 || this.state.playerHealth <= 0) {
      let gameInPlay = false;
      let showModal = true;
      let gameOverMessage = "";
      let messageLog = [...this.state.messageLog];
      if (this.state.opponentHealth <= 0) {
        messageLog.push("Player won");
        gameOverMessage = "Player won. Play Again?";
      }
      if (this.state.playerHealth <= 0) {
        messageLog.push("Opponent won");
        gameOverMessage = "Opponent won. Play Again?";
      }
      this.setState({gameInPlay, showModal, messageLog, gameOverMessage});
    }
  }

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.AppTitle}>Street Fighter</h1>
        <div className={[classes.fighters, classes.row].join(' ')}>
          <div className={classes.column}>
            <span>Player 1 </span>
            {this.state.playerHealth}
          </div>
          <div className={classes.column}>
            <span>Opponent </span>
            {this.state.opponentHealth}
          </div>
		    </div >
        <div className={classes.row}>
          <div className={classes.column}>
            <Button pressed={this.handlePunchButton}/>
            <Button pressed={this.handleSpecialButton}/>
          </div>
          <div className={classes.column}>
           <Log messages={this.state.messageLog} />
          </div >
        </div >
        ::MODAL::
      </div>
    );
  }
}

export default App;
