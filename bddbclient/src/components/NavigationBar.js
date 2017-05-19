import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import logo from "../../public/Assets/logo.svg";

class NavigationBar extends React.Component{
	
	logout(e){
		e.preventDefault();
		this.props.logout(); //props.logout === logout action importes
	}

	render (){
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/new-event"> <font size="3">New Project</font> </Link></li>
				<li><a href="#" onClick={this.logout.bind(this)} > <font size="3">Logout</font></a></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav nav-r navbar-nav navbar-right">
				<li><Link to="/signup"> <font size="3">Sign Up</font></Link> </li>
				<li><Link to="/login"> <font size="3">Login</font></Link></li>
			</ul>
		);
		return(
			<nav className="navbar navbar-fixed-top navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header page-scroll">
						< Link to="/" className="navbar-brand"> <img src={logo} alt="Autodesk Life Science"/> </Link>
					</div>

					<div className="collapse navbar-collapse">
						{ isAuthenticated ? userLinks : guestLinks }
					</div>
				</div>
			</nav> 
		);
	}
}


NavigationBar.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired
}


//specify map state to prop function
function mapStateToProps(state) {
	return{
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(NavigationBar); //connect to the redux store to check idAuthenticated

