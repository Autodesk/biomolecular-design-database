import React from 'react';
import Lightbox from 'react-image-lightbox';
import { uploadFile } from '../../../actions/fileActions';
import { connect } from 'react-redux';
import { updateFileItem } from '../../../actions/detailsAction';
import { uploadDocumentToS3, signedUrlForS3Doc, deleteDocument, deleteFile } from '../../../actions/fileActions';
import mime from 'mime-types';

const customStyles = {
	overlay : {
	    position          : 'fixed',
	    zIndex 			  : 9999
	}
}

class NewFileBlock extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			isOpen: false,
            lightboxDisplay: '',
            title: '',
            details: '',
            file_link: null,
            file_path_s3: null,
            tags: '',
            changed: false,
            project_id: 0,
            user_id: 0,
            imgBool: false,
            newFileBlock: false,
            showTitle: false,
            showCaption: false
		}
		this.onChange = this.onChange.bind(this);
		this.doneClicked = this.doneClicked.bind(this);
		this.newFileBlockDelete = this.newFileBlockDelete.bind(this);
		this.deleteClicked = this.deleteClicked.bind(this);
		this.saveUpdateFile = this.saveUpdateFile.bind(this);
		this.toggleTitle = this.toggleTitle.bind(this);
		this.toggleCaption = this.toggleCaption.bind(this);
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		if(nextProps.updateFiles){
			this.saveUpdateFile();
		}
	}

	toggleTitle(){
		if(this.state.showTitle){
			this.setState({ showTitle : false, title: '' });		
		}
		else{
			this.setState({ showTitle: true });
		}
	}

	toggleCaption(){
		if(this.state.showCaption){
			this.setState({showCaption: false, details: ''});
		}
		else{
			this.setState({showCaption : true });
		}
	}

	deleteClicked(){
		//delete the image from AWS s3
		//backend request
		console.log(this.state);
		if(this.state.file_path_s3){
			console.log('deleting');
			console.log(this.state.file_path_s3);
			var queryPath = 'pathOnS3='+this.state.file_path_s3;
			this.props.deleteDocument(queryPath).then(
				(res) => {
					this.setState({ error: false});
					//var response = JSON.parse(res.request.response);
				}, 
				(err) => { 
					console.log('error');
					this.setState({error: true});
					this.context.router.push('/notfound');
				}
			);
		}
		//remove the file block from front end display
		if(!this.props.isNewFile){
			//file already exists on database, delete it
			var query = "file_id="+this.props.file.id;
			this.props.deleteFile(query).then(
				(res) => {
					this.props.existingFileDelete(this.props.file.id);
				},
				(err) => { this.context.router.push('/notfound');}
			);	
		}
		if(this.props.isNewFile){
			this.props.newFileDeleteClicked(this.props.file.id);
		}
	}

	componentWillMount(){
		this.setState({ newFileBlock: this.props.isNewFile, project_id: this.props.file.project_id, userId: this.props.file.user_id });
		if(this.props.file.file){
			//THERE IS A FILE TO UPLOAD ON S3
			var _imgBool = false;
			var file = this.props.file.file;
			var _saveLink = 'allFiles/'+this.props.file.user_id+'/'+this.props.file.project_id+'/'+Date.now()+'-'+this.props.file.file.name;
			this.props.uploadDocumentToS3({file, saveLink: _saveLink}).then(
					(res) => { 
						var response = JSON.parse(res.request.response);
						var queryString = 'saveLink='+response.saveLink;
						this.props.signedUrlForS3Doc(queryString).then(
							(res) => {
								var response = JSON.parse(res.request.response);
								this.setState({ file_link: response.signedUrl, file_path_s3: _saveLink});
							}, 
							(err) => { 
								console.log('error');
								this.setState({error: true});
								this.context.router.push('/notfound');
							}
						);
					},
					(err) => { console.log('error'); }
				);
			if(mime.lookup(_saveLink).indexOf('image') > -1){
				_imgBool = true;
			};
			this.setState({imgBool: _imgBool});
		}

		if(this.props.file.file_link && this.props.file.file_name){
			var _img_bool = false;
			if(mime.lookup(this.props.file.file_name).indexOf('image') > -1){
				_img_bool = true;
			};
			//console.log(this.props.file.file_link);
			this.setState ({
				imgBool: _img_bool,
				file_link: this.props.file.file_link,
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
		}
		if(!this.props.isNewFile){
			this.setState({ id: this.props.file.id });
		}
		if(this.props.file.title !== ''){
			this.setState({
				title: this.props.file.title,
				showTitle: true
			 });
		}
		if(this.props.file.description !== ''){
			this.setState({
				details: this.props.file.description,
				showCaption: true
			 });
		}
	}
	
	saveUpdateFile(){
		//SAVE A NEW FILE BLOCK OR UPDATE AN EXISTING one 
		if(this.props.isNewFile){
			//NEW FILE, UPLOAD DATA ON DB
			this.props.uploadFile(this.state).then(
				(res) => {
					console.log(this.state);
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound'); }
			);	
		}
		else{
			//FILE ALREADY EXISTS ON DB, UPDATE IT
			this.props.updateFileItem(this.state).then(
				(res) => {
					console.log(this.state);
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound');}
			);	
		}
	}

	doneClicked(e){	
		e.preventDefault();
		if(this.state.changed){
			this.props.uploadFile(this.state).then(
				(res) => {
					console.log(this.state);
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound');}
			);	
		}
	}
  	
  	newFileBlockDelete(e){
  		this.props.newFileDeleteClicked(this.props.id);
  	}

	onChange(e){
		e.preventDefault();
		if(!this.state.changed){
			this.setState({ changed: true, [e.target.name]: e.target.value });
		}
		else{
			this.setState({ [e.target.name]: e.target.value });
		}
		console.log(this.state);
	}

	toDisplayName(name){
		if(name === 'null'){
			return <p></p>;
		}
		return <span className="plain-background"><h5>{name}</h5></span>;
	}

	render(){
		const {
            isOpen, lightboxDisplay, imgBool
        } = this.state;
		//const type = this.props.file.type;
		//const fileName = path.basename(this.props.file.file_name);
		//const nonImg = this.toDisplayName(fileName);

		const nonImg = this.toDisplayName('upload');
	
		return(
			<div className="new-file-block-style">
				<div className="single-new-file-block" >
					{this.state.showTitle ? <div className="file-title-write-new"><input type='text' placeholder="Title" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /> </div> : ''}
					
					<div className="col-sm-12 file-image file-image-display" >
						{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.state.file_link } alt=""/> : nonImg}
					</div>
					{this.state.showCaption ? 
						<div className="file-abstract-write-new">
							<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='3'></textarea>
						</div> : '' 
					} 
						<div className="options-file-block"> 
							<button className="other-file"> keywords </button>
							<button className="other-file other-btn-d" onClick={this.deleteClicked}>  |  Delete </button>
							{this.state.showCaption ? 
								<button className="other-file other-btn-w" onClick={this.toggleCaption}> |  Remove Caption </button> :
								<button className="other-file other-btn-w" onClick={this.toggleCaption}> |  Caption </button> 
							}
							{this.state.showTitle ? 
								<button className="other-file other-btn-w" onClick={this.toggleTitle} > Remove Title </button> :
								<button className="other-file other-btn-w" onClick={this.toggleTitle} >Title </button>
							}
						</div>
					
						<hr className="hr-display"/>

					{isOpen ? lightboxDisplay : ''}
				</div>
			</div>
		);
	}
}
NewFileBlock.propTypes = {
	file: React.PropTypes.object,
	newFileDeleteClicked: React.PropTypes.func,
	uploadDocumentToS3: React.PropTypes.func.isRequired,
	uploadFile: React.PropTypes.func.isRequired,
	signedUrlForS3Doc: React.PropTypes.func.isRequired,
	isNewFile: React.PropTypes.bool.isRequired,
	deleteDocument: React.PropTypes.func.isRequired,
	deleteFile: React.PropTypes.func.isRequired,
	existingFileDelete: React.PropTypes.func,
	updateFiles: React.PropTypes.bool.isRequired
}
//updateFileItem: React.PropTypes.func,
//fileChanged: React.PropTypes.func

NewFileBlock.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {uploadFile, uploadDocumentToS3, updateFileItem, deleteDocument, deleteFile, signedUrlForS3Doc})(NewFileBlock);
/*
<div className="single-new-file container-fluid" >
					<div className="file-title-write"><input type='text' placeholder="Title*" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /></div>
					<div className="col-sm-12 file-image" >
						{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
					</div>
					<div className="file-abstract-input">
						<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='5'></textarea>
					</div>
					<div className="row file-btns">
						<button className="btn delete-file-btn" onClick={this.newFileBlockDelete}>Delete File Block</button>
						<button className="btn upload-media-btn">Upload Additional Media</button>
						<button className="btn done-file-btn" disabled={!this.state.changed} onClick={this.doneClicked}> Done </button>
					</div>
					{isOpen ? lightboxDisplay : ''}
					
				</div>
				*/