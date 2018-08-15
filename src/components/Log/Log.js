import React from 'react';
import classes from './Log.css'

const log = props => {
  return (
    <div>
      <h2 className={classes.MessageLogTitle}>
        The Log
      </h2>
      <ul className={classes.MessageLog}>
        {props.messages.map((message,index) => {
          return (
            <li key={index} className={classes.MessageLogItem}>
              {message}
            </li>
          )
        })}
      </ul>
    </div >
  )
}

export default log;