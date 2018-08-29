import React from 'react';

const log = (props) => {
	return (
		<div>
			<h2>
				The Log
			</h2>	
			<ul>
				{props.messages.map((message, index) => {
					return (
						<li>
							{message}
						</li>
					)
				})}
			</ul>		
		</div>
	)
}

export default log;