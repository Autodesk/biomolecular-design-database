import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import UploadNew from './upload/UploadNew';

class NavigationBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showLogout: false,
			openWrite: false
		}
		this.closeWrite = this.closeWrite.bind(this);
		this.uploadNewClicked = this.uploadNewClicked.bind(this);
		this.toggleLogout = this.toggleLogout.bind(this);
	}
	closeWrite(){
		this.setState({openWrite : false});
	}
	uploadNewClicked(e){
		e.preventDefault();
		this.setState({ openWrite: true })
	}
	toggleLogout(){
		if(this.state.showLogout){
			this.setState({ showLogout : false });
		}
		else{
			this.setState({ showLogout: true });
		}
	}
	logout(e){
		e.preventDefault();
		this.props.logout(); //props.logout  (logout action which is imported)
	}
	render (){
		const { isAuthenticated } = this.props.auth;
		const logoutDiv = (
			<div className="container-logout" onClick={this.toggleLogout}>
				<div className="logout-alert"> 
					<a href="# " style={{color: '#343950'}} onClick={this.logout.bind(this)} > <i className="fa fa-sign-out" aria-hidden="true"></i> Logout </a>
				</div>
			</div>
		);

		const userLinks = (
			<ul className="nav navbar-nav">
				<li><Link to="/" style={{color: '#343950'}} >Browse All </Link></li>
				<li><Link to="/profile" style={{color: '#343950'}}> My Projects </Link></li>
				<li><p className="upload-nav" style={{color: '#343950'}} onClick={this.uploadNewClicked}> Upload New </p></li>
			</ul>
		);

		const guestLinks = (
			<ul className="nav navbar-nav">
				<li><Link to="/signup" style={{color: '#343950'}} > <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up </Link> </li>
				<li><Link to="/login" style={{color: '#343950'}} > <i className="fa fa-sign-in" aria-hidden="true"></i>  Login </Link></li>
			</ul>
		);

		return(
		<nav className="navbar navbar-toggleable-md navbar-fixed-top navbar-layout animated bounceInDown">
			<div className="container-fluid">
				<div className="navbar-header">
				 	<button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle" style={{border: '1px solid #2fe695'}}>
						<span className="sr-only">Toggle navigation</span>
						<span className="green-bar icon-bar"></span>
						<span className="green-bar icon-bar"></span>
						<span className="green-bar icon-bar"></span>
				 	</button>
				 	<div className=" page-scroll">
					 	< Link to="/" className="navbar-brand"> <strong className="logo"> BDD </strong></Link>
				 	</div>
			 	</div>
				<div id="navbarCollapse" className="collapse navbar-collapse">
				 	<div className=" nav-links">
					 	{ isAuthenticated ? userLinks : guestLinks }
				 	</div>
				 	{isAuthenticated ? 
				 		<div className="nav-username" onClick={this.toggleLogout}><p>{this.props.auth.user.firstName} {this.props.auth.user.lastName}<span className="caret"></span></p></div>
				 		: ''
				 	}
					<form onSubmit={this.props.searchSubmnit}>
						<input type="text" className="searchBar-layout" onChange={this.props.searchValUpdate} onSubmit={this.props.searchSubmnit} name="search"  placeholder="Search...  " />
				 	</form>
				 	<hr width="95%" />
				 	
				</div>
					{this.state.showLogout ? logoutDiv : '' }
				{this.state.openWrite ? <UploadNew closeWrite={this.closeWrite} closeBool={true} /> : ''}
			</div>
		</nav>
		);
	}
}

NavigationBar.propTypes = {
	searchValUpdate: React.PropTypes.func.isRequired,
	searchSubmit: React.PropTypes.func.isRequired,
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
