import React from 'react';

const log = (props) => {
	return (
		<div>
			{props.messages.length ? (<h2>Damage Logs</h2>) : null}
			<ul>
				{props.messages.map((message, index) => (
						<li key={index}>
							{message}
						</li>
					)
				)}
			</ul>		
		</div>
	)
}

export default log;