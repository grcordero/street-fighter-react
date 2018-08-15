import React from 'react';
import classes from './HealthMeter.css';

const healthMeter = props => {
  return (
    <div className={classes.ProgressBar}>
      <div style={{width: props.progressBarWidth + "%"}} className={classes.ProgressAmount}></div>
      { props.healthValue }
    </div >
  )
}

export default healthMeter;