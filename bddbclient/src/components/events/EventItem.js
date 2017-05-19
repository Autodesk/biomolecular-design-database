import React from 'react';
import './Event.css';

class EventItem extends React.Component{
	render() {
		return (
			<form onSubmit={this.onSubmit} className="dropzone layout col-md-6" id="my-awesome-dropzone">
				<i className="fa fa-upload fa-3x" ></i>
				<h4>Drag and Drop the file you would like to upload </h4>
			</form>
		)
	}
}
