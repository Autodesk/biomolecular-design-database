import React from 'react';
import './upload.css';
import { getFilesObject, updateProject } from '../../actions/detailsAction';
import { connect } from 'react-redux';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import update from 'react-addons-update';
import { getSingleProject } from '../../actions/homePageActions';
import WritePageUpdate from './WritePageUpdate';

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
			changed: false,
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.fileChanged = this.fileChanged.bind(this);
		this.changePublished = this.changePublished.bind(this);
		this.deleteFileClicked = this.deleteFileClicked.bind(this);
		this.getIndex = this.getIndex.bind(this);
		this.assignValues = this.assignValues.bind(this);
	}

	componentWillMount(){
		var _projectId = null;
		if(this.props.params.projectId){
			_projectId = this.props.params.projectId 
			var queryString = 'projectId='+this.props.params.projectId;
			this.props.getSingleProject(queryString).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState({ projectAssigned: true, project: response.data}, this.assignValues );
				},
				(err) => { 
					this.context.router.push('/serverError');
				}
			);
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
				authors: this.state.project.authors.toString(),
				version: this.state.project.version,
				publication: this.state.project.publication,
				keywords: this.state.project.keywords.toString(),
				usageRights: this.state.project.user_rights,
				contactLinkedin: this.state.project.contact_linkedin,
				contactFacebook: this.state.project.contact_facebook,
				contactEmail: this.state.project.contact_email,
				contactHomepage: this.state.project.contact_homepage,
				projectTitle: this.state.project.name,
				projectAbstract: this.state.project.project_abstract,
				headerImageLink: this.state.project.header_image_link,
				heroImageLink: this.state.project.hero_image
			});
			this.props.getFilesObject(filesQuery).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState( { files: response.data}, console.log(this.state) ); //change the current state. this will render 
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
		this.setState({ files: update(this.state.files, {$splice: [[index, 1]]}) })
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({errors});
		}
		return isValid;
	}

	fileChanged(e){
		this.setState({ changed: true });
		console.log('file changed');
	}

	changePublished(_published){
		this.setState({ published: !this.state.published, changed: true }, console.log(this.state.published));
		
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
					console.log('upload to do');
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
				<WritePageUpdate deleteClicked={this.deleteFileClicked} errors={this.state.errors} onChange={this.onChange} files={this.state.files} authors={this.state.authors} version={this.state.version} 
						publication={this.state.publication} published={this.state.published} changePublished={this.changePublished} fileChanged={this.fileChanged} heroImage={this.state.heroImageLink} 
						contactLinkedin={this.state.contactLinkedin} contactFacebook={this.state.contactFacebook} id={this.state.id}
						contactEmail={this.state.contactEmail} contactHomepage={this.state.contactHomepage} keywords={this.state.keywords} usageRights={this.state.usageRights}
						projectTitle={this.state.projectTitle} projectAbstract={this.state.projectAbstract} headerImageLink={this.state.headerImageLink}
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
	newProject: React.PropTypes.bool
}

Update.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {getFilesObject, getSingleProject, updateProject})(Update);
