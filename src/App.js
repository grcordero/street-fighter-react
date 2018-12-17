import React, { Component } from 'react';

import classes from './App.css';
import Button from './components/Button/Button';
import Log from './components/Log/Log';
import HealthMeter from './components/HealthMeter/HealthMeter';
import Modal from './components/Modal/Modal';

const PLAYER = 'player';
const OPPONENT = 'opponent';

const root = {
  modal: document.getElementById('modal-root'),
};

class App extends Component {
  state = {
    HP: {
      opponent: 100,
      player: 100,
    },
    special: {
      max: 4,
      counter: 0,
    },
    logs: [],
    playing: true,
    modals: {
      GG: false,
    }
  };

  defaults = this.state;

  styles = {
    center: {
      textAlign: 'center',
      display: 'block',
      margin: '0 auto 15px',
    }
  };
  
  componentDidMount = () => {
    window.addEventListener('keyup', this.handleAttackKey);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleAttackKey);
  }

  getRandomDamageAmount = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleAttackKey = (event) => {
    switch(event.code) {
      case 'KeyA':
        this.handlePunchButton();
        break;

      case 'KeyB':
        if (this.state.special.counter === this.state.special.max) {
          this.handleSpecialButton();
        }
        break;

      case 'KeyP':
        if (this.state.playing === false) {
          this.handlePlayAgain();
        }
        break;

      default:
        break;
    }
  }

  handlePunchButton = () => {
    this.attack(OPPONENT, [5, 10], this.opponentsTurns);
  }

  opponentsTurns = () => {
    this.attack(PLAYER, [7, 14]);
  }

  handleSpecialButton = () => {
    let special = {...this.state.special};

    special.counter = 0;

    this.setState({
      special: special
    }, () => {
      this.attack(OPPONENT, [16, 22], this.opponentsTurns);
    });
  }

  attack = (fighter, power, then) => {
    if (this.state.playing) {
      let damage = this.getRandomDamageAmount(...power);
      
      this.setState((state, props) => {
        let HP = {...state.HP};
        
        HP[fighter] -= damage;
        HP[fighter] = (HP[fighter] < 0) ? 0 : HP[fighter];

        let special = {...state.special};
        
        if (fighter === PLAYER && special.counter < special.max) {
          special.counter++;
        }
       
        let logs = [...state.logs];
          logs.push((fighter === PLAYER ? 'Opponent' : 'Player') + ` did ${damage} damage.`);
        
        return {
          HP: HP,
          logs: logs,
          special: special,
        }
      }, () => {
        this.isGG(then);
      });
    }
  }

  handlePlayAgain = () => {
    this.setState(this.defaults);
  }

  isGG = (callback) => {
    if (this.state.HP.player === 0 || this.state.HP.opponent === 0) {
      this.setState((state) => {
        let logs = [...state.logs];
        logs.push((state.HP.player === 0 ? 'Opponent' : 'Player') + ' won!');
        
        let modals = {...state.modals};
        modals.GG = true;

        return {
          playing: ! state.playing,
          logs: logs,
          modals: modals
        }
      }, () => {
        if (typeof callback === 'function') {
          callback.call(this, callback);
        }
      })
    } else if (typeof callback === 'function') {
      callback.call(this, callback);
    }
  }

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.AppTitle}>Street Fighter</h1>
        
        <div className={[classes.fighters, classes.row].join(' ')}>
          <div className={classes.column}>
            <span>Player 1 </span>
            <HealthMeter percentage={this.state.HP.player} />
          </div>
          <div className={classes.column}>
            <span>Opponent </span>
            <HealthMeter percentage={this.state.HP.opponent} />
          </div>
		    </div>

        <div className={classes.row}>
          <div className={classes.column}>
            {this.state.playing &&
              <Button pressed={this.handlePunchButton} style="Green">A</Button>
            }

            {this.state.special.counter === this.state.special.max && 
              <Button pressed={this.handleSpecialButton} style="Red">B</Button>
            }
          </div>

          <div className={classes.column}>
           <Log messages={this.state.logs} />
          </div >
        </div >
        {this.state.modals.GG && 
          <Modal root={root.modal} onClose={this.handeClose}>
            <h2 style={ this.styles.center }>Game Over</h2>
            <Button pressed={this.handlePlayAgain} style="Plain">Play again (P)</Button>
          </Modal>
        }
      </div>
    );
  }
}

export default App;
