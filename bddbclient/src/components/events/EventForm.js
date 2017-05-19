import React from 'react';
//import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { uploadFiles } from '../../actions/eventActions';
import './Event.css';
//import Dropzone from 'react-dropzone';

class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//title: '',
			//errors: {},
			//isLoading: false,
			files: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.uploadFiles(this.state);
	}

	onDrop(files){
		this.setState({
			files: files
		});
		console.log(files)
	}

	render(){
		//const { title, errors, isLoading } = this.state;
		return(
			<form action="file-upload" method="post" className="dropzone layout col-md-6" id="my-awesome-dropzone">
				
				<i className="fa fa-upload fa-3x" ></i>
				<h4>Drag and Drop the file you would like to upload </h4>
			</form>

		);
	}
}

EventForm.propTypes = {
	uploadFiles: React.PropTypes.func.isRequired
}


export default connect(null, {uploadFiles})(EventForm); //connecting to the store to check the authentication