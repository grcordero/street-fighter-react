import React from 'react';
import classes from './Modal.css';

const modal = props => {
  return (
    <div className={classes.Overlay} onClick={props.closeOverlay}>
      <div className={classes.Modal}>
        <span className={classes.ModalClose} onClick={props.closeOverlay}>
          &times;
        </span>
        <div className={classes.ModalContent}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default modal;