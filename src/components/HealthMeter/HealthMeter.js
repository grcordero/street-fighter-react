import React from 'react';

import styles from './HealthMeter.css';

const HealthMeter = (props) => {
    var style = {
      width: `${props.percentage}%`,
      background: 'red'
    };

    if (props.percentage <= 100 && props.percentage >= 61) {
      style.background = 'green';

    } else if (props.percentage <=60 && props.percentage >= 21) {
      style.background = 'yellow';
    }

    return (
      <div className={styles.ProgressBar}>
        <div className={styles.ProgressAmount} style={style}></div>
        <small>{props.percentage}/100</small>
      </div>
    );
}

export default HealthMeter;