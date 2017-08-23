import React from 'react';
import '../home/Home.css';
import '../home/readProject/modal.css';
import '../home/readProject/modalQueries.css';
import { connect } from 'react-redux';
//import appreciation from '../../../public/Assets/icons/appreciations.svg';
//import views from '../../../public/Assets/icons/views.svg';
import ratingOff from '../../../public/Assets/icons/ratingOff.svg';
import ratingOn from '../../../public/Assets/icons/ratingOn.svg';
import noImg from '../../../public/Assets/no-img.jpg';
import Modal from 'react-modal';
import ReadProject from '../home/readProject/ReadProject';
import UploadNew from '../upload/UploadNew';
//import { Link } from 'react-router';
import PromptModal from './PromptModal/PromptModal';
import { getSingleProject } from '../../actions/homePageActions';
import { updateAssociatedField } from '../../actions/profileActions';


class ProjectItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			associatedProjectObj: {},
			modalActive: false,
			ascProjectModalActive: false,
			promptModalActive: false,
			deleteAlert: false,
			showCopied: false,
			openWrite: false,
			associatedDraftExists: false,
			onProfilePage: true,
			toDisplay: true,
			promptModalDiv: null
		}
		this.deleteClicked = this.deleteClicked.bind(this);
		this.toggleCopied = this.toggleCopied.bind(this);
		this.changeShowCopied = this.changeShowCopied.bind(this);
		this.onClick = this.onClick.bind(this);
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.activateAscModal = this.activateAscModal.bind(this);
		this.deactivateAscModal = this.deactivateAscModal.bind(this);
		this.activatePromptModal = this.activatePromptModal.bind(this);
		this.deactivatePromptModal = this.deactivatePromptModal.bind(this);
		this.activateDeleteAlert = this.activateDeleteAlert.bind(this);
		this.closeDeleteAlert = this.closeDeleteAlert.bind(this);
		this.editClicked = this.editClicked.bind(this);
		this.closeWrite = this.closeWrite.bind(this);
		this.associatedEditClicked = this.associatedEditClicked.bind(this);
		this.associatedPublishClicked = this.associatedPublishClicked.bind(this);
		this.associatedDeleteClicked = this.associatedDeleteClicked.bind(this);
		this.revertToDraftClicked = this.revertToDraftClicked.bind(this);
		this.revertToDraftClickedPrompt = this.revertToDraftClickedPrompt.bind(this);
		this.overwriteAsscPublished = this.overwriteAsscPublished.bind(this);
		this.deletePrompt = this.deletePrompt.bind(this);
		this.asscDeletePrompt = this.asscDeletePrompt.bind(this);
		this.publishDraft = this.publishDraft.bind(this);
	}

	
	getAssociatedDraft(projectId){
		var queryString = 'projectId='+projectId;
		this.props.getSingleProject(queryString).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState({ associatedProjectObj: response.data});
				},
				(err) => { 
					this.context.router.push('/serverError');
				}
			);
	}

	componentWillMount(){
		if(this.props.project && this.props.project.associated_project && this.props.project.published==='true'){
			this.setState({ associatedDraftExists: true }, this.getAssociatedDraft(this.props.project.associated_project));
		}
		else if(this.props.project && this.props.project.associated_project && this.props.project.published==='false'){
			this.setState({toDisplay: false});
		}
	}

	componentWillReceiveProps(nextProps){
		//console.log(nextProps.project);
		if(nextProps.project && nextProps.project.associated_project && nextProps.project.published==='true'){
			//console.log(nextProps.project);
			this.setState({ associatedDraftExists: true }, this.getAssociatedDraft(nextProps.project.associated_project));
		}
		else if(nextProps.project && nextProps.project.associated_project && nextProps.project.published==='false'){
			this.setState({toDisplay: false});
		}
	}

	closeWrite(){
		this.setState({openWrite : false});
	}
	
	editClicked(e){
		e.preventDefault();
		var linkUrl = '/update/'+this.props.project.id;
		this.context.router.push(linkUrl);
	
	}
	
	associatedEditClicked(e){ 
		e.preventDefault();
		var linkUrl = '/update/'+this.state.associatedProjectObj.id;
		this.context.router.push(linkUrl);
	}
	
	overwriteAsscPublished(){

		var queryString = "project_id="+this.props.project.id;	
		var data = {
			id: this.state.associatedProjectObj.id,
			associatedProject: null,
			published: true
		}

		this.props.updateAssociatedField(data).then(
			(res) => {
				this.deactivatePromptModal();
				this.props.onDeleteClick(queryString);
				setTimeout(() => {
		  			window.location.reload(true);
				}, 500)
			},
			(err) => {
				this.context.router.push('/notfound');
			}
		)
	}
	
	publishDraft(){ //DOESN'T HAVE an associated published/draft project
		var data = {
			id: this.props.project.id,
			associatedProject: null,
			published: true
		}

		this.props.updateAssociatedField(data).then(
			(res) => {
				this.deactivatePromptModal();
				setTimeout(() => {
			  		window.location.reload(true);
				}, 500)
			},
			(err) => {
				this.context.router.push('/notfound');
			}
		)
	}

	associatedPublishClicked(e){
		e.preventDefault();
		console.log('publish');
		var _message = "Overwrite existing project: "+this.props.project.name+'?';
		this.setState({promptModalDiv: <PromptModal deactivateModal={this.deactivatePromptModal} message={_message} leftBtn="Cancel" rightBtn="Overwrite" left={this.deactivatePromptModal} right={this.overwriteAsscPublished}/> }, this.activatePromptModal);
	}

	revertToDraftClicked(){
		var queryString = "project_id="+this.state.associatedProjectObj.id;
		
		var data = {
			id: this.props.project.id,
			associatedProject: null,
			published: false
		}

		this.props.updateAssociatedField(data).then(
			(res) => {
				this.deactivatePromptModal();
				this.props.onDeleteClick(queryString);
				setTimeout(() => {
		  			window.location.reload(true);
				}, 500)
			},
			(err) => {
				this.context.router.push('/notfound');
			}
		)
	}

	revertToDraftClickedPrompt(){
		if(this.state.associatedDraftExists){
			var _message = "A draft for this project already exists ("+this.state.associatedProjectObj.name+'). Overwrite?';
			this.setState({promptModalDiv: <PromptModal deactivateModal={this.deactivatePromptModal} message={_message} leftBtn="Cancel" rightBtn="Overwrite" left={this.deactivatePromptModal} right={this.revertToDraftClicked}/> }, this.activatePromptModal);
	
		}
		else{
			var data = {
				id: this.props.project.id,
				associatedProject: null,
				published: false
			}

			this.props.updateAssociatedField(data).then(
				(res) => {
					this.deactivatePromptModal();
					setTimeout(() => {
			  			window.location.reload(true);
					}, 500)
				},
				(err) => {
					this.context.router.push('/notfound');
				}
			)
		}
	}

	asscDeletePrompt(){
		var _message = "Delete? This can't be undone!";
		this.setState({promptModalDiv: <PromptModal deactivateModal={this.deactivatePromptModal} message={_message} leftBtn="Cancel" rightBtn="Yes, Delete" left={this.deactivatePromptModal} right={this.associatedDeleteClicked}/> }, this.activatePromptModal);
	}

	associatedDeleteClicked(e){
		e.preventDefault();
		console.log('assc delete clicked');
		var queryString = "project_id="+this.state.associatedProjectObj.id;
		this.props.onDeleteClick(queryString);
		var data = {
			id: this.props.project.id,
			associatedProject: null
		}
		this.props.updateAssociatedField(data).then(
			(res) => {
				this.deactivatePromptModal();
				setTimeout(() => {
		  			window.location.reload(true);
				}, 400)
			},
			(err) => {
				this.context.router.push('/notfound');
			}
		)
	}
	
	deletePrompt(){
		var _message = "Delete? This can't be undone!";
		this.setState({promptModalDiv: <PromptModal deactivateModal={this.deactivatePromptModal} message={_message} leftBtn="Cancel" rightBtn="Yes, Delete" left={this.deactivatePromptModal} right={this.deleteClicked}/> }, this.activatePromptModal);
	}

	deleteClicked(){
		console.log('deleteing');
		var queryString = "project_id="+this.props.project.id;
		this.props.onDeleteClick(queryString);
	}
	
	changeShowCopied(){
		this.setState({ showCopied :  false});
	}

	toggleCopied(){
		if(!this.state.showCopied){
			this.setState({ showCopied: true});
		}
		setTimeout(this.changeShowCopied, 6000);
	}

	activateModal(){
		this.setState({ modalActive: true });
	};

	deactivateModal(){
		this.setState({modalActive: false });
	};

	activateAscModal(){
		this.setState({ ascProjectModalActive: true });
	};

	deactivateAscModal(){
		this.setState({ascProjectModalActive: false });
	};

	activatePromptModal(){
		this.setState({ promptModalActive: true });
	};

	deactivatePromptModal(){
		this.setState({ promptModalActive: false });
	};

	activateDeleteAlert(){
		this.setState({ deleteAlert: true });
	}

	closeDeleteAlert(){
		this.setState({ deleteAlert: false });
	}

	onClick(e){
		e.preventDefault();
		console.log(e.target);
	};

	render(){
		//MODAL
		const customStyles = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.85)',
		    padding			  : '0px',
		    zIndex : 1050
		  },
		  content : {
		     position               : 'absolute',
		    top                     : '0px',
		    left                    : '0px',
		    right                   : '0px',
		    bottom 					: '0px',
		    paddingTop 			    : '2%',
		    paddingLeft				: '0px',
		    paddingRight 			: '0px',
		    marginBottom 			: '0px',
		    minHeight 				: '100%',
		    margin 					: 'auto',
		    maxWidth 				: '1350px',
		    border                  : 'none',
		    background              : 'transparent',
		    outline                 : 'none',
		    overflow                : 'auto'
		  }
		};

		//PROMPT MODAL
		const customStylesPrompt = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.80)',
		    padding			  : '0px',
		    zIndex 			  : 1050,
		    paddingBottom : '40%'
		  },
		  content : {
		    position                  : 'absolute',
		    top                        : '0px',
		    left                       : '35%',
		    right                      : '35%',
		    paddingTop 				   : '5%',
		    paddingLeft				   : '0px',
		    paddingRight 			   : '0px',
		    minHeight 				   : '100%',
		    margin 					   : 'auto',
		    border                     : 'none',
		    background                 : 'transparent',
		    outline                    : 'none',
		    overflow                   : 'auto'
		  }
		};

		//const editLink = "/update/"+this.props.project.id;
		
		const modal = <Modal
				isOpen={this.state.modalActive}
				onAfterOpen={this.activateModal}
				onRequestClose={this.deactivateModal}
				style={customStyles}
				contentLabel="Modal Open">
					<ReadProject project={this.props.project} onProfilePage={this.state.onProfilePage} deactivateModal={this.deactivateModal} />
				</Modal>
		const ascModal = <Modal
				isOpen={this.state.ascProjectModalActive}
				onAfterOpen={this.activateAscModal}
				onRequestClose={this.deactivateAscModal}
				style={customStyles}
				contentLabel="Modal Open">
					<ReadProject project={this.state.associatedProjectObj} onProfilePage={this.state.onProfilePage} deactivateModal={this.deactivateAscModal} />
				</Modal>
		const promptModal = <Modal
				isOpen={this.state.promptModalActive}
				onAfterOpen={this.activatePromptModal}
				onRequestClose={this.deactivatePromptModal}
				style={customStylesPrompt}
				contentLabel="Modal Open">
					{this.state.promptModalDiv}
				</Modal>
		
		const associatedDraftExists = this.state.associatedDraftExists;
		const qod = this.props.project.quality_of_documentation;
		//var counter = 0;
		//const authors = this.props.project.authors.map((author) => {
		//	counter++;
		//	if(counter === 1){ return author; }
		//	return ', '+author;
		//})
		var ticks = [];
		for(var i = 0; i < 5; i++){
			if( i < qod){
				ticks.push(<img className="ticks-style" src={ratingOn} alt="green tick"/>);
			}
			else{
				ticks.push(<img className="ticks-style" src={ratingOff} alt="grey tick"/>);
			}
		}

	return (
		<div>
		{this.state.toDisplay ? 
		<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout project-item-layout">
	      	<img className="img-responsive project-image profile-project-image" onClick={this.activateModal} src={this.props.project.header_image_link ? this.props.project.header_image_link : noImg } alt=""/>
	        <h4 className="project-item-title project-item-title-profile" onClick={this.activateModal}>{this.props.project.name}</h4>
	    	{this.props.project.published === 'true' ? <p className="published-project">Published</p> : <p className="draft-project">Draft</p>}
	    	<div className="project-edit-options">
	    		<button className="button edit-btn-profile" onClick={this.editClicked} > Edit</button>
	    		{this.props.project.published === 'true' ? 
	    			<button className="button edit-btn-profile" onClick={this.revertToDraftClickedPrompt}> Revert to Draft</button> : 
	    			<div> 
	    				<button className="button edit-btn-profile" onClick={this.publishDraft}> Publish</button>
	    				<button className="button edit-btn-profile" onClick={this.deletePrompt}> Delete</button>
	    			</div>
	    		}
	    	</div>
	    	{associatedDraftExists ? 
	    		<div className="draft-display">
	    			<hr/>
	    			<h4 className="project-item-title project-item-title-profile" onClick={this.activateAscModal}>{this.state.associatedProjectObj.name}</h4>
	    			<p className="draft-project">Draft</p>
	    			<div className="project-edit-options">
			    		<button className="button edit-btn-profile" onClick={this.associatedEditClicked} > Edit</button>
			    		<div> 
			    			<button className="button edit-btn-profile" onClick={this.associatedPublishClicked}> Publish</button>
			   				<button className="button edit-btn-profile" onClick={this.asscDeletePrompt}> Delete</button>
			   			</div>
			    	</div>
	    		</div> : '' }
	    	{modal}
	    	{promptModal}
	    	{ascModal}
	    	{this.state.openWrite ? <UploadNew closeWrite={this.closeWrite} newProject={false} closeBool={true} project={this.props.project} /> : ''}
	    </div> : '' }
	    
	    </div>
	);
}
}

ProjectItem.propTypes = {
	project: React.PropTypes.object.isRequired,
	onDeleteClick: React.PropTypes.func.isRequired,
	getSingleProject: React.PropTypes.func.isRequired,
	updateAssociatedField: React.PropTypes.func.isRequired
}

ProjectItem.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {getSingleProject, updateAssociatedField})(ProjectItem);

/*
<p className="authors-styling">{authors}</p>
	        <hr/>
	        <div className="tick-stat row">
		        <div className="tick">
			        {ticks[0]}
			        {ticks[1]}
			        {ticks[2]}
			        {ticks[3]}
			        {ticks[4]}
		        </div>
	    	    <div className="stats"> 
		  	       	<img src={appreciation} alt="appreciations"/><strong className="likes-style"> {this.props.project.likes} </strong>
		           	<img className="views-style" src={views} alt="views"/><strong className="likes-style"> {this.props.project.views}</strong>
	            </div>
	            */