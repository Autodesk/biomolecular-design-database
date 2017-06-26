import React from 'react';
import ProjectItem from './ProjectItem';
import './profile.css';

class ProfileProjectGallery extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			projects: []
		}
	}

	componentWillReceiveProps(nextProps){
		const _projects = nextProps.projects.map((project) => {
			return < ProjectItem key={project.id}  project={project} /> 
		});
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
	projects: React.PropTypes.array.isRequired
}

export default ProfileProjectGallery;