import React from 'react';

const button = (props) => {
	return (
		<button onClick={props.pressed}>
			Button Text
		</button>	
	)
}

export default button;