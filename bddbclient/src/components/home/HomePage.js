//import { Link } from 'react-router';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Home.css';
import Gallery from './Gallery';

class HomePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sortBy: 'newest', //newest/mostViewed/QualityOfDocumentation (default: newest)
			filters: []		  //array of filters selected by the user
		};
		this.onChange = this.onChange.bind(this);
		this.handleFilters = this.handleFilters.bind(this);
	}

	onChange(e){
		e.preventDefault();
	}

	handleFilters(e) {
		e.preventDefault();
		const filterName = e.target.name;
		var filterToggled = false; 
		var newFilesArr;
		this.state.filters.map((filter) => {
			if(filter === filterName){ //filter already there, remove it (toggle)
				const index = this.state.filters.indexOf(filterName);
				var beforeIndex = this.state.filters.slice(0, index);
				var afterIndex = this.state.filters.slice(index+1, this.state.filters.length);
				newFilesArr = beforeIndex.concat(afterIndex);
				this.setState({
					filters: newFilesArr 
				});
				filterToggled = true;
			}
			return null;
		});
		if(!filterToggled){
				//filter was not present in this.state.filters. Append the filter
				
				newFilesArr = this.state.filters.slice();
				newFilesArr.push(filterName);
				this.setState({
					filters: newFilesArr 
				});
			}
		//console.log(this.state.filters);
	}

	render (){
		const { isAuthenticated } = this.props.auth; //use the isAuthenticated field from this.props.auth
		const { user } = this.props.auth;  			 //use the user object from this.props.auth
		const signUp = (
			<Link to="/signup" style={{color: '#343950'}}><button className="button-signup">Sign up  </button></Link>
		);

		return(
			<div>
				<div className="container-fluid general">
					<h1 className="home-title"> Showcase & Discovery DNA Constructs </h1>
					{ isAuthenticated ? <h3 className="welcomeStyle"> Welcome {user.username}!  </h3> : signUp}
				</div>
				<hr width="80%"/>
				
				<div className="container-fluid showcase-layout">
					<div className="row">
						<div className="pull-left">
							<p> FILTER BY KEYWORDS </p>
							
							<div className="btn-group">
								<button name="drug"  onClick={this.handleFilters} className="filterBtn">Drug </button>
								<button name="tile" onClick={this.handleFilters} className="filterBtn">Tile </button>
								<button name="stable" onClick={this.handleFilters} className="filterBtn">Stable </button>
							</div>
						</div>

						<div className="dropdown pull-right">
						  	<p > SORT BY: </p><p className="dropbtn">Newest</p>
						  	<div className="dropdown-content">
						    	<a href="#">Most Viewed</a>
						    	<a href="#">Most Appreciations</a>
						    	<a href="#">Quality of Documentation</a>
						  	</div>
						</div>
					</div>

					<div className="container-fluid gallery-container">
						<Gallery />
					</div>
				
				</div>
			</div>
		);
	}
}
//<span className="glyphicon glyphicon-remove-circle"> to add remove icon in keyword filter

HomePage.propTypes = {
	auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	console.log(state);
	return { auth: state.auth };
}
export default connect(mapStateToProps)(HomePage);
