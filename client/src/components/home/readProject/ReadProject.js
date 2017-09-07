import React from 'react';
import { connect } from 'react-redux';
import { userAppreciated, getComments, saveComment, incViews, checkAppreciations, getFilesObject, getSignedUrl } from '../../../actions/detailsAction';
import './modal.css';
import '../Home.css';
import EntriesGallery from './EntriesGallery';
//import CommentsDisplay from './CommentsDisplay';
import crossIcon from '../../../../public/Assets/icons/close.svg';
import appreciation from '../../../../public/Assets/icons/appreciations.svg';
import views from '../../../../public/Assets/icons/views.svg';
import facebook from '../../../../public/Assets/icons/facebook.svg';
import linkedin from '../../../../public/Assets/icons/linkedIn.svg';
import mail from '../../../../public/Assets/icons/mail.svg';
import web from '../../../../public/Assets/icons/web.svg';
import help from '../../../../public/Assets/icons/help.svg';
import ratingOff from '../../../../public/Assets/icons/ratingOff.svg';
import ratingOn from '../../../../public/Assets/icons/ratingOn.svg';
import DetailModal from './DetailModal';
import Modal from 'react-modal';

class ReadProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userLoggedIn: false,
			userId: 0,
			appreciateButtonEnabled: false,
			likes: 0,
			files: [],
			comments: [],
			commentInput: '',
			postEnable: false,
			showCopied: false,
			userRightModalActive: false,
			qodModalActive: false,
			displayUserRights: false
		}
		this.toggleCopied = this.toggleCopied.bind(this);
		this.onChange = this.onChange.bind(this);
		this.appreciationClick = this.appreciationClick.bind(this);
		this.postComment = this.postComment.bind(this);
		this.changeShowCopied = this.changeShowCopied.bind(this);
		this.userRightModalActivate = this.userRightModalActivate.bind(this);
		this.userRightModalDeactivate = this.userRightModalDeactivate.bind(this);
		this.qodModalActivate = this.qodModalActivate.bind(this);
		this.qodModalDeactivate = this.qodModalDeactivate.bind(this);
		
	}	

	componentWillMount() {
		const _isAuthenticated = this.props.auth.isAuthenticated;
		var _userId = 0;
		var _appreciateButtonEnabled = false;
		var filesQuery = 'projectId='+this.props.project.id;
		var idObject = {
			id: this.props.project.id
		}
		this.props.getFilesObject(filesQuery).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState( { files: response.data} ); //change the current state. this will render 
			},
			(err) => { this.context.router.push('/notfound');}
		);

		this.props.incViews(idObject).then(
			(res) => {
				this.setState({ viewInc: true });
			},
			(err) =>{
				this.setState({ viewInc: false });
			}
		);

		if(_isAuthenticated){ 
			_userId = this.props.auth.user.id; 
			var queryString = 'userId='+_userId;//+'&filter=Drug&filter=rna';
			queryString += '&projectId='+this.props.project.id ;
			if(this.props.onProfilePage){
				this.setState({
					userLoggedIn: _isAuthenticated,
					userId: _userId,
					appreciateButtonEnabled: false, 
					likes: this.props.project.likes
				});
			}
			else{
				this.props.checkAppreciations(queryString).then(
				(res) => {
					//responds with null if the user has not appreciated the project or some object otherwise
					var response = JSON.parse(res.request.response);
					if(response.data !== null){ //user has already appreciated this project
						this.setState({
							userLoggedIn: _isAuthenticated,
							userId: _userId,
							appreciateButtonEnabled: false, 
							likes: this.props.project.likes
						});
					}
					else{
						this.setState( {
							userLoggedIn: _isAuthenticated,
							userId: _userId,
							appreciateButtonEnabled: true,
							likes: this.props.project.likes
						});
					}
				},
				(err) => { this.context.router.push('/notfound'); }
				);
			}
		}
		else{
			if(this.props.onProfilePage===true){
				_appreciateButtonEnabled = false;
			}
			this.setState( {
				userLoggedIn: _isAuthenticated,
				userId: _userId,
				appreciateButtonEnabled: _appreciateButtonEnabled,
				likes: this.props.project.likes
			});
		}
	
		setInterval(() => {
			this.props.getFilesObject(filesQuery).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					this.setState( { files: response.data} ); //change the current state. this will render 
				},
				(err) => { this.context.router.push('/notfound');}
			);
		}, 2400000); //2400 secs update the content, links will be re-generated
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.onProfilePage){
			this.setState({ appreciateButtonEnabled: false});
		}
	}

	userRightModalActivate(){
		this.setState({ userRightModalActive: true });
	};

	userRightModalDeactivate(){
		this.setState({userRightModalActive: false });
	};

	qodModalActivate(){
		this.setState({ qodModalActive: true });
	};

	qodModalDeactivate(){
		this.setState({qodModalActive: false });
	};


	changeShowCopied(){
		this.setState({ showCopied :  false});
	}

	toggleCopied(){
		if(!this.state.showCopied){
			this.setState({ showCopied: true});
		}
		setTimeout(this.changeShowCopied, 6000);
	}


	onChange(e){
		e.preventDefault();
		var _postEnable = false;
		if(e.target.value !== '') { _postEnable = true; } 
		this.setState({ [e.target.name]: e.target.value, postEnable: _postEnable });
	}

	appreciationClick(e){
		var queryObj = {
			userId: this.state.userId,
			projectId: this.props.project.id,
			projectAppreciations: this.props.project.likes
		};
		this.props.increaseAp(this.props.project.id, this.props.project.likes+1);
		var _likes = this.state.likes+1;
		this.setState({
			likes: _likes
		});
		this.props.userAppreciated(queryObj).then(
			(res) => { 
				this.setState({ appreciateButtonEnabled: false });
			}, 
			(err) => { this.context.router.push('/notfound'); } 
		);	
	}

	postComment(e){
		e.preventDefault();
		var query = 'projectId='+this.props.project.id; 
		var queryObj = {
			user_id: this.state.userId,
			project_id: this.props.project.id,
			username: this.props.auth.user.username,
			user_firstname: this.props.auth.user.firstName,
			user_lastname: this.props.auth.user.lastName,
			comment: this.state.commentInput
		};
		this.props.saveComment(queryObj).then(
			(res) => { 
				//Mount Comments
				this.props.getComments(query).then(
					(res) => {
						var response = JSON.parse(res.request.response);
						this.setState( { comments: response.commentsArr}); //change the current state. this will render 
					},
					(err) => { this.context.router.push('/notfound');}
				);
			}, 
			(err) => { this.context.router.push('/notfound'); } 
		);
	}

	render(){
		const qodMessage = (
			<div className="qod-block">
					Quality of Documentation is currently scored based on meeting five different criteria. For each one met, the project gets an additional star.
					<br/><br/> Criteria 1: Metadata completeness. You must have Title, Authors, Contact Info and Usage Rights filled out, and the Keywords block must have at
					least one keyword from each of these categories: Institution, Material, Design Type, Scaffold. Examples of these keywords include: "Institution: My University", "Material: RNA","Design Type: DNA Origami", and "Scaffold: Non-scaffolded".
					<br/><br/>Criteria 2: Must have the files necessary to describe the design. Must have a file entry which has the keyword tag "Design File", and a file or text entry which has the keyword Strand Information.
					<br/><br/>Criteria 3: Images and Abstract. Has to have a cover image, hero image, and an abstract of at least a few sentences in length.
					<br/><br/>Criteria 4: Design Information. Has at least 4 blocks that have keywords in the Design category, including at least an Introduction and Description block.
					<br/><br/>Criteria 5: Experimental Information. Has at least one block with the Experimental keyword.
					Quality of Documentation is scored based on an internal algorithm. We may change this implementation at any time to better reflect the desired metric, and will update
				    this text as that happens. Please notify us of any abuses of the metric, and your feedback on how we can improve!
			</div>
		);
		
		const userRightMessage = (
			<div className="usage-right-box">
			  		Please indicate how others can use the presented work, including design files and images. 
			  		This should be either a reference to a specific license (e.g. "CC BY-SA 3.0"), or an indicator 
			  		that you reserve all rights. For more information on licenses, see https://creativecommons.org/licenses/ or other resources.
			</div>
		);
		
		const usageRightBlock = (
        	<DetailModal deactivateModal={this.userRightModalDeactivate} message={userRightMessage}/>
		);

		const qodBlock = (
			<DetailModal deactivateModal={this.qodModalDeactivate} message={qodMessage} />
		);



		//PROMPT DETAILS MODAL
		const customStyles = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.60)',
		    padding			  : '0px',
		    zIndex 			  : 1099,
		    paddingBottom 	  : '40%'
		  },
		  content : {
		    position                   : 'absolute',
		    top                        : '0px',
		    left                       : '30%',
		    right                      : '30%',
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

		const usageRightModal = <Modal
				isOpen={this.state.userRightModalActive}
				onAfterOpen={this.userRightModalActivate}
				onRequestClose={this.userRightModalDeactivate}
				style={customStyles}
				contentLabel="Modal Open">
					{usageRightBlock}	
				</Modal>
		const qodModal = <Modal
				isOpen={this.state.qodModalActive}
				onAfterOpen={this.qodModalActivate}
				onRequestClose={this.qodModalDeactivate}
				style={customStyles}
				contentLabel="Modal Open">
					{qodBlock}	
				</Modal> 

		var counter = 0;
		var count = 0;
		var ticks = [];
		const projectLink = 'http://localhost:3000/#/projects/'+this.props.project.id;
		var mailLink = "mailto:joseph.schaeffer@autodesk.com?subject=Flag Content: "+this.props.project.name+"&body=Project Title: "+this.props.project.name+"%0D%0AProject Link: "+projectLink+"%0D%0AVersion: "+this.props.project.version+"%0D%0A%0D%0AAdd Comments Below: ";
		const qod = this.props.project.quality_of_documentation;
		const authors = this.props.project.authors.map((author) => {
			counter++;
			if(counter === 1){ return author; }
			return ', '+author;
		});
		const keywords = this.props.project.keywords.map((keyword) => {
			count++;
			if(count === 1){ return keyword; }
			return ', '+keyword;
		});
		const copiedMessage = (
			<div className="copied-alert"> 
				<p> Weblink copied to clipboard </p>
			</div>
		);
		//const allowComment = ( <button type="button" className="btn btn-success post-btn" onClick={this.postComment}>Post</button>
		//	);
		//const disableComment = ( <button type="button" disabled={true} className="btn btn-success post-btn" onClick={this.postComment}>Post</button>
		//	);

		const allowAppreciation = (
			<button className="btn btn-success appreciate-btn" onClick={this.appreciationClick}> Appreciate Project </button>
		);
		const disableAppreciation = (
			<button disabled={true} className="btn btn-success appreciate-btn" > Thanks </button>
		);
		for(var i = 0; i < 5; i++){
			if( i < qod){
				ticks.push(<img className="ticks-style" src={ratingOn} alt="green tick"/>);
			}
			else{
				ticks.push(<img className="ticks-style" src={ratingOff} alt="grey tick"/>);
			}
		}
		return(
			<div className="modal-body ">
			<div className="container-fluid overlay">
				<div id="details" className="hidden-xs">
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> AUTHORS </h5>
							<p className="authors-styling"> {authors} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> VERSION </h5>
							<p className="authors-styling"> {this.props.project.version ? this.props.project.version : "To be updated."} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> PUBLICATION </h5>
						<p className="authors-styling"> {this.props.project.publication ? this.props.project.publication : "To be updated."}</p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> KEYWORDS </h5>
						<p className="authors-styling"> {keywords} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5 className="usage-rights"> USAGE RIGHTS <img className="question" onClick={this.userRightModalActivate} src={help} alt="help icon"/> </h5>
					
						<p className="authors-styling"> {this.props.project.user_rights} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> CONTACT</h5>
							<div className="row icons-style">
								{this.props.project.contact_linkedin ? <a href={this.props.project.contact_linkedin ? this.props.project.contact_linkedin : '' } target="_blank"><img src={linkedin} alt="linkedin icon"/></a> : ''}
								{this.props.project.contact_email ? <a href={this.props.project.contact_email ? "mailto:"+this.props.project.contact_email : '#' }><img src={mail} alt="email icon"/></a> : ''}
								{this.props.project.contact_facebook ? <a href={this.props.project.contact_facebook ? this.props.project.contact_facebook : '' } target="_blank"><img src={facebook} alt="facebook icon"/></a> : ''}
								{this.props.project.contact_homepage ? <a href={this.props.project.contact_homepage ? this.props.project.contact_homepage : '' } target="_blank"><img src={web} alt="home web"/></a> : ''}
							</div>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<hr/>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> QUALITY OF DOCUMENTATION <img className="question" onClick={this.qodModalActivate}  src={help} alt="help icon"/>  </h5>
							<div className="ticks-details"> 
								<div className="tick">
							        {ticks[0]}
							        {ticks[1]}
							        {ticks[2]}
							        {ticks[3]}
							        {ticks[4]}
						        </div>
							 </div>
						</div>
					</div>
					<div className="row sub-part pull-left">
						<div className=" views-details">
							<h5>VIEWS <img src={views} className="question" alt="views"/> </h5><br/>
							<p className="views-styling"> {this.props.project.views} </p>
						</div>
						<div className=" likes-details">
							<h5> APPRECIATIONS <img src={appreciation} className="question" alt="appreciation"/> </h5><br/>
							<p className="likes-styling"> {this.state.likes} </p>
						</div>
					</div>
					<div className="sub-part-hr pull-left">
						<div className="sub-title">
							<hr/>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							{this.state.appreciateButtonEnabled? allowAppreciation : disableAppreciation}
						</div>
					</div>
					<div className="sub-part pull-left row">
						<a  className="link-left btn" data-clipboard-text={projectLink} onClick={this.toggleCopied}>Link to Project</a>
						<a href={mailLink} className="link-right" >Flag content</a>
						{this.state.showCopied ? copiedMessage : ''}
					</div>
				</div>
				<div id="content">
					<div className="cross-icon-new" onClick={this.props.deactivateModal}><img src={crossIcon} alt="close modal"/></div>
    				<div className="hero-image">
    					<img className="img-responsive" src={this.props.project.hero_image ? this.props.project.hero_image : this.props.project.header_image_link} alt=""/>
    				</div>
    				<div className="container-fluid content-details">
	    				<div className="project-title"> <h1> {this.props.project.name}</h1>  </div>
    					<div className="project-abstract"> 
    						<p> {this.props.project.project_abstract} </p>
    					</div>
    					<div className="container-fluid"> <EntriesGallery getSignedUrl={this.props.getSignedUrl} files={this.state.files} /> </div> 
    				</div>
    			</div>
    			<hr/>
    			</div>
    			{usageRightModal}
    			{qodModal}
			</div>
		);
	}
}

