import React from 'react';

class ServerError extends React.Component {
	render() {
		return( 
			<div>
				<h1 className="not-found-layout"> Project not found.</h1>
				<h3> Please check the link and try again later. </h3>
				 
			</div>
		);
	}
}



export default ServerError;