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
			hasMore: true,
			divs: [] //projects to display
		}
	}

	getGridRow(arr) {
		//fits 3 project displays in a row for a responsive view
		let grid = []; //[<div row> p1 p2 p3 </div>, ....]
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
		grid.push(<GalleryRow key={arr.length} itemArr={currRow} />);
		return grid;
	}
	
	componentWillReceiveProps(nextProps) {
		var projectItems = [];
		var _hasMore = true;
	    if(nextProps.projects.length%6 === 0){ projectItems = nextProps.projects;}
	    else if(nextProps.projects.length%6 !== 0){projectItems = nextProps.projects; _hasMore = false;}

	    const initialGalleryItems = projectItems.map((project) => {
			return < GalleryItem key={project.id} project={project} /> 
		});
		this.setState({
			loadedProjects: 6,
			hasMore: _hasMore,
			divs: initialGalleryItems
		});
	}

	render() {
		//on change if we want to render an object, place it here
		//const projectsArr = props.projects;
		
		const itemsPresent = (
			<div className="container-fluid">
			    <InfiniteScroll
		         	next={this.props.generateMoreProjects }
		         	hasMore={this.state.hasMore}
		          	loader={
    					<h4>Loading...</h4>  
					}>
			        {this.getGridRow(this.state.divs)}
	   	        </InfiniteScroll>
		    </div>
		);

		const noItems = (
			<h2 className="nothing-found header">No Projects Found... </h2>  
		);
		return(
			<div>
			 	{ this.state.divs.length > 0 ? itemsPresent : noItems}
      		</div>
		);
	}
}


Gallery.propTypes = {
	projects: React.PropTypes.array.isRequired,
	generateMoreProjects: React.PropTypes.func.isRequired
}
Gallery.contextTypes = {  //context 
	router: React.PropTypes.object.isRequired
}


export default Gallery;

			