ReadProject.proptypes = {
	auth: React.PropTypes.object.isRequired,
	project: React.PropTypes.object.isRequired,
	deactivateModal: React.PropTypes.func.isRequired,
	userAppreciated: React.PropTypes.func.isRequired,
	checkAppreciations: React.PropTypes.func.isRequired,
	increaseAp: React.PropTypes.func,
	getSignedUrl: React.PropTypes.func.isRequired,
	getFilesObject: React.PropTypes.func.isRequired,
	getComments: React.PropTypes.func.isRequired,
	onProfilePage: React.PropTypes.bool,
	incViews: React.PropTypes.func.isRequired
}
ReadProject.contextTypes = {
	router: React.PropTypes.object.isRequired
}
function mapStateToProps(state){
	return { auth: state.auth };
}

//to add comments section, just add this part before the end of content div
/*

<div className="comments-section">
	    				<div className="container-fluid user-comment-title">
	    					<hr/>
	    					<h3>Comments: </h3>
	    				</div>
	    				<div className="container-fluid comments-display">
	    					<CommentsDisplay comments={this.state.comments} />
	    				</div>

	    				<div className="comment-container container">
	    					<h4> Write a comment: </h4>
		    				<div className="comment-input row">
    	  						<textarea className="form-control" type="text" onChange={this.onChange} name="commentInput" placeholder="Write a comment here..." value={this.state.commentInput} id="comment"></textarea>
    						</div>
    						{this.props.auth.isAuthenticated && this.state.postEnable ? allowComment : disableComment}
    					</div>

	    			</div>

	    //and place this at the end of componentWillMount function
	    //Mount Comments
	    var query = 'projectId='+this.props.project.id; 
		this.props.getComments(query).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState( { comments: response.commentsArr}); //change the current state. this will render 
			},
			(err) => { this.context.router.push('/notfound');}
		);

	  */

export default connect(mapStateToProps, {checkAppreciations, incViews, getComments, saveComment, userAppreciated, getFilesObject, getSignedUrl})(ReadProject);