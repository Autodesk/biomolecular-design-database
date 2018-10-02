import React from 'react';
import Modal from 'react-modal';
import './upload.css';
import WritePage from './WritePage.js';
import { getFilesObject, updateProject } from '../../actions/detailsAction';
import { connect } from 'react-redux';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import update from 'react-addons-update';

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

class UpoloadNew extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalActive: true,
			files: [],
			id: 0,
			published: '',
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
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.fileChanged = this.fileChanged.bind(this);
		this.changePublished = this.changePublished.bind(this);
		this.deleteClicked = this.deleteClicked.bind(this);
		this.getIndex = this.getIndex.bind(this);
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

	deleteClicked(fileId){
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

	componentWillMount(){
		if(this.props.project){
			var filesQuery = 'projectId='+this.props.project.id;
			var _published;
			if(this.props.project.published === 'true') _published = true;
			else{ _published = false; }
			this.setState({
				id: this.props.project.id,
				published: _published,
				authors: this.props.project.authors.toString(),
				version: this.props.project.version,
				publication: this.props.project.publication,
				keywords: this.props.project.keywords.toString(),
				usageRights: this.props.project.user_rights,
				contactLinkedin: this.props.project.contact_linkedin,
				contactFacebook: this.props.project.contact_facebook,
				contactEmail: this.props.project.contact_email,
				contactHomepage: this.props.project.contact_homepage,
				projectTitle: this.props.project.name,
				projectAbstract: this.props.project.project_abstract,
				headerImageLink: this.props.project.header_image_link,
				heroImageLink: this.props.project.hero_image
			});
			this.props.getFilesObject(filesQuery).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState( { files: response.data} ); //change the current state. this will render 
				},
				(err) => { this.context.router.push('/notfound');}
			);
		}
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
	activateModal(){
		this.setState({ modalActive: true });
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
		const customStyles = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.85)',
		    padding			  : '0px',
		    paddingRight	  : '52px',
		    paddingLeft		  : '52px',
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
		    maxWidth 				: '1360px',
		    border                  : 'none',
		    background              : 'transparent',
		    outline                 : 'none',
		    overflow                : 'auto'
		  }
		};

		const modal = <Modal
				isOpen={this.state.modalActive}
				onAfterOpen={this.activateModal}
				onRequestClose={this.deactivateModal}
				style={customStyles}
				contentLabel="Modal Open">
					<WritePage deactivateModal={this.deactivateModal} deleteClicked={this.deleteClicked} errors={this.state.errors} onChange={this.onChange} files={this.state.files} authors={this.state.authors} version={this.state.version} 
						publication={this.state.publication} published={this.state.published} changePublished={this.changePublished} fileChanged={this.fileChanged} heroImage={this.state.heroImageLink} 
						contactLinkedin={this.state.contactLinkedin} contactFacebook={this.state.contactFacebook} id={this.state.id}
						contactEmail={this.state.contactEmail} contactHomepage={this.state.contactHomepage} keywords={this.state.keywords} usageRights={this.state.usageRights}
						projectTitle={this.state.projectTitle} projectAbstract={this.state.projectAbstract} headerImageLink={this.state.headerImageLink}
					/>
				</Modal>

		return(
			<div>
				{modal}
			</div>
		);
	}
}

UpoloadNew.propTypes = {
	closeWrite: React.PropTypes.func,
	closeBool: React.PropTypes.bool,
	project: React.PropTypes.object,
	getFilesObject: React.PropTypes.func.isRequired,
	updateProject: React.PropTypes.func.isRequired,
	newProject: React.PropTypes.bool
}

UpoloadNew.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {getFilesObject, updateProject})(UpoloadNew);
