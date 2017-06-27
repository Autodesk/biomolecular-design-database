import React from 'react';
import { connect } from 'react-redux';
import '../home/Home.css';
import './profile.css';
import {getAllPublishedProjects, getAllDrafts} from '../../actions/profileActions';
import Gallery from './ProfileProjectGallery';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			published: [],
			drafts: [],
			error: false
		}
	}

	componentWillMount(){
		console.log(this.props.auth);
		var queryString = 'user_id='+this.props.auth.user.id;
		this.props.getAllPublishedProjects(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState({ published: response.publishedProjects})
				console.log(response);//this.setState( { projects: newProjectArr, getFrom: _getFrom, getTo: _getTo } );  
			}, (err) => { 
					this.setState({error: true});
			}
		);	
		this.props.getAllDrafts(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState({ drafts: response.drafts})
				console.log(response);//this.setState( { projects: newProjectArr, getFrom: _getFrom, getTo: _getTo } );  
			}, (err) => { 
					this.setState({error: true});
			}
		);	
	}

	render() {
		return( 
			<div className="container-fluid profile">
				{this.state.error ? <h5 className="profile-page-top">OOPs! Something went wrong </h5> : '' }
				<div className="container-fluid profile-page-top">
					<h2> profile </h2>
					<button className="button-upload"> Upload New  </button>
				</div>
				<div className="published">
					<h4> Published </h4>
					<hr/>
					<div className="gallery-layout">
						<Gallery projects={this.state.published} />
					</div>
					{this.state.published.length === 0 ? <h6> You've not uploaded any project. </h6> : '' }
				</div>
				<div className="drafts">
					<h4> Drafts </h4>
					<hr/>
					<div className="gallery-layout">
						<Gallery projects={this.state.drafts} />
					</div>
					{this.state.drafts.length === 0 ? <h6> No drafts to display.  </h6> : '' }
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	auth: React.PropTypes.object.isRequired,
	getAllPublishedProjects: React.PropTypes.func.isRequired,
	getAllDrafts: React.PropTypes.func.isRequired
}

Profile.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, { getAllPublishedProjects, getAllDrafts })(Profile);
