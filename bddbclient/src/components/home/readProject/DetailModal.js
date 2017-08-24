import React from 'react';

class DetailModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
			<div className="prompt-style details-box-style">
				<span className="delete-prompt" onClick={this.props.deactivateModal}> X </span>
				<div className="prompt-message">
					{this.props.message} 
				</div>
				
			</div>

		);
	}
}

React.propTypes = {
	message: React.PropTypes.string,
	deactivateModal: React.PropTypes.func.isRequired
}
export default DetailModal;