import React from 'react';
import Modal from 'react-modal';
import './upload.css';
import WritePage from './WritePage.js';
import { getFilesObject, updateProject } from '../../actions/detailsAction';
import { connect } from 'react-redux';

class UpoloadNew extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalActive: true,
			files: [],
			id: 0,
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
			changed: false
		}
		this.onChange = this.onChange.bind(this);
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.saveData = this.saveData.bind(this);
	}
	componentWillMount(){
		if(this.props.project){
			var filesQuery = 'projectId='+this.props.project.id;
			this.setState({
				id: this.props.project.id,
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
	saveData(e){
		e.preventDefault();
		console.log('calling put req to update project');
		this.props.updateProject(this.state).then(
				(res) => {
					window.location.reload(true);
				},
				(err) => { this.context.router.push('/notfound');}
			);
	}
	onChange(e){
		if(this.state.changed)	this.setState({ [e.target.name]: e.target.value });
		else this.setState({changed: true, [e.target.name]: e.target.value });
	}
	activateModal(){
		this.setState({ modalActive: true });
	}

	deactivateModal(){
		this.setState({ modalActive: false });
		if(this.props.closeBool) {
			this.props.closeWrite();
		}
		console.log('calling put req to update project');
		this.props.updateProject(this.state).then(
				(res) => {
				 	console.log('updated');
					if(this.state.changed) 	window.location.reload(true);
				},
				(err) => { this.context.router.push('/notfound');}
			);
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
					<WritePage deactivateModal={this.deactivateModal} saveData={this.saveData} onChange={this.onChange} files={this.state.files} authors={this.state.authors} version={this.state.version} 
						publication={this.state.publication} heroImage={this.state.heroImageLink} keywords={this.state.keywords} usageRights={this.state.usageRights}
						contactLinkedin={this.state.contactLinkedin} contactFacebook={this.state.contactFacebook}
						contactEmail={this.state.contactEmail} contactHomepage={this.state.contactHomepage} 
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
	updateProject: React.PropTypes.func.isRequired
}
UpoloadNew.contextTypes = {
	router: React.PropTypes.object.isRequired
}
function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, {getFilesObject, updateProject})(UpoloadNew);
