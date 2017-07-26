import React from 'react';
import InputStyle from './InputStyle';
import help from '../../../public/Assets/icons/help.svg';
//import crossIcon from '../../../public/Assets/icons/close.svg';
//import FileWriteDisplay from './files/FileWriteDisplay';
//import classnames from 'classnames';
import NewFileBlock from './files/NewFileBlock';
//import add from '../../../public/Assets/add.png';
import update from 'react-addons-update';

class WritePageUpdate extends React.Component{
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
		this.handleFileUploads = this.handleFileUploads.bind(this);
	}

	componentWillMount(){
		this.setState({checked: this.props.published });
	}

	inputFileClicked(){
		console.log("uploading file");
	}

	handleFileUploads(e){
		e.preventDefault();
		console.log(e.target.files);
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
	}

	render(){
		//const filesDisplay = this.props.files.map((fileItem) => {
		//	return <FileWriteDisplay key={fileItem.id} deleteClicked={this.props.deleteClicked} file={fileItem} />;
		//});
		//const headerImg = ( 
		//	<div className="hero-image">
    	//		<img className="img-responsive" src={this.props.heroImage ? this.props.heroImage : this.props.headerImageLink} alt=""/>
    	//	</div>
    	//	);
		
		return(
		<div className="write-page-container"> 
			<div className="container-fluid">
				<div className="row row-left-btn">
					<button className="write-page-btn-back write-page-btn button"> &#60; Back to My Projects </button>
					<button className="write-page-btn-draft write-page-btn  button" disabled={this.props.published ? false : true}> Revert to Draft </button>
				</div>
				<div className="row row-right-btn">
					<button className="write-page-btn-publish write-page-btn button" disabled={this.props.published ? true : false}> Publish </button>
					<button className="write-page-btn-save write-page-btn button"> Save </button>
				</div>
			</div>	
			<hr className="thick-hr"></hr>

			<div className="container-fluid">
				{ this.props.errors.form && <div className="alert alert-danger"> { this.props.errors.form} </div> }
					<div id="details-write-page" className="hidden-xs">
						<div className="sub-part project-info-bold pull-left">
							<p>Project Info </p>
							<hr/>
						</div>

						<div className="title-abstract-styling">
							<div className="sub-part pull-left title-write">
								<div className="sub-title">
									<h5> TITLE* </h5>
									<InputStyle error={this.props.errors.projectTitle} onChange={this.props.onChange} value={this.props.projectTitle ? this.props.projectTitle : ''} field="projectTitle" />
								</div>
							</div>
							<div className="sub-part pull-left abstract-write">
								<div className="sub-title">
									<h5> ABSTRACT* </h5>
									<textarea type='text' className="abstract-textarea" placeholder="Description" value={this.props.projectAbstract ? this.props.projectAbstract : ''} onChange={this.props.onChange} name="projectAbstract" rows='4'></textarea>
								</div>
							</div>
						</div>

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
								{this.props.errors.keywords && <span className="help-block">{this.props.errors.keywords}</span>}
								<textarea type='text' className="abstract-textarea" placeholder="Description" value={this.props.keywords ? this.props.keywords : ''} onChange={this.props.onChange} name="keywords" rows='4'></textarea>
							</div>
						</div>
						<div className="sub-part pull-left">
							<div className="sub-title">
								<h5> USAGE RIGHTS* <img className="help-icon" src={help} alt="help icon"/> </h5>
								<InputStyle error={this.props.errors.usageRights} onChange={this.props.onChange} value={this.props.usageRights ? this.props.usageRights : ''} field="usageRights" />
							</div>
						</div>
						<div className="sub-part contact-write-style pull-left">
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
				<div id="content-write-page">

					<div className="content-style pull-left">
						<p>Content </p>
						<hr/>
					</div>
					<div className="content-text">
						<p>Add content to project </p>
					</div>
					<div className="content-btns">
						<button className="write-page-content-btn content-btns-style button"> Text </button>
						<button className="write-page-content-btn content-btns-style button"> Image
							<input id="input-file-click" onChange={this.handleFileUploads} className="upload-input" type="file" name="file" multiple/>
						 </button>
						<button className="write-page-content-btn content-btns-style button"> Videos </button>
						<button className="write-page-content-btn content-btns-style button"> File </button>
					</div>

					<div className="content-style pull-left">
						<p>Cover Image </p>
						<hr/>
					</div>
					<div className="content-btns">
						<button className="write-page-content-btn write-page-content-btn-upload button"> Upload Image </button>
					</div>
					<div className="content-text">
						<p>Looks best at 200 x 200px </p>
					</div>

				</div>
			</div>
		</div>
		);
	}
}

WritePageUpdate.propTypes = {
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

export default WritePageUpdate;
