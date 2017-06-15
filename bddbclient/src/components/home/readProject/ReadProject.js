import React from 'react';
import { connect } from 'react-redux';
import { userAppreciated, checkAppreciations, getFilesObject } from '../../../actions/detailsAction';
import './modal.css';
import '../Home.css';
import EntriesGallery from './EntriesGallery';

class ReadProject extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userLoggedIn: false,
			userId: 0,
			appreciateButtonEnabled: false,
			likes: 0,
			files: []
		}
		this.onChange = this.onChange.bind(this);
		this.appreciationClick = this.appreciationClick.bind(this);
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
	}

	onChange(e){
		e.preventDefault();
		console.log(this.state);
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

	render(){
		var counter = 0;
		var count = 0;
		var ticks = [];
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
		const allowAppreciation = (
			<button className="btn btn-success appreciate-btn" onClick={this.appreciationClick}> Appreciate Project </button>
		);
		const disableAppreciation = (
			<button disabled={true} className="btn btn-success appreciate-btn"> Appreciate Project </button>
		);
		for(var i = 0; i < 5; i++){
			if( i < qod){
				ticks.push(<span className='green-tick glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
			else{
				ticks.push(<span className='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
		}
		return(
			<div className="modal-body " >
				<div id="details">
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> AUTHORS </h5>
							<p className="authors-styling"> {authors} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> VERSION </h5>
						</div>
						<p className="authors-styling"> {this.props.project.version ? this.props.project.version : "To be updated."} </p>
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
							<h5> USER RIGHTS <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> </h5>
						<p className="authors-styling"> {this.props.project.user_rights} </p>
						</div>
					</div>
					<div className="sub-part pull-left">
						<div className="sub-title">
							<h5> CONTACT</h5>
							<div className="row">
								<i className="fa fa-linkedin" aria-hidden="true"></i>
								<a href={this.props.project.contact_email ? "mailto:"+this.props.project.contact_email : '' }> <i className="fa fa-envelope-o" aria-hidden="true"></i></a>
								<i className="fa fa-facebook" aria-hidden="true"></i>
								<a href={this.props.project.contact_homepage ? this.props.project.contact_homepage : '' }><i className="fa fa-home" aria-hidden="true"></i></a>
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
							<h5> QUALITY OF DOCUMENTATION <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span> </h5>
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
					<div className="sub-part pull-left">
						<div className="col-md-4 views-details">
							<h5>VIEWS<i className="fa fa-eye" aria-hidden="true"></i> </h5>
							<p className="views-styling"> {this.props.project.views} </p>
						</div>
						<div className="col-md-4 likes-details">
							<h5> APPRECIATIONS <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> </h5>
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
						<a href="" className="link-left">Link to Project</a>
						<a href="" className="link-right">  Flag content</a>
					</div>
				</div>
				<div id="content">
					<span className="glyphicon glyphicon-remove-circle cross-icon" onClick={this.props.deactivateModal} aria-hidden="true"></span>
    				
    				<div className="hero-image">
    					<img className="img-responsive" src={this.props.project.hero_image ? this.props.project.hero_image : this.props.project.header_image_link} alt=""/>
    				</div>
    				<div className="project-title"> <h1> {this.props.project.name}</h1>  </div>
    				<div className="project-abstract"> 
    					<p> {this.props.project.project_abstract} </p>
    				</div>
    				<div className="container-fluid"> <EntriesGallery files={this.state.files} /> </div> 
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
	getFilesObject: React.PropTypes.func.isRequired
}
ReadProject.contextTypes = {
	router: React.PropTypes.object.isRequired
}
function mapStateToProps(state){
	return { auth: state.auth };
}
export default connect(mapStateToProps, {checkAppreciations, userAppreciated, getFilesObject})(ReadProject);