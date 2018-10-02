import React from 'react';

class PromptModal extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
			<div className="prompt-style">
				<span className="delete-prompt" onClick={this.props.deactivateModal}> X </span>
				<div className="prompt-message">
					{this.props.message} 
				</div>
				<div className="prompt-btns">
					<button className="button btn left-prompt-btn" onClick={this.props.left}> {this.props.leftBtn} </button>
					<button className="button btn right-prompt-btn" onClick={this.props.right}> {this.props.rightBtn} </button>
				</div>
			</div>

		);
	}
}

React.propTypes = {
	message: React.PropTypes.string,
	leftBtn: React.PropTypes.string,
	rightBtn: React.PropTypes.string,
	left: React.PropTypes.func.isRequired,
	right: React.PropTypes.func.isRequired,
	deactivateModal: React.PropTypes.func.isRequired
}
export default PromptModal;