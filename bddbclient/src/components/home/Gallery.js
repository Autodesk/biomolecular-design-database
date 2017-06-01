import React from 'react';
import GalleryRow from './GalleryRow';
import GalleryItem from './GalleryItem';
import './Home.css';
import InfiniteScroll from 'react-infinite-scroll-component';
//import InfiniteGrid from 'react-infinite-grid';
//import { getProjects } from '../../actions/homePageActions';
//import { connect } from 'react-redux';
/*
import i1 from '../../../public/Assets/BDDSampleFiles/AutodeskALogo_V2.png';
import i2 from '../../../public/Assets/BDDSampleFiles/AutodeskALogo.png';
import i3 from '../../../public/Assets/BDDSampleFiles/Monolith_MeltingTemperature.png';
import i4 from '../../../public/Assets/BDDSampleFiles/Monolith_Wireframe.png';
import i5 from '../../../public/Assets/BDDSampleFiles/SquareNut_Temperatures.png';
import i6 from '../../../public/Assets/BDDSampleFiles/SquareNut.png';
*/


class Gallery extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			loadedProjects: 0,
			generateProjectsCount: 0,
			hasMore: true,
			divs: []
		}
		this.generateProjects = this.generateProjects.bind(this);
	}

	getGridRow(arr) {
		console.log(arr);
		//fits 3 project displays in a row for a responsive view
		let grid = []; //[<div row> p1 p2 p3 </div> ....]
		let currRow = [];
		let counter = 0;
		for(var i=0; i < arr.length; i++, counter++){
			if(counter !== 3){currRow.push(arr[i]); }
			else { //counter === 3
				grid.push(<GalleryRow key={i} itemArr={currRow} />);
				counter = 0;
				currRow = [];
				currRow.push(arr[i]);
			}
		}
		//grid.push(<GalleryRow key={arr.length} itemArr={currRow} >);
		//console.log(grid);
		grid.push(<GalleryRow key={arr.length} itemArr={currRow} />);
		return grid;
	}
	
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps called');
		console.log(nextProps.projects);
		var initialProjects = [];
		
	    if(nextProps.projects.length >= 6){ initialProjects = nextProps.projects.slice(0, 6);}
	    else if(nextProps.projects.length < 6){initialProjects = nextProps.projects}

	    const initialGalleryItems = initialProjects.map((project) => {
			return < GalleryItem key={project.id} project={project} /> 
		});
		this.setState({
			loadedProjects: 0,
			generateProjectsCount: 0,
			hasMore: true,
			divs: initialGalleryItems
		});

	}

	generateProjects (e) {
		console.log(this.props.projects);
		let propsProject = this.props.projects;
	    let loadMoreProjects = [];
	    let _loadedProjects = this.state.loadedProjects;
	    let _projectLength = propsProject.length;
	    let _hasMore = true;
	    let _generateProjectsCount = this.state.generateProjectsCount+1;

	    if(this.state.generateProjectsCount === 0){
	  		_loadedProjects = 6; //initially loaded projects count (6)
	    }

	    if(_loadedProjects+6 <= _projectLength){
	    	loadMoreProjects = propsProject.slice(_loadedProjects, _loadedProjects+6);
	    	_loadedProjects += 6;
	    }
	    
	    else if(_loadedProjects+6 > _projectLength){
	    	loadMoreProjects = propsProject.slice(_loadedProjects, _projectLength);
	    	_hasMore = false;
	    	_loadedProjects = _projectLength;
	    }
	    
	    const moreItems = loadMoreProjects.map((project) => {
			return < GalleryItem key={project.id} project={project}/ > 
		});
	    console.log(loadMoreProjects.length);
	    setTimeout(() => {
	      this.setState({
	      	divs: this.state.divs.concat(moreItems), 
	      	generateProjectsCount: _generateProjectsCount, 
	      	loadedProjects: _loadedProjects, 
	      	hasMore: _hasMore});
	    }, 500);

	  }
	  

	render() {
		//on change if we want to render an object, place it here
		//const projectsArr = props.projects;
		

		return(
			<div>
				
			 	<div className="container-fluid">
			        <InfiniteScroll
			          next={this.generateProjects}
			          hasMore={this.state.hasMore}
			          loader={<h4>Loading...</h4>}>
			          {this.getGridRow(this.state.divs)}
			        </InfiniteScroll>
			    </div>
		        
      		</div>
		);
	}
}


Gallery.propTypes = {
	projects: React.PropTypes.array.isRequired
}
Gallery.contextTypes = {  //context 
	router: React.PropTypes.object.isRequired
}


export default Gallery;

/*<InfiniteScroll
		          next={this.generateProjects}
		          hasMore={this.state.hasMore}
		          loader={<h4>Loading...</h4>}>
		          {this.state.divs}
		        </InfiniteScroll>*/
// <div className="container-fluid">
//			 	{galleryItems}
//			 </div>
//<button name="d"  onClick={this.loadProjects} >loadProjects </button>
//export default connect(null, { getProjects })(Gallery); 

			