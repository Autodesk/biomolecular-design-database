import React from 'react';
//import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { uploadFiles } from '../../actions/eventActions';
import './Event.css';
import Dropzone from 'react-dropzone';
import EventItem from './EventItem';
import shortid from 'shortid';

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
		this.onDrop = this.onDrop.bind(this);
	}

	onChange(e) { 
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.uploadFiles(this.state).then(
			(res) => console.log('done'),
			(err) => console.log(err)
		);
		//console.log('received files: ', this.state.files);
	}



	onDrop(file){
		var newFilesArr = this.state.files.slice();
		
		newFilesArr.push(file);
		this.setState({
			files: newFilesArr
		});
		console.log('received files: ', this.state.files);
	}
	handleFiles(files) {
		console.log(files);
	}
	render(){
		//const { title, errors, isLoading } = this.state;

		const fileItems = this.state.files.map((file) => {
			return <EventItem key={shortid.generate()} file={file} />  
		});
	
		return( 
			
			<div>
			   
			  

				<ul >
            		{fileItems}
            	</ul>


                <Dropzone className="layout	" onDrop={this.onDrop}>
                    <i className="fa fa-upload fa-3x" ></i>
                    <h4>Try dropping files here, or click to select files to upload. </h4>
                </Dropzone>

                {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{console.log('received files: ', this.state.files)}, {this.state.files.map((file) => console.log(file[0]) )}</div>
                </div> : null}

                <hr/>
                <div className="row">
                	<button type="button" className="btn btn-primary pull-left">Delete project</button>
            		<button type="button" onClick={this.onSubmit} className="btn btn-primary pull-right">Save and Preview</button>
            	</div>


            </div>		
		);
	}
}

EventForm.propTypes = {
	uploadFiles: React.PropTypes.func.isRequired
}


export default connect(null, {uploadFiles})(EventForm); //connecting to the store to check the authentication