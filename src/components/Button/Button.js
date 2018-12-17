import React from 'react';
import classes from './Button.css';

const button = (props) => {
	return (
		<button onClick={ props.pressed } className={[classes.Button, classes[props.style]].join(' ')}>
			{props.children}
		</button>	
	)
}

export default button;