import React from 'react';
import Lightbox from 'react-image-lightbox';
import { uploadFile } from '../../../actions/fileActions';
import { connect } from 'react-redux';
import { updateFileItem } from '../../../actions/detailsAction';
import { uploadDocumentToS3, signedUrlForS3Doc, deleteDocument, deleteFile } from '../../../actions/fileActions';
import mime from 'mime-types';
import uuidv1 from 'uuid/v1';
import path from 'path';
//import update from 'react-addons-update';
import Check from '../../../../public/Assets/icons/Check.svg';
//import Dropdown, { DropdownTrigger, DropdownContent } from'react-simple-dropdown';

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
            file_name: '',
            tags: '',
            changed: false,
            project_id: 0,
            user_id: 0,
            imgBool: false,
            newFileBlock: false,
            showTitle: false,   
            showCaption: false,
            videoLink: '',
            video: false,
			keywordsDisplay: false,
			keywordsArray: [],
			keywordsObject: {"Design": [], "Experiment": [], "Simulation": []}
		}
		this.onChange = this.onChange.bind(this);
		this.doneClicked = this.doneClicked.bind(this);
		this.newFileBlockDelete = this.newFileBlockDelete.bind(this);
		this.deleteClicked = this.deleteClicked.bind(this);
		this.saveUpdateFile = this.saveUpdateFile.bind(this);
		this.toggleTitle = this.toggleTitle.bind(this);
		this.toggleCaption = this.toggleCaption.bind(this);
		this.keywordsSelected = this.keywordsSelected.bind(this);
		this.getIndexDesign = this.getIndexDesign.bind(this);
		this.getIndexExperiment = this.getIndexExperiment.bind(this);
		this.getIndexSimulation = this.getIndexSimulation.bind(this);
		this.updateOnDb = this.updateOnDb.bind(this);
		this.uploadOnDb = this.uploadOnDb.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.btnClicked && nextProps.updateFiles){
			if(nextProps.uploadAll){
				console.log('Uploading All Files');
				console.log(this.props.ascProjectId);
				this.setState({project_id: this.props.ascProjectId, tags: JSON.stringify(this.state.keywordsObject)}, this.uploadOnDb);
			}
			else if(nextProps.updateFiles){
				console.log('Saving Files');
				this.saveUpdateFile();
			}
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
		if(this.state.file_path_s3){
			var queryPath = 'pathOnS3='+this.state.file_path_s3;
			this.props.deleteDocument(queryPath).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					console.log(response);
				}, 
				(err) => { 
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
		//console.log(this.props.file);
		this.setState({ newFileBlock: this.props.isNewFile, project_id: this.props.file.project_id, userId: this.props.file.user_id });
		if(this.props.file.file){
			//THERE IS A FILE TO UPLOAD ON S3
			console.log('mounting files');
			var _imgBool = false;
			var file = this.props.file.file;
			var _saveLink = 'allFiles/'+this.props.file.user_id+'/'+this.props.file.project_id+'/'+uuidv1()+'/'+this.props.file.file.name;
			this.props.uploadDocumentToS3({file, saveLink: _saveLink}).then(
					(res) => { 
						var response = JSON.parse(res.request.response);
						var queryString = 'saveLink='+response.saveLink;
						this.props.signedUrlForS3Doc(queryString).then(
							(res) => {
								var response = JSON.parse(res.request.response);
								this.setState({ file_link: response.signedUrl, file_name: response.file_name, file_path_s3: _saveLink});
							}, 
							(err) => { 
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
				file_name: this.props.file.file_name,
				file_link: this.props.file.file_link,
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
		}
		if(this.props.file.video){
			this.setState({ video: true, videoLink: this.props.file.videoLink});
		}
		if(!this.props.isNewFile){
			this.setState({ id: this.props.file.id });
		}
		if(this.props.file.tags !== ''){
			var _keywordsObject = JSON.parse(this.props.file.tags);
			this.setState({keywordsObject:_keywordsObject});
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
	
	uploadOnDb(){
		console.log(this.state.tags);
		this.props.uploadFile(this.state).then(
				(res) => {
					console.log(this.state);
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound'); }
			);
	}
	updateOnDb(){
		console.log(this.state.tags);
		this.props.updateFileItem(this.state).then(
				(res) => {
					this.setState({ changed: false });
				},
				(err) => { this.context.router.push('/notfound');}
			);	
	}
	saveUpdateFile(){
		//SAVE A NEW FILE BLOCK OR UPDATE AN EXISTING one
		if(this.props.isNewFile){
			//NEW FILE, UPLOAD DATA ON DB
			console.log('this is new file ');
			this.setState({ tags: JSON.stringify(this.state.keywordsObject)}, this.uploadOnDb);	
		}
		else{
			console.log('else block');
			//FILE ALREADY EXISTS ON DB, UPDATE IT
			this.setState({ tags: JSON.stringify(this.state.keywordsObject)}, this.updateOnDb);
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
	}

	toDisplayName(){
		if(this.state.file_name === ''){
			return <p></p>;
		}
		else{
			var nameFile = this.state.file_name;
			var baseName = path.basename(nameFile, path.extname(nameFile));
			/* if(nameFile.length > 37){
				baseName = path.basename(nameFile, path.extname(nameFile)).slice(38, nameFile.length);
			}
			else{
				baseName = path.basename(nameFile, path.extname(nameFile));
			}*/
			var extName = path.extname(this.state.file_name);
			return <span className="plain-background"><h5>{baseName}<br/> ({extName} file)</h5></span>;
		}
	}
	getIndexDesign(name){
		var len=this.state.keywordsObject.Design.length;
		var index = -1;
		for(var i = 0; i < len; i++){
			if(this.state.keywordsObject.Design[i] === name){
				index=i;
			}
		}
		return index;
	}
	getIndexExperiment(name){
		var len=this.state.keywordsObject.Experiment.length;
		var index = -1;
		for(var i = 0; i < len; i++){
			if(this.state.keywordsObject.Experiment[i] === name){
				index=i;
			}
		}
		return index;
	}
	getIndexSimulation(name){
		var len=this.state.keywordsObject.Simulation.length;
		var index = -1;
		for(var i = 0; i < len; i++){
			if(this.state.keywordsObject.Simulation[i] === name){
				index=i;
			}
		}
		console.log("simnulation" + index);
		return index;
	}



	keywordsSelected(e){
		e.preventDefault();
		console.log(e.target.name);
		const keywordName = e.target.name;
		var _index = -1;
		if(keywordName.indexOf("Design") > -1){
			console.log('here');
			var keywordD = keywordName.slice(8, keywordName.length);
			const index = this.getIndexDesign(keywordD);
			_index = index;
			if(index >= 0) {
				console.log(index);
				var arrayD = this.state.keywordsObject.Design;
				arrayD.splice(index, 1);
				console.log(arrayD);
				var _keywordsObjectD = this.state.keywordsObject;
				_keywordsObjectD.Design = arrayD;
				this.setState({ keywordsObject: _keywordsObjectD});
				return;
			}
		}
		if(keywordName.indexOf("Experiment") -1){
			var keywordE = keywordName.slice(12, keywordName.length);
			const index = this.getIndexExperiment(keywordE);
			_index = index;
			if(index >= 0) {
				var arrayE = this.state.keywordsObject.Experiment;
				arrayE.splice(index, 1);
				var _keywordsObjectE = this.state.keywordsObject;
				_keywordsObjectE.Experiment = arrayE;
				this.setState({ keywordsObject: _keywordsObjectE});
				return;
			}
		}
		if(keywordName.indexOf("Simulation") > -1){
			console.log("entered simulation");
			var keywordS = keywordName.slice(12, keywordName.length);
			const index = this.getIndexSimulation(keywordS);
			_index = index;
			console.log("found.  "+ index);
			if(index >= 0) {
				var arrayS = this.state.keywordsObject.Simulation;
				arrayS.splice(index, 1);
				var _keywordsObjectS = this.state.keywordsObject;
				_keywordsObjectS.Simulation = arrayS;
				this.setState({ keywordsObject: _keywordsObjectS});
				return;
			}
		}
		
		if(_index === -1){
			//Add to the Keywords Object
			// keywordsObject = { "Design": [],
			//					  "Experiment": [],
			//					  "Simulation": [] }
			console.log(this.state.keywordsObject);
			var _keywordsObject = this.state.keywordsObject;
			if(keywordName.indexOf("Design") > -1){ 
				var keywordD1 = keywordName.slice(8, keywordName.length);
				_keywordsObject.Design.push(keywordD1);
			}
			else if(keywordName.indexOf("Experiment") > -1){ 
				var keywordE1 = keywordName.slice(12, keywordName.length);
				_keywordsObject.Experiment.push(keywordE1);
			}
			else if(keywordName.indexOf("Simulation") > -1){ 
				var keywordS1 = keywordName.slice(12, keywordName.length);
				_keywordsObject.Simulation.push(keywordS1);
			}
			console.log(_keywordsObject);
			//console.log(this.state.keywordsArray.toString());
			//var _newKeywordsArray = this.state.keywordsArray;
			//_newKeywordsArray.push(keywordName);
			this.setState({ keywordsObject: _keywordsObject});
			return;
		}
	}

	render(){

		const {
            isOpen, lightboxDisplay, imgBool
        } = this.state;
        const displayDesignKeywords = this.state.keywordsObject.Design ? this.state.keywordsObject.Design.toString() : '';
        const displayExperimentKeywords = this.state.keywordsObject.Experiment ? this.state.keywordsObject.Experiment.toString() : '';
        const displaySimulationKeywords = this.state.keywordsObject.Simulation ? this.state.keywordsObject.Simulation.toString() : '';
        const keywordsBlock = (
        	<div className="keywords-box">
			  	<div>
			    	<div className="left-keywords">
			    		<div className="left-left">
			    			<h5>DESIGN</h5>
			    			<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Introduction") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''} <button name="Design: Introduction" onClick={this.keywordsSelected}>Introduction</button></div>
			   	 			<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Description") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Description" onClick={this.keywordsSelected}>Description</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Protocol") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Protocol" onClick={this.keywordsSelected}>Protocol</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Design File") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Design File" onClick={this.keywordsSelected}>Design File</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Supporting Information") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Supporting Information" onClick={this.keywordsSelected}>Supporting Information</button></div>
				    		<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Strand Information") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Strand Information" onClick={this.keywordsSelected}>Strand Information</button></div>
				    		<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Materials") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Materials" onClick={this.keywordsSelected}>Materials</button></div>
				    		<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Software") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Software" onClick={this.keywordsSelected}>Software</button></div>
				    		<div className="keyword-row">{this.state.keywordsObject.Design.indexOf("Other") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Design: Other" onClick={this.keywordsSelected}>Other</button></div>
				    	</div>
			    		<div className="middle-keywords">
			    			<h5>Experiment</h5>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("Gel") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: Gel" onClick={this.keywordsSelected}>Gel</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("AFM") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: AFM" onClick={this.keywordsSelected}>AFM</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("TEM") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: TEM" onClick={this.keywordsSelected}>TEM</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("Cryo-EM") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: Cryo-EM" onClick={this.keywordsSelected}>Cryo-EM</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("Spectrofluorimeter") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: Spectrofluorimeter" onClick={this.keywordsSelected}>Spectrofluorimeter</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("Data") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: Data" onClick={this.keywordsSelected}>Data</button></div>
			    			<div className="keyword-row">{this.state.keywordsObject.Experiment.indexOf("Other") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Experiment: Other" onClick={this.keywordsSelected}>Other</button></div>
			    		</div>
			    	</div>
			    	<div className="right-keywords">
			    		<h5>Simulation</h5>
			    		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("CanDo") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: CanDo" onClick={this.keywordsSelected}>CanDo</button></div>
			    		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("OxDNA") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: OxDNA" onClick={this.keywordsSelected}>OxDNA</button></div>
			    		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("Multistrand") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: Multistrand" onClick={this.keywordsSelected}>Multistrand</button></div>
			  	 		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("MD") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: MD" onClick={this.keywordsSelected}>MD</button></div>
			  	 		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("QM/MM") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: QM/MM" onClick={this.keywordsSelected}>QM/MM</button></div>
			  	 		<div className="keyword-row">{this.state.keywordsObject.Simulation.indexOf("Other") > -1 ? <img className="tick-keywords" src={Check} alt="tick icon"/> : ''}<button name="Simulation: Other" onClick={this.keywordsSelected}>Other</button></div>
			  	  	</div>
			   </div>
			</div>
		);
		//const type = this.props.file.type;
		//const fileName = path.basename(this.props.file.file_name);
		//const nonImg = this.toDisplayName(fileName);

		const nonImg = this.toDisplayName();
	
		return(
			<div className="new-file-block-style">
				<div className="single-new-file-block" >
					{this.state.showTitle ? <div className="file-title-write-new"><input type='text' placeholder="Title" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /> </div> : ''}
					
					<div className="col-sm-12 file-image file-image-display" >
						{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.state.file_link } alt=""/> : nonImg}
						{this.props.file.video ? <div className="youtube-link-style"><i><input type='text' placeholder="YOUTUBE LINK" onChange={this.onChange} value={this.state.videoLink} name="videoLink" /></i> </div> : ''}
					</div>
					
					{this.state.showCaption ? 
						<div className="file-abstract-write-new">
							<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='3'></textarea>
						</div> : '' 
					} 
						<div className="options-file-block"> 
							<div className="dropdown-div">
								<button className="other-file keywordsbtn" onClick={() => this.setState({ keywordsDisplay: !this.state.keywordsDisplay })} > 
									Keywords: 
										{displayDesignKeywords.length > 0 ? " Design: "+displayDesignKeywords : ''}
										{displayExperimentKeywords.length > 0 ? " | Experiment: "+displayExperimentKeywords : ''}
										{displaySimulationKeywords.length > 0 ? " | Simulation: "+displaySimulationKeywords: ''}
								</button>
								{this.state.keywordsDisplay ? keywordsBlock : ''}
							</div>
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
	updateFiles: React.PropTypes.bool.isRequired,
	updatePublishedFiles: React.PropTypes.bool.isRequired,
	ascProjectId: React.PropTypes.string,
	uploadAll: React.PropTypes.bool.isRequired
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