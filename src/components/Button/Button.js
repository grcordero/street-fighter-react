import React from 'react';
import classes from './Button.css';

const button = props => {
  return (
    <button className={[classes.Button, classes[props.buttonStyle]].join(' ')} onClick={props.pressed}>
      {props.children}
    </button>
  )
}

export default button;