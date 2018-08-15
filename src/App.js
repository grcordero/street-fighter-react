import React, { Component } from 'react';

import classes from './App.css';
import HealthMeter from './components/HealthMeter/HealthMeter';
import CustomButton from './components/Button/Button';
import Log from './components/Log/Log';
import Modal from './components/Modal/Modal';


class App extends Component {

  state = {
    playerHealth: 100,
    opponentHealth: 100,
    messageLog: [],
    gameInPlay: true,
    showModal: false,
    gameOverMessage: ""
  };

  getRandomDamageAmount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handlePunchButton = () => {
    let damage = this.getRandomDamageAmount(5, 9);
    let opponentHealth = this.state.opponentHealth - damage;
    opponentHealth = opponentHealth < 0 ? 0 : opponentHealth;
    let messageLog = [...this.state.messageLog];
    messageLog.push(`Player used Special Attack and did ${damage} damage`);
    this.setState({ opponentHealth, messageLog}, () => {
      this.checkForGameOver();
      this.opponentsTurn();
    });
  }

  handleSpecialButton = () => {
    let damage = this.getRandomDamageAmount(8, 12);
    let opponentHealth = this.state.opponentHealth - damage;
    opponentHealth = opponentHealth < 0 ? 0 : opponentHealth;
    let messageLog = [...this.state.messageLog];
    messageLog.push(`Player used Special Attack and did ${damage} damage`);
    this.setState({ opponentHealth, messageLog }, () => {
      this.checkForGameOver();
      this.opponentsTurn();
    });
  }

  opponentsTurn = () => {
    if (this.state.gameInPlay) {
      let damage = this.getRandomDamageAmount(5, 15);
      let playerHealth = this.state.playerHealth - damage;
      playerHealth = playerHealth < 0 ? 0 : playerHealth;
      let messageLog = [...this.state.messageLog];
      console.log(playerHealth);
      messageLog.push(`Opponent attacks and does ${damage} damage`);
      this.setState({ playerHealth, messageLog }, () => {
        this.checkForGameOver();
      });
    }
  }

  handleResetButton = () => {
    this.reset();
  }

  checkForGameOver = () => {
    if (this.state.opponentHealth <= 0 || this.state.playerHealth <= 0) {
      let gameInPlay = false;
      let showModal = true;
      let messageLog = [...this.state.messageLog];
      var gameOverMessage = "";
      if (this.state.opponentHealth <= 0) {
        messageLog.push('Player won!');
        gameOverMessage = "Player won. Play again?"
      }
      if (this.state.playerHealth <= 0) {
        messageLog.push('Man, you suck!');
        gameOverMessage = "You lose. Play again?"
      }
      this.setState({gameInPlay, showModal, messageLog, gameOverMessage});
    }
  }

  reset = () => {
    this.setState({
      opponentHealth: 100, 
      playerHealth: 100, 
      messageLog: [], 
      showModal: false,
      gameInPlay: true
    });
  }

  renderModal = () => {
    return (
      <Modal>
        <div>
          <p>{this.state.gameOverMessage}</p>
        </div>
        <CustomButton buttonStyle="Plain" pressed={this.handleResetButton}>
          Challenge Accepted
        </CustomButton>
      </Modal>
    )
  }

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.AppTitle}>Street Fighter</h1>
        <div className={[classes.fighters, classes.row].join(' ')}>
          <div className={classes.column}>
            <span>Player 1</span>
            <HealthMeter healthValue={this.state.playerHealth}></HealthMeter>
          </div>
          <div className={classes.column}>
            <span>Opponent</span>
            <HealthMeter healthValue={this.state.opponentHealth}></HealthMeter>
          </div>
		    </div >
        <div className={classes.row}>
          <div className={classes.column}>
            <CustomButton buttonStyle="Green" pressed={this.handlePunchButton}></CustomButton>
            <CustomButton buttonStyle="Red" pressed={this.handleSpecialButton}></CustomButton>
          </div>
          <div className={classes.column}>
            <Log messages={this.state.messageLog}></Log>
          </div >
        </div >
        {this.state.showModal ? this.renderModal() : null}
      </div>
    );
  }
}

export default App;
