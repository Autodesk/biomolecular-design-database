import React from 'react';

class ServerError extends React.Component {
	render() {
		return( 
			<div>
				<h1 className="not-found-layout"> Project not found.
				<h3> Please check the link and try again later. </h3>
				 </h1>
			</div>
		);
	}
}



export default ServerError;