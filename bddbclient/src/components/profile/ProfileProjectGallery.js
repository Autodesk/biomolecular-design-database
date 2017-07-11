import React from 'react';
import ProjectItem from './ProjectItem';
import './profile.css';
import { connect } from 'react-redux';
import { deleteProject} from '../../actions/profileActions';

class ProfileProjectGallery extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			projects: []
		}
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onDeleteClick(queryString){
		this.props.deleteProject(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				if(response.success){
					this.props.deleteClicked(response);
				}
			}, (err) => { 
					this.setState({error: true});
			}
		);	
	}

	componentWillReceiveProps(nextProps){
		const _projects = nextProps.projects.map((project) => {
			return < ProjectItem key={project.id}  project={project} onDeleteClick={this.onDeleteClick} />
		})
		this.setState({ projects: _projects});
	}

	render() {
		return(
		 	<div className="container-fluid project-gallery">
		 		{this.state.projects}
		 	</div>

		);
	}
}

ProfileProjectGallery.propTypes = {
	projects: React.PropTypes.array.isRequired,
	deleteProject: React.PropTypes.func.isRequired,
	deleteClicked: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}
export default connect(mapStateToProps, { deleteProject })(ProfileProjectGallery);