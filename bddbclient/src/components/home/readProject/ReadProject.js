import React from 'react';
import { connect } from 'react-redux';
import { userAppreciated, getComments, saveComment, checkAppreciations, getFilesObject, getSignedUrl } from '../../../actions/detailsAction';
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
			showCopied: false
		}
		this.toggleCopied = this.toggleCopied.bind(this);
		this.onChange = this.onChange.bind(this);
		this.appreciationClick = this.appreciationClick.bind(this);
		this.postComment = this.postComment.bind(this);
		this.changeShowCopied = this.changeShowCopied.bind(this);
	}	

	componentWillMount() {
		const _isAuthenticated = this.props.auth.isAuthenticated;
		var _userId = 0;
		var _appreciateButtonEnabled = false;
		var filesQuery = 'projectId='+this.props.project.id;
		
		this.props.getFilesObject(filesQuery).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState( { files: response.data} ); //change the current state. this will render 
			},
			(err) => { this.context.router.push('/notfound');}
		);

		if(_isAuthenticated){ 
			_userId = this.props.auth.user.id; 
			var queryString = 'userId='+_userId;//+'&filter=Drug&filter=rna';
			queryString += '&projectId='+this.props.project.id ;

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
		else{
			this.setState( {
				userLoggedIn: _isAuthenticated,
				userId: _userId,
				appreciateButtonEnabled: _appreciateButtonEnabled,
				likes: this.props.project.likes
			});
		}
		setInterval(() => {
			console.log('updated');
			this.props.getFilesObject(filesQuery).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					console.log(response);
					this.setState( { files: response.data} ); //change the current state. this will render 
				},
				(err) => { this.context.router.push('/notfound');}
			);
		}, 2400000); //2400 secs update the content, links will be re-generated
	}

	changeShowCopied(){
		this.setState({ showCopied :  false});
	}

	toggleCopied(){
		if(!this.state.showCopied){
			console.log('changed');
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
			<button disabled={true} className="btn btn-success appreciate-btn"> Appreciate Project </button>
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
							<h5> USER RIGHTS <img src={help} alt="help icon"/> </h5>
						<p className="authors-styling"> {this.props.project.user_rights} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> CONTACT</h5>
							<div className="row icons-style">
								<a href={this.props.project.contact_linkedin ? this.props.project.contact_linkedin : '' } target="_blank"><img src={linkedin} alt="linkedin icon"/></a>
								<a href={this.props.project.contact_email ? "mailto:"+this.props.project.contact_email : '#' }><img src={mail} alt="email icon"/></a>
								<a href={this.props.project.contact_facebook ? this.props.project.contact_facebook : '' } target="_blank"><img src={facebook} alt="facebook icon"/></a>
								<a href={this.props.project.contact_homepage ? this.props.project.contact_homepage : '' } target="_blank"><img src={web} alt="home web"/></a>
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
							<h5> QUALITY OF DOCUMENTATION <img src={help} alt="help icon"/>  </h5>
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
							<h5>VIEWS <img src={views} alt="views"/> </h5><br/>
							<p className="views-styling"> {this.props.project.views} </p>
						</div>
						<div className=" likes-details">
							<h5> APPRECIATIONS <img src={appreciation} alt="appreciation"/> </h5><br/>
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
	increaseAp: React.PropTypes.func.isRequired,
	getSignedUrl: React.PropTypes.func.isRequired,
	getFilesObject: React.PropTypes.func.isRequired,
	getComments: React.PropTypes.func.isRequired
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

export default connect(mapStateToProps, {checkAppreciations, getComments, saveComment, userAppreciated, getFilesObject, getSignedUrl})(ReadProject);