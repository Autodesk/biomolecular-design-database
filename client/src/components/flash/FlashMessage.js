import React from 'react';
import classnames from 'classnames';


class FlashMessage extends React.Component {

	constructor(props){
		super(props); //has to be there
		this.onClick= this.onClick.bind(this);
	}

	componentWillMount(){
		setTimeout(() => {
			this.props.deleteFlashMessage(this.props.message.id);
		}, 6000)
	}
	
	onClick(){
		this.props.deleteFlashMessage(this.props.message.id);
	}

	render() {
		const { type, text } = this.props.message;
		return (
			<div className="flash">
				<div className={classnames('alert',  {
					' flash-alert-success': type === 'success',
					' flash-alert-danger': type === 'error'
				})}>
				<button onClick={this.onClick} className="close-x"><span className="ltr-x">&times;</span></button>
				{text}
				</div>
			</div>
		);
	}
}

FlashMessage.propTypes = {
	message: React.PropTypes.object.isRequired,
	deleteFlashMessage: React.PropTypes.func.isRequired
}



export default FlashMessage;
