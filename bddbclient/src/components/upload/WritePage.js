import React from 'react';
import InputStyle from './InputStyle';
import help from '../../../public/Assets/icons/help.svg';
import crossIcon from '../../../public/Assets/icons/close.svg';
import FileWriteDisplay from './files/FileWriteDisplay';
import classnames from 'classnames';
import NewFileBlock from './files/NewFileBlock';
import add from '../../../public/Assets/add.png';
import update from 'react-addons-update';

class WritePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			checked: true,
			newFilesBlock: [],
			currId: 0
		}
		this.addFileClicked = this.addFileClicked.bind(this);
		this.newFileDeleteClicked = this.newFileDeleteClicked.bind(this);
		this.getIndex = this.getIndex.bind(this);
	}

	getIndex(fileId){
		var len=this.state.newFilesBlock.length;
		var index = -1;
		for(var i = 0; i < len; i++){
			if(this.state.newFilesBlock[i].id === fileId){
				index=i;
			}
		}
		return index;
	}

	newFileDeleteClicked(fileId){
		const index = this.getIndex(fileId);
		this.setState({ newFilesBlock: update(this.state.newFilesBlock, {$splice: [[index, 1]]}) })
	}

	componentWillMount(){
		this.setState({checked: this.props.published });
	}

	addFileClicked(e){
		e.preventDefault();
		var newFileItem = {
			id: this.state.currId,
			project_id: this.props.id,
			title: '',
			tags: '',
			file_link: null,
			description: '',
			links_array: []
		}
		var newFilesArray = this.state.newFilesBlock;
		newFilesArray.push(<NewFileBlock key={this.state.currId} newFileDeleteClicked={this.newFileDeleteClicked} file={newFileItem}/>);
		this.setState({ currId: this.state.currId+1 });
		console.log(newFileItem);
		console.log(this.state);
	}

	render(){
		const filesDisplay = this.props.files.map((fileItem) => {
			return <FileWriteDisplay key={fileItem.id} deleteClicked={this.props.deleteClicked} file={fileItem} />;
		});
		const headerImg = ( 
			<div className="hero-image">
    			<img className="img-responsive" src={this.props.heroImage ? this.props.heroImage : this.props.headerImageLink} alt=""/>
    		</div>
    		);
		return(
			<div className="modal-body">
				<div className="container-fluid overlay">
				{ this.props.errors.form && <div className="alert alert-danger"> { this.props.errors.form} </div> }
					<div id="details" className="hidden-xs">
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> VERSION </h5>
								<InputStyle onChange={this.props.onChange} value={this.props.version ? this.props.version : ''} field="version" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> AUTHORS* </h5>
								<InputStyle error={this.props.errors.authors} onChange={this.props.onChange} value={this.props.authors ? this.props.authors.toString() : ''} field="authors" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> PUBLICATION </h5>
								<InputStyle onChange={this.props.onChange} value={this.props.publication ? this.props.publication : ''} field="publication" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> KEYWORDS* </h5>
								<InputStyle error={this.props.errors.keywords} label="Separate by comma" onChange={this.props.onChange} value={this.props.keywords ? this.props.keywords.toString() : ''} field="keywords" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> USAGE RIGHTS* <img className="help-icon" src={help} alt="help icon"/> </h5>
								<InputStyle error={this.props.errors.usageRights} onChange={this.props.onChange} value={this.props.usageRights ? this.props.usageRights : ''} field="usageRights" />
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> CONTACT </h5>
								<div className="contact-inputs">
									<InputStyle error={this.props.errors.email} label="Email*"  onChange={this.props.onChange} value={this.props.contactEmail ? this.props.contactEmail: ''} field="contactEmail" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="Homepage" onChange={this.props.onChange} value={this.props.contactHomepage ? this.props.contactHomepage: ''} field="contactHomepage" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="Facebook"  onChange={this.props.onChange} value={this.props.contactFacebook ? this.props.contactFacebook: ''} field="contactFacebook" />
								</div>
								<div className="contact-inputs">
									<InputStyle label="LinkedIn" onChange={this.props.onChange} value={this.props.contactLinkedin ? this.props.contactLinkedin: ''} field="contactLinkedin" />
								</div>
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> HEADER IMAGE* </h5>
								<img className="img-responsive project-image" src={this.props.headerImageLink} alt=""/>
							</div>
						</div>
						<div className="sub-part toggle-switch pull-left">
							<div className="sub-title">
							<h5>PUBLISH/DRAFT</h5>
					
								<h5 className="draft-switch">Draft</h5>
								<label className="switch" >
								  	<input type="checkbox" checked={this.state.checked} onChange={(e) => { this.setState({ checked: !this.state.checked });  this.props.changePublished(this.state.checked)}}/> }
								  	<span className="slider round"></span>
								</label>
								<h5 className="publish-switch">PUBLISH</h5>
							</div>
						</div>
					</div>
					<div id="content">
						{this.props.headerImageLink || this.props.heroImage ? headerImg : <div className="temp-hero-img"> </div>}
						<div className="cross-icon-new" onClick={this.props.deactivateModal}><img src={crossIcon} alt="close modal"/></div>
		    			<div className="project-title-input">
			    			<div className={classnames('form-group', {'has-error': this.props.errors.projectTitle})}>
			    				{this.props.errors.projectTitle && <span className="help-block">{this.props.errors.projectTitle}</span>}
								<input type='text' placeholder="Project Title*" value={this.props.projectTitle ? this.props.projectTitle : '' } onChange={this.props.onChange} name="projectTitle" />
							</div>
						</div>
						<div className="project-abstract-input">
							<textarea type='text' placeholder="Description" value={this.props.projectAbstract ? this.props.projectAbstract : ''} onChange={this.props.onChange} name="projectAbstract" rows='4'></textarea>
						</div>
						<div className="content-hr pull-left">
								<hr/>
						</div>
						<div>
							{filesDisplay}
						</div>
						{this.state.newFilesBlock}
						<div className="content-hr pull-left">
								<hr/>
						</div>
						<div className="upload-new-file-layout" onClick={this.addFileClicked} >
							<img className="add-icon" src={add} alt="add icon"/>
							<h3 className="add-new"> Click here to add a new file block </h3>
						</div>
    				</div>
				</div>
			</div>
		);
	}
}

WritePage.propTypes = {
	deactivateModal: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	files: React.PropTypes.array,
	heroImage: React.PropTypes.string,
	authors: React.PropTypes.string,
	version: React.PropTypes.string,
	publication: React.PropTypes.string,
	keywords: React.PropTypes.string,
	usageRights: React.PropTypes.string,
	contactLinkedin: React.PropTypes.string,
	contactFacebook: React.PropTypes.string,
	contactEmail: React.PropTypes.string,
	contactHomepage: React.PropTypes.string,
	projectTitle: React.PropTypes.string,
	projectAbstract: React.PropTypes.string,
	headerImageLink: React.PropTypes.string,
	fileChanged: React.PropTypes.func,
	errors: React.PropTypes.object,
	published: React.PropTypes.bool,
	id: React.PropTypes.number,
	changePublished: React.PropTypes.func,
	deleteClicked: React.PropTypes.func
}

export default WritePage;
