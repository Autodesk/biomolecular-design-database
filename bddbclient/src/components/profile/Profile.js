import React from 'react';
import { connect } from 'react-redux';
import '../home/Home.css';
import './profile.css';
import {getAllPublishedProjects, getAllDrafts, reloadPublished, reloadDrafts, uploadProject} from '../../actions/profileActions';
import Gallery from './ProfileProjectGallery';
import UploadNew from '../upload/UploadNew';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			published: [],
			drafts: [],
			error: false,
			openWrite: false
		}
		this.deleteClicked = this.deleteClicked.bind(this);
		this.closeWrite = this.closeWrite.bind(this);
		this.uploadNewClicked = this.uploadNewClicked.bind(this);
		this.btnClicked = this.btnClicked.bind(this);
		this.loadProjects = this.loadProjects.bind(this);
	}

	componentWillMount(){
		var queryString = 'user_id='+this.props.auth.user.id;
		this.props.getAllPublishedProjects(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState({ published: response.publishedProjects})
				}, (err) => { 
					this.setState({error: true});
			}
		);	
		this.props.getAllDrafts(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState({ drafts: response.drafts})
			}, (err) => { 
				this.setState({error: true});
			}
		);	
	}

	closeWrite(){
		this.setState({openWrite : false});
	}
	
	uploadNewClicked(e){
		e.preventDefault();
		var projectData = {
			user_id: this.props.auth.user.id
		}
		this.props.uploadProject(projectData).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				var linkUrl = '/update/'+response.project_id;
				this.context.router.push(linkUrl);
			}, (err) => {
				this.context.router.push('/notfound');
			}
		);
		//MAKE A POST REQUEST 
		//1. UPLOAD A FRESH PROJECT IN DATABASE GET PROJECT ID IN RETURN
		//2. SEND PROJECT ID

	}
	
	componentWillReceiveProps(nextProps){
		this.setState({ search: this.props.searchValue },
			this.loadProjects
		);
	}

	loadProjects(e){
		if(this.props.searchValue !== ''){
			var queryString = 'search='+this.props.searchValue+'&user_id='+this.props.auth.user.id;
			this.props.reloadPublished(queryString).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					var newPublishedProjects = response.data;
					this.setState( { published: newPublishedProjects } );  
				}, (err) => { 
						this.context.router.push('/notfound')
				}
			);

			this.props.reloadDrafts(queryString).then(
				(res) => {
					var response = JSON.parse(res.request.response);
					var newDraftsProjects = response.data;
					this.setState( { drafts: newDraftsProjects } );  
				}, (err) => { 
						this.context.router.push('/notfound')
				}
			);
		}
		else{
			this.componentWillMount();
		}
	}

	updatePublished(response){
		var updatedPublished = [];
		var len = this.state.published.length;
		for(var i = 0; i < len; i++){
			if(this.state.published[i].id.toString() !== response.projectId.toString()){
				updatedPublished.push(this.state.published[i]);
			}
		}
		return updatedPublished;
	}

	updateDrafts(response){
		var updatedDrafts = [];
		var len = this.state.drafts.length;
		for(var i = 0; i < len; i++){
			if(this.state.drafts[i].id.toString() !== response.projectId.toString()){
				updatedDrafts.push(this.state.drafts[i]);
			}
		}
		return updatedDrafts;
	}

	btnClicked(){
		console.log(this.props.searchValue); //search bar value
	}
	
	deleteClicked(response){
		if(response.success){
			var updatedPublishedProjects = this.updatePublished(response);
			var updatedDraftsProjects = this.updateDrafts(response);
			this.setState({ published: updatedPublishedProjects, drafts: updatedDraftsProjects});
		}		
	}

	render() {
		return( 
			<div className="container-fluid profile">
				{this.state.error ? <h5 className="profile-page-top">OOPs! Something went wrong </h5> : '' }
				<div className="container-fluid profile-page-top">
					<button className="button-upload" onClick={this.uploadNewClicked}> Upload New </button>
				</div>
				<div className="published">
					<h4> Published </h4>
					<hr/>
					<div className="gallery-layout">
						<Gallery projects={this.state.published} deleteClicked={this.deleteClicked} />
					</div>
					{this.state.published.length === 0 ? <h6> No published projects to display. </h6> : '' }
				</div>
				<div className="drafts">
					<h4> Drafts </h4>
					<hr/>
					<div className="gallery-layout">
						<Gallery projects={this.state.drafts} deleteClicked={this.deleteClicked} />
					</div>
					{this.state.drafts.length === 0 ? <h6> No drafts to display.  </h6> : '' }
				</div>
				{this.state.openWrite ? <UploadNew closeWrite={this.closeWrite} newProject={true} closeBool={true} /> : ''}
			</div>
		);
	}
}

Profile.propTypes = {
	auth: React.PropTypes.object.isRequired,
	getAllPublishedProjects: React.PropTypes.func.isRequired,
	getAllDrafts: React.PropTypes.func.isRequired,
	reloadPublished: React.PropTypes.func.isRequired,
	reloadDrafts: React.PropTypes.func.isRequired,
	uploadProject: React.PropTypes.func.isRequired
}

Profile.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, { getAllPublishedProjects, reloadPublished, reloadDrafts, uploadProject, getAllDrafts })(Profile);
