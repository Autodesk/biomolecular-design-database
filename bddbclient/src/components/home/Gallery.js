import React from 'react';
import GalleryRow from './GalleryRow';
import GalleryItem from './GalleryItem';
import './Home.css';
import InfiniteScroll from 'react-infinite-scroll-component';



class Gallery extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			loadedProjects: 0,
			projects: [],
			projectItems: [],
			hasMore: true,
			divs: []
		}
		this.generateProjects = this.generateProjects.bind(this);
	}

	generateProjects () {	    
	    const galleryItems = this.props.projects.map((project) => {
			return < GalleryItem key={project.id} project={project} /> 
		});
	    setTimeout(() => {
	      this.setState({divs: this.state.divs.concat(galleryItems), hasMore: false});
	    }, 500);
	  }
	  
	getGridRow(arr) {
		console.log('gridcalled');
		let grid = []; //[<div row> p1 p2 p3 </div> ....]
		let currRow = [];
		let counter = 0;
		for(var i=0; i < arr.length; i++, counter++){
			if(counter !== 3){currRow.push(arr[i]); console.log('pushesd item ');}
			else { //counter === 3
				grid.push(<GalleryRow key={i} itemArr={currRow} />);
				counter = 0;
				currRow = [];
				currRow.push(arr[i]);
				console.log('pushed row');
			}
		}
		//grid.push(<GalleryRow key={arr.length} itemArr={currRow} />);
		console.log(grid);
		grid.push(currRow);
		return grid;
	}

	render() {
		//on change if we want to render an object, place it here
		//const projectsArr = props.projects;
		var initialProjects = [];
	    if(this.props.projects.length >= 6){ initialProjects = this.props.projects.slice(0, 6); 
	    	
	    }
	    if(this.props.projects.length < 6){initialProjects = this.props.projects}

	    const initialGalleryItems = initialProjects.map((project) => {
				return < GalleryItem key={project.id} project={project} /> 
		});

		return(
			<div>
				<div className="container-fluid">
			 		{this.getGridRow(initialGalleryItems)}
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


			