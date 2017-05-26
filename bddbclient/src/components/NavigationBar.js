import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component{
	 
	logout(e){
		e.preventDefault(); 
		this.props.logout(); //props.logout  (logout action which is imported)
	} 
  
	render (){
		const { isAuthenticated } = this.props.auth;
 
		const userLinks = (
			<ul className="nav navbar-nav">  
				<li><Link to="/" style={{color: '#212a43'}} >Browse All </Link></li>
				<li><Link to="/" style={{color: '#212a43'}}> My Projects </Link></li>
				<li><Link to="/new-event" style={{color: '#212a43'}}> Upload New </Link></li>
				<li color="black"><a href="#  " style={{color: '#212a43'}} onClick={this.logout.bind(this)} > <i className="fa fa-sign-out" aria-hidden="true"></i> Logout </a></li>
			</ul>
		);
 
		const guestLinks = (
			<ul className="nav navbar-nav">
				<li><Link to="/signup" style={{color: '#212a43'}} > <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up </Link> </li>
				<li><Link to="/login" style={{color: '#212a43'}} > <i className="fa fa-sign-in" aria-hidden="true"></i>  Login </Link></li>
			</ul>
		);

		return(
      
			<nav className="navbar navbar-toggleable-md navbar-fixed-top navbar-layout ">
 				<div className="container-fluid">
					<div className=" page-scroll">
						< Link to="/" className="navbar-brand"> <strong className="logo"> BDD </strong></Link>
					</div>

					<div className=" nav-links">
						{ isAuthenticated ? userLinks : guestLinks }
					</div>
 
					<form>
	  					<input type="text" className="searchBar-layout" name="search"  placeholder="Search...  " />
					</form>				

					<hr width="95%" />  
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
//slice off the auth component from the whhole application state (connected to redux store)
function mapStateToProps(state) {
	return{
		auth: state.auth
	};
}

export default connect(mapStateToProps, { logout })(NavigationBar); //connect to the redux store to check idAuthenticated

