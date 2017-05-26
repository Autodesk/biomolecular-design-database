//import { Link } from 'react-router';
import React from 'react';
//import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Home.css';

class HomePage extends React.Component {
	render (){
		const { isAuthenticated } = this.props.auth; //use the isAuthenticated field from this.props.auth
		const { user } = this.props.auth;  			 //use the user object from this.props.auth
		
		const signUp = (
			<button className="button">Sign up</button>
		);

		return(
			<div>
				<div className="general">
					<h1 className="home-title"> Showcase & Discovery DNA Constructs </h1>
					{ isAuthenticated ? <h3 className="welcomeStyle"> Welcome, {user.username}... </h3> : signUp}
				</div>
				<hr width="75%" />
			</div>
		);
	}
}


HomePage.propTypes = {
	auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	console.log(state);
	return { auth: state.auth };
}
export default connect(mapStateToProps)(HomePage);
