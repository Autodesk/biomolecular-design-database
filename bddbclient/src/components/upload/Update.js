import React from 'react';
import './upload.css';
import { getFilesObject, updateProject } from '../../actions/detailsAction';
import { connect } from 'react-redux';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import update from 'react-addons-update';
import { getSingleProject } from '../../actions/homePageActions';
import WritePageUpdate from './WritePageUpdate';
import { addFlashMessage } from '../../actions/flashMessages';
import {uploadProject, updateAssociatedField, deleteProject} from '../../actions/profileActions';
import {copyFiles} from '../../actions/fileActions';

function validateInput(data) {
	let errors= {};
	if(Validator.isNull(data.authors)){
		errors.authors = 'Author name is required';
	}
	if(Validator.isNull(data.keywords)){
		errors.keywords = 'Keywords are required';
	}
	if(Validator.isNull(data.usageRights)){
		errors.usageRights = 'Usage rights information is required';
	}
	if(Validator.isNull(data.contactEmail)){
		errors.email = 'Email is required';
	}
	if(Validator.isNull(data.projectTitle)){
		errors.projectTitle = 'Project Title required';
	}
	if(Validator.isNull(data.projectAbstract)){
		errors.projectAbstract = 'Project Detail is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};	
}

class Update extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			project: {},
			projectAssigned: false,
			files: [],
			user_id: 0,
			id: 0,
			published: false,
			authors: '',
			version: '',
			publication: '',
			keywords: '',
			usageRights: '',
			contactLinkedin: '',
			contactFacebook: '',
			contactEmail: '',
			contactHomepage: '',
			projectTitle: '',
			projectAbstract: '',
			headerImageLink: '',
			headerImageLinkOnS3: '',
			heroImageLink: '',
			heroImageLinkOnS3: '',
			changed: false,
			errors: {},
			ascProjectId: '',
			updateFiles: false,
			associatedProject: '',
			updatePublishedFiles: true,
			onClickData: {},
			btnClicked: false
		}
		this.onChange = this.onChange.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.fileChanged = this.fileChanged.bind(this);
		this.changePublished = this.changePublished.bind(this);
		this.deleteFileClicked = this.deleteFileClicked.bind(this);
		this.getIndex = this.getIndex.bind(this);
		this.assignValues = this.assignValues.bind(this);
		this.publishClicked = this.publishClicked.bind(this);
		this.changeHeaderLink = this.changeHeaderLink.bind(this);
		this.changeHeroLink = this.changeHeroLink.bind(this);
		this.saveDraftClicked = this.saveDraftClicked.bind(this);
		this.isValid = this.isValid.bind(this);
		this.updateProject = this.updateProject.bind(this);
		this.checkForNull = this.checkForNull.bind(this);
	}

	changeHeaderLink(headerLinkS3){
		this.setState({headerImageLinkOnS3: headerLinkS3, changed: true});
	}

	changeHeroLink(headerLinkS3){
		this.setState({heroImageLinkOnS3: headerLinkS3, changed: true});
	}

	componentWillMount(){
		var _projectId = null;
		if(this.props.params.projectId){
			_projectId = this.props.params.projectId 
			var queryString = 'projectId='+this.props.params.projectId;
			this.props.getSingleProject(queryString).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					var projectOwnerId = response.data.user_id;
					var userId = this.props.auth.user.id;
					if(projectOwnerId === userId){
						this.setState({ projectAssigned: true, project: response.data}, this.assignValues );
					}
					else{
						this.props.addFlashMessage({
							type: 'error',
							text: 'You do not have the authority to update this project.'
						});
						this.context.router.push('/'); //redirect to login page 
					}
				},
				(err) => { 
					this.context.router.push('/serverError');
				}
			);
		}
	}

	updateProject(){
		this.props.updateProject(this.state).then(
			(res) => {
				this.setState({updateFiles: true, btnClicked: true});
			},
			(err) => { this.context.router.push('/notfound');}
		)
	}

	publishClicked(){
		if(this.state.published){
			if(this.isValid()){
				this.setState({ errors: {}, updateFiles: true, published: true }, this.updateProject);
				setTimeout(() => {
					this.props.addFlashMessage({
						type: 'success',
						text: this.state.projectTitle+': successfully saved & Published.'
					});
					this.context.router.push('/profile'); //redirect to login page 
				}, 1300)
			}
		}
		else{
			if(this.state.associatedProject){
				//NOT A PUBLISHED, DRAFT
				//1. IF ASSOCIATED PUBLISHED PROJECT EXISTS, PROMPT to overwrite
				//2. ON OVERWRITE, 

				//this.setState({ published: true, associatedProject: this.state.id }, this.createNewAssociatedProject);
				if(this.isValid()){
					//DRAFT PROJECT, PUBLISHED cLicked, 
					//ASSOCIATED PROJECT EXISTS

					this.setState({ errors: {}, associatedProject: null, published: true }, this.updateProject);
					//AFTER UPDATING THE PUBLISHED VERSION, GET RID OF THE DRAFT
					//DELETE PUBLISHED VERSION
					const deleteProject = this.state.ascProjectId;
					var queryString = "project_id="+deleteProject;
					this.props.deleteProject(queryString).then(
						(res) => {
							var response = JSON.parse(res.request.response);
							this.setState({ deleteResponse: response});
						}, (err) => { 
								this.setState({error: true});
						}
					)

					setTimeout(() => {
						this.props.addFlashMessage({
							type: 'success',
							text: this.state.projectTitle+': successfully saved & published.'
						});
			  			this.context.router.push('/profile');
					}, 1100)
				}
			}
			else{
				//A DRAFT, PUBLISH CLICKED, SIMPLY PUBLISH THE DRAFT
				if(this.isValid()){
					//DRAFT PROJECT, PUBLISHED cLicked, 
					//ASSOCIATED PROJECT EXISTS
				
					this.setState({errors: {}, published: true, associatedProject: null }, this.updateProject);
			
					setTimeout(() => {
						this.props.addFlashMessage({
							type: 'success',
							text: this.state.projectTitle+': successfully saved & published.'
						});
			  			this.context.router.push('/profile');
					}, 1100)
				}
			}
		}
	}

	createNewAssociatedProject(){
		this.props.uploadProject(this.state).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				var data = {
					id: this.state.id,
					associatedProject: response.project_id
				}
				//response.project_id is the associated draft's id
				this.props.updateAssociatedField(data).then(
					(res) => {
						setTimeout(() => {
							this.props.addFlashMessage({
								type: 'success',
								text: this.state.projectTitle+': successfully saved as a draft.'
							});
				  			this.context.router.push('/profile');
						}, 1100)
					},
					(err) => {
						this.context.router.push('/notfound');
					}
				)
				//UPDATE FILES
				this.setState({id: response.project_id, ascProjectId: response.project_id, updatePublishedFiles:false, published: false }, this.updateProject);
				
				//COPY ALL FILES OBJECT ON THE DATABSE WITH PROJECT OWNER (associated project id)
				//var linkUrl = '/update/'+response.project_id;
				//this.context.router.push(linkUrl);
			}, (err) => {
				this.context.router.push('/notfound');
			}
		);
	}

	saveDraftClicked(){
		if(this.state.published){ //project is published and there does not exist a draft
								  //if Draft Exists, associatedProject's value must be its id
			//CREATE a New DRAFT

			if(this.state.associatedProject){
				this.setState({id: this.state.ascProjectId, associatedProject: this.state.id, updatePublishedFiles:false, published: false }, this.updateProject);
				setTimeout(() => {
					this.props.addFlashMessage({
						type: 'success',
						text: this.state.projectTitle+': successfully saved as a draft.'
					});
		  			this.context.router.push('/profile');
				}, 1100)
			}

			else{
				// 1. Create a new Draft Project
				// 2. set its associated project to be this id
				// 3. Set this.state.associatedProjec = the drafts id
				this.setState({ published: false, associatedProject: this.state.id }, this.createNewAssociatedProject);
			}
		}
		else if(!this.state.published){
			this.setState({ published: false }, this.updateProject);
			setTimeout(() => {
				this.props.addFlashMessage({
					type: 'success',
					text: this.state.projectTitle+': successfully saved as a draft.'
				});
	  			this.context.router.push('/profile');
			}, 1100)
		}

/*
		this.setState({ published: false }, this.updateProject);
		setTimeout(() => {
			this.props.addFlashMessage({
				type: 'success',
				text: this.state.projectTitle+': successfully saved as a draft.'
			});
  			this.context.router.push('/profile');
		}, 1100)
*/
	}

	checkForNull(){
		if(this.state.project.contact_email === null){
			this.setState({ contactEmail: '' });
		}
		if(this.state.project.user_rights === null){
			this.setState({ usageRights : '' })
		}
		if(this.state.project.project_abstract === null){
			this.setState({ projectAbstract : '' })
		}
		if(this.state.project.name === null){
			this.setState({ projectTitle : '' })
		}
	}
	
	assignValues(e){
		if(this.state.projectAssigned){
			var filesQuery = 'projectId='+this.state.project.id;
			var _published;
			if(this.state.project.published === 'true') _published = true;
			else{ _published = false; }
			this.setState({
				id: this.state.project.id,
				published: _published,
				user_id: this.state.project.user_id,
				authors: this.state.project.authors.toString(),
				version: this.state.project.version,
				publication: this.state.project.publication,
				keywords: this.state.project.keywords.toString(),
				contactEmail: this.state.project.contact_email,
				contactLinkedin: this.state.project.contact_linkedin,
				contactFacebook: this.state.project.contact_facebook,
				contactHomepage: this.state.project.contact_homepage,
				usageRights: this.state.project.user_rights,
				projectTitle: this.state.project.name,
				projectAbstract: this.state.project.project_abstract,
				headerImageLink: this.state.project.header_image_link,
				ascProjectId: this.state.project.associated_project,
				heroImageLink: this.state.project.hero_image,
				headerImageLinkOnS3: this.state.project.headerImageLinkOnS3,
				heroImageLinkOnS3: this.state.project.heroImageLinkOnS3,
				associatedProject: this.state.project.associated_project
			}, this.checkForNull);
	
			this.props.getFilesObject(filesQuery).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState( { files: response.data}); //change the current state. this will render 
				},
				(err) => { this.context.router.push('/notfound');}
			);
		}
	}

	getIndex(fileId){
		var len=this.state.files.length;
		var index = -1;
		for(var i = 0; i < len; i++){
			if(this.state.files[i].id === fileId){
				index=i;
			}
		}
		return index;
	}

	deleteFileClicked(fileId){
		const index = this.getIndex(fileId);
		if(index >= 0) this.setState({ files: update(this.state.files, {$splice: [[index, 1]]}) });
	}

	isValid() {
		const data = {
			authors: this.state.authors,
			keywords: this.state.keywords,
			contactEmail: this.state.contactEmail,
			projectTitle: this.state.projectTitle,
			usageRights: this.state.usageRights,
			projectAbstract: this.state.projectAbstract
		}
		const { errors, isValid } = validateInput(data);
		if(!isValid){
			this.props.addFlashMessage({
				type: 'error',
				text: ' Please fille in all required fields.'
			});
			this.setState({errors});
		}
		return isValid;
	}

	fileChanged(e){
		this.setState({ changed: true });
	}

	changePublished(_published){
		this.setState({ published: !this.state.published, changed: true });
		
	}

	onChange(e){
		if(this.state.changed)	this.setState({ [e.target.name]: e.target.value });
		else this.setState({changed: true, [e.target.name]: e.target.value });
	}

	deactivateModal(){
		if(!this.props.newProject){ //existing project
			if(this.isValid()){
				if(this.props.closeBool) {
					this.props.closeWrite();
				}
				if(this.state.changed){ //if the project details are changed, update in the database
					this.setState({ errors: {}, modalActive: false, isLoading: true });
					this.props.updateProject(this.state).then(
						(res) => {
							if(this.state.changed) 	window.location.reload(true);
						},
						(err) => { this.context.router.push('/notfound');}
					);
				}
			}
		}
		else{ //new Project 
			if(!this.state.changed){
				this.setState({modalActive: false});
				this.props.closeWrite();
			}
			else{
				//data changed, Create a new project and save in the Database
				if(this.isValid()){
					if(this.props.closeBool) {
						this.props.closeWrite();
					}
					this.setState({ errors: {}, modalActive: false, isLoading: true });
				}
			}
		}
	}

	render(){
		return(
			<div>
				<WritePageUpdate deleteClicked={this.deleteFileClicked} ascProjectId={this.state.ascProjectId} publishClicked={this.publishClicked} errors={this.state.errors} onChange={this.onChange} files={this.state.files} authors={this.state.authors} version={this.state.version} 
						publication={this.state.publication} published={this.state.published} changePublished={this.changePublished} fileChanged={this.fileChanged} heroImage={this.state.heroImageLink} 
						contactLinkedin={this.state.contactLinkedin} headerImageLinkOnS3={this.state.headerImageLinkOnS3} changeHeroLink={this.changeHeroLink} changeHeaderLink={this.changeHeaderLink} contactFacebook={this.state.contactFacebook} id={this.state.id}
						contactEmail={this.state.contactEmail} updatePublishedFiles={this.state.updatePublishedFiles} updateFiles={this.state.updateFiles} contactHomepage={this.state.contactHomepage} keywords={this.state.keywords} usageRights={this.state.usageRights}
						projectTitle={this.state.projectTitle} btnClicked={this.state.btnClicked} saveDraftClicked={this.saveDraftClicked} projectAbstract={this.state.projectAbstract} headerImageLink={this.state.headerImageLink}
					/>
			</div>
		);
	}
}

Update.propTypes = {
	closeWrite: React.PropTypes.func,
	project: React.PropTypes.object,
	getFilesObject: React.PropTypes.func.isRequired,
	updateProject: React.PropTypes.func.isRequired,
	getSingleProject: React.PropTypes.func.isRequired,
	newProject: React.PropTypes.bool,
	addFlashMessage: React.PropTypes.func.isRequired,
	uploadProject: React.PropTypes.func.isRequired,
	updateAssociatedField: React.PropTypes.func.isRequired,
	copyFiles: React.PropTypes.func.isRequired,
	deleteProject: React.PropTypes.func.isRequired
}

Update.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {getFilesObject, getSingleProject,deleteProject,  updateAssociatedField, addFlashMessage, copyFiles, updateProject, uploadProject})(Update);
