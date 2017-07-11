import React from 'react';
import InputStyle from './InputStyle';
import help from '../../../public/Assets/icons/help.svg';
import crossIcon from '../../../public/Assets/icons/close.svg';

class WritePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
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
			projectAbstract: ''
		}
		this.onChange = this.onChange.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}
	
	render(){

		return(
			<div className="modal-body">
				<div className="container-fluid overlay">
					<div id="details" className="hidden-xs">
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> VERSION </h5>
								<InputStyle onChange={this.onChange} value={this.state.version} field="version" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> AUTHORS* </h5>
								<InputStyle onChange={this.onChange} value={this.state.authors} field="authors" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> PUBLICATION </h5>
								<InputStyle onChange={this.onChange} value={this.state.publication} field="publication" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> KEYWORDS* </h5>
								<InputStyle label="Separate by comma" onChange={this.onChange} value={this.state.keywords} field="keywords" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> USAGE RIGHTS* <img className="help-icon" src={help} alt="help icon"/> </h5>
								<InputStyle onChange={this.onChange} value={this.state.usageRights} field="usageRights" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> CONTACT </h5>
								<div className="contact-inputs">
									<InputStyle label="Email*"  onChange={this.onChange} value={this.state.contactEmail} field="contactEmail" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="Homepage" onChange={this.onChange} value={this.state.contactHomepage} field="contactHomepage" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="Facebook"  onChange={this.onChange} value={this.state.contactFacebook} field="contactFacebook" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="LinkedIn" onChange={this.onChange} value={this.state.contactLinkedin} field="contactLinkedin" />
								</div>
							</div>
						</div>
					</div>
					<div id="content">
						<div className="temp-hero-img"> </div>
						<div className="cross-icon-new" onClick={this.props.deactivateModal}><img src={crossIcon} alt="close modal"/></div>
		    			<div className="project-title-input">
			    			<div className='form-group'>
								<input type='text' placeholder="Project Title*" value={this.state.projectTitle} onChange={this.onChange} name="projectTitle" />
							</div>
						</div>
						<div className="project-abstract-input">
							<textarea type='text' placeholder="Description" value={this.state.projectAbstract} onChange={this.onChange} name="projectAbstract" rows='4'></textarea>
						</div>
						<div className="content-hr pull-left">
					
								<hr/>
						</div>
    				</div>
				</div>
			</div>
		);
	}
}

WritePage.propTypes = {
	deactivateModal: React.PropTypes.func.isRequired
}

export default WritePage;
