import React from 'react';
import GalleryItem from './GalleryItem';

class OpenProject extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			projectAssigned: false,
			project: {},
			error: true
		}
	}

	componentWillMount(){
		var queryString = 'projectId='+this.props.projectId;
		this.props.getSingleProject(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState({ projectAssigned: true, project: response.data});
			},
			(err) => { 
				this.context.router.push('/serverError');
			}
		);
	}

	render(){
		return( 
			<div>
				{this.state.projectAssigned ? <GalleryItem project={this.state.project} increaseAp={this.props.increaseAp} modalActive={true} /> : ''}
			</div>
		);
	}
}

OpenProject.contextTypes = {
	router: React.PropTypes.object.isRequired
}

OpenProject.propTypes = {
	getSingleProject: React.PropTypes.func.isRequired,
	increaseAp: React.PropTypes.func.isRequired,
	projectId: React.PropTypes.string.isRequired
}

export default OpenProject;

