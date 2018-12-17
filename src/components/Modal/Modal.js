import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ReactDOM.createPortal(
      (<div className={ styles.Overlay }>
        <div className={ styles.Modal }>
          {this.props.children}
        </div>
    </div>),
      this.props.root,
    );
  }
}

export default Modal;