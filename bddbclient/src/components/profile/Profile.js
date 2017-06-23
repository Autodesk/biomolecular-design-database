import React from 'react';
import '../home/Home.css';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			published: [],
			drafts: []
		}
	}


	render() {
		

		return( 

			<div className="container-fluid profile-page-top">
				<h2> profile </h2>
			</div>
		);
	}
}



export default Profile;
