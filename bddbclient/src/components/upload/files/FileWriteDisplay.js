import React from 'react';
import Lightbox from 'react-image-lightbox';
import path from 'path';
import { updateFileItem } from '../../../actions/detailsAction';
import { deleteFile } from '../../../actions/fileActions';
import { connect } from 'react-redux';

const customStyles = {
	    overlay : {
	    position          : 'fixed',
	    zIndex 			  : 9999
	}
}

class FileWriteDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			isOpen: false,
            lightboxDisplay: '',
            title: '',
            details: '',
            filesLink: [],
            changed: false
		}
		this.onChange = this.onChange.bind(this);
		this.doneClicked = this.doneClicked.bind(this);
		this.deleteClicked = this.deleteClicked.bind(this);
	}

	componentWillMount(){
		if(this.props.file.file_link){
			this.setState ({
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
		}
		this.setState({
			id: this.props.file.id,
			title: this.props.file.title,
			details: this.props.file.description
		});
	}

	deleteClicked(e){
		e.preventDefault();
		var query = "file_id="+this.props.file.id;
		this.props.deleteFile(query).then(
			(res) => {
				this.props.deleteClicked(this.props.file.id);
			},
			(err) => { this.context.router.push('/notfound');}
		);	
	}

	doneClicked(e){	
		e.preventDefault();
		if(this.state.changed){
			this.props.updateFileItem(this.state).then(
				(res) => {
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound');}
			);	
		}
	}

	onChange(e){
		e.preventDefault();
		if(!this.state.changed){
			this.setState({ changed: true, [e.target.name]: e.target.value });
		}
		else{
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	imgOrNot(type){
		if(type){ //type is not null
			type = type.toString();
			if(type.indexOf('image') !== -1){
				return true;
			}
			return false;
		}
		return false;
	}

	toDisplayName(name){
		if(name === 'null'){
			return <p></p>;
		}
		return <span className="plain-background"><h5>{name}</h5></span>;
	}
	
	render(){
		const {
            isOpen, lightboxDisplay
        } = this.state;
		const type = this.props.file.type;
		const imgBool = this.imgOrNot(type);
		const fileName = path.basename(this.props.file.file_name);
		const nonImg = this.toDisplayName(fileName);

		return(
			<div>
			<div className="single-file container-fluid" >
				<div className="file-title-write"><input type='text' placeholder="Title*" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /></div>
				<div className="col-sm-12 file-image" >
					{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
				</div>
				<div className="file-abstract-input">
					<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='5'></textarea>
				</div>
				<div className="row file-btns">
					<button className="btn delete-file-btn" onClick={this.deleteClicked}>Delete File Block</button>
					<button className="btn upload-media-btn">Upload Additional Media</button>
					<button className="btn done-file-btn" disabled={!this.state.changed} onClick={this.doneClicked}> Done </button>
				</div>
				{isOpen ? lightboxDisplay : ''}
				
			</div>
			<hr className="hr-display"/>
			</div>
		);
	}
}

FileWriteDisplay.propTypes = {
	file: React.PropTypes.object,
	updateFileItem: React.PropTypes.func,
	fileChanged: React.PropTypes.func,
	deleteFile: React.PropTypes.func,
	deleteClicked: React.PropTypes.func
}

FileWriteDisplay.contextTypes = {
	router: React.PropTypes.object.isRequired
}
function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {updateFileItem, deleteFile })(FileWriteDisplay);

