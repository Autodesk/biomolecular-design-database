import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Home.css';
import Gallery from './Gallery';
import SortOption from './SortOption';
import { reloadProjects, getSingleProject } from '../../actions/homePageActions';
import OpenProject from './OpenProject';

class HomePage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sortBy: 'Newest', //newest/mostViewed/QualityOfDocumentation (default: newest)
			sortByOptions: ['newest', 'most_viewed', 'most_likes', 'quality_of_documentation'],
			sortByLabels: ['Newest', 'Most Viewed', 'Most Appreciations', 'Quality of Documentation'],
			filters: [],		  //array of filters selected by the user
			projects: [], //projects to display 
			getFrom: 0,
			getTo: 9, //projcts to get from-to from the database
			hasMore: true,
			search: '',
			projectId: null
		};
		this.onChange = this.onChange.bind(this);
		this.handleFilters = this.handleFilters.bind(this);
		this.loadProjects = this.loadProjects.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.generateMoreProjects = this.generateMoreProjects.bind(this);
		this.increaseAp = this.increaseAp.bind(this);
	}

	componentWillMount() { //gets evoked before rendering the component
		var _projectId = null;
		var queryString = 'sortby='+this.state.sortBy;//+'&filter=Drug&filter=rna';
		if(this.props.params.projectId){ _projectId = this.props.params.projectId }
		queryString += '&from='+0+'&to='+9; //only get first 9 projects initially
		this.props.reloadProjects(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				this.setState( { projects: response.data, projectId: _projectId},
				 ); //change the current state. this will render 
			},
			(err) => { this.context.router.push('/notfound');}
		);
	}

	componentWillReceiveProps(nextProps){
		this.setState({ search: this.props.searchValue },
			this.loadProjects
		);
	}

	increaseAp(pId, likes) {
		var newProjects = this.state.projects.map((project) => {
			if(project.id === pId){
				project.likes = likes;
				return project;
			}
			return project;
		});
		this.setState({
			projects: newProjects
		});
	}

	loadProjects(e){
		var queryString = 'sortby='+this.state.sortBy;//+'&filter=Drug&filter=rna';
		queryString += '&search='+this.props.searchValue;
		var filterLen = this.state.filters.length;
		for(var i=0; i < filterLen; i++){ queryString += '&filter='+this.state.filters[i]; }
		queryString += '&filtersLen='+filterLen;
		queryString += '&from='+0+'&to='+9; //only called when the filter or sort is updated, (only get the initial projets)
		this.props.reloadProjects(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				var newProjectArr = response.data;
				this.setState( { projects: newProjectArr, getFrom: 0, getTo: 9 } );  
			}, (err) => { 
					this.context.router.push('/notfound')
			}
		);
	}

	generateMoreProjects(e){
		var queryString = 'sortby='+this.state.sortBy;
		queryString += '&search='+this.props.searchValue;
		var filterLen = this.state.filters.length;
		var currFrom = this.state.getFrom+9;
		var currTo = this.state.getTo+9;
		for(var i=0; i < filterLen; i++){ queryString += '&filter='+this.state.filters[i]; }
		queryString += '&filtersLen='+filterLen;
		queryString += '&from='+currFrom+'&to='+currTo; //only called when the filter or sort is updated, (only get the initial projets)

		this.props.reloadProjects(queryString).then(
			(res) => {
				var response = JSON.parse(res.request.response);
				var newProjectArr = this.state.projects;
				newProjectArr = newProjectArr.concat(response.data);
				var _getFrom = this.state.getFrom+9;
				var _getTo = this.state.getTo+9;
				this.setState( { projects: newProjectArr, getFrom: _getFrom, getTo: _getTo } );  
			}, (err) => { 
					this.context.router.push('/notfound')
			}
		);	
	}

	onChange(e){
		e.preventDefault();
	}
	
	handleSort(e){
		var selectedTarget = e.target.name;
		var newOptionsArr = this.state.sortByOptions;
		var newLabelsArr = this.state.sortByLabels;
		var indexOfSelectedTarget = newOptionsArr.indexOf(selectedTarget);
		//swap in options array
		var temp = newOptionsArr[0];
		newOptionsArr[0] = selectedTarget;
		newOptionsArr[indexOfSelectedTarget] = temp;
		//sqap in labels array 
		var temp1 = newLabelsArr[0];
		newLabelsArr[0] = newLabelsArr[indexOfSelectedTarget];
		newLabelsArr[indexOfSelectedTarget] = temp1;
		this.setState( {
			sortBy: newLabelsArr[0],
			sortByOptions: newOptionsArr,
			sortByLabels: newLabelsArr
		}, this.loadProjects);
		
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
				}, this.loadProjects);
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
			}, this.loadProjects);
		}
	}

	render (){
		const { isAuthenticated } = this.props.auth; //use the isAuthenticated field from this.props.auth
		const { user } = this.props.auth;  			 //use the user object from this.props.auth

		const signUp = (
			<Link to="/signup" style={{color: '#343950'}}><button className="button-signup"> Sign up  </button></Link>
		);
		return(
			<div>
				<div className="container-fluid general aaaamobile-margin animated zoomInLeft">
					<h1 className="home-title"> Showcase & Discover  </h1>
					{ isAuthenticated ? <h3 className="welcomeStyle"> Welcome {user.firstName}!  </h3> : signUp}
				</div>
				<hr width="85%"/>

				<div className="container-fluid showcase-layout animated zoomInRight">
					<div className="row">
						<div className="filter-style pull-left">
							<p> FILTER BY KEYWORDS </p>
							<div className="btn-group">
								<button name="Lattice: Honeycomb" onClick={this.handleFilters} className={this.state.filters.indexOf("Lattice: Honeycomb") >= 0 ? "greenBtn" : "filterBtn" }>Lattice: Honeycomb</button>
								<button name="2D" onClick={this.handleFilters} className={this.state.filters.indexOf("2D") >= 0 ? "greenBtn" : "filterBtn" }>2D</button>
								<button name="Material: RNA" onClick={this.handleFilters} className={this.state.filters.indexOf("Material: RNA") >= 0 ? "greenBtn" : "filterBtn" }>Material: RNA</button>
								<button name="3D" onClick={this.handleFilters} className={this.state.filters.indexOf("3D") >= 0 ? "greenBtn" : "filterBtn" }>3D</button>
								<button name="Scaffold: M13mp18" onClick={this.handleFilters} className={this.state.filters.indexOf("Scaffold: M13mp18") >= 0 ? "greenBtn" : "filterBtn" }>Scaffold: M13mp18</button>
							</div>
						</div>
						<div className="dropdown sort-style pull-right">
						  	<div className="sub-menu-parent">
							  	<p1> SORT BY: <p className="dropbtn btn  btn-mini" >{this.state.sortBy}<span className="caret"></span></p>
								  	<ul className="sub-menu">
								  		<li><p>< SortOption name={this.state.sortByOptions[1]} label={this.state.sortByLabels[1]} handleSort={this.handleSort}/></p></li>
								    	<li><p>< SortOption name={this.state.sortByOptions[2]} label={this.state.sortByLabels[2]} handleSort={this.handleSort}/></p></li>
								    	<li><p>< SortOption name={this.state.sortByOptions[3]} label={this.state.sortByLabels[3]} handleSort={this.handleSort}/></p></li>
								  	</ul>
								</p1>
						  	</div>
						</div>
					</div>
					<div className="hideit">
						{this.state.projectId ? <OpenProject projectId={this.state.projectId} increaseAp={this.increaseAp} getSingleProject={this.props.getSingleProject} /> : ''}
					</div>
					<div >
						<Gallery projects={this.state.projects} increaseAp={this.increaseAp} generateMoreProjects={this.generateMoreProjects} />
					</div>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	searchValue: React.PropTypes.string.isRequired,
	auth: React.PropTypes.object.isRequired,
	reloadProjects: React.PropTypes.func.isRequired,
	getSingleProject: React.PropTypes.func.isRequired
}

HomePage.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return { auth: state.auth };
}

export default connect(mapStateToProps, { reloadProjects, getSingleProject })(HomePage);
