import React from 'react';
import Modal from 'react-modal';
import './upload.css';
import WritePage from './WritePage.js';

class UpoloadNew extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalActive: true,
			authors: [],
			version: '',
			publication: '',
			keywords: [],
			usageRights: '',
			contactLinkedin: '',
			contactFacebook: '',
			contactEmail: '',
			contactHomepage: '',
			projectTitle: '',
			projectAbstract: '',
			headerImageLink: ''
		}
		this.onChange = this.onChange.bind(this);
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	}
	activateModal(){
		this.setState({ modalActive: true });
	}

	deactivateModal(){
		this.setState({ modalActive: false });
		if(this.props.closeBool) {
			this.props.closeWrite();
		}
		console.log(this.state);
	}
	componentWillMount(){
		if(this.props.project){
			this.setState({
				authors: this.props.project.authors,
				version: this.props.project.version,
				publication: this.props.project.publication,
				keywords: this.props.project.keywords,
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
					<WritePage deactivateModal={this.deactivateModal} onChange={this.onChange} authors={this.state.authors} version={this.state.version} 
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
	project: React.PropTypes.object
}
export default UpoloadNew;
