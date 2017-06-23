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
	    if(nextProps.projects.length%9 === 0){ projectItems = nextProps.projects;}
	    else if(nextProps.projects.length%9 !== 0){projectItems = nextProps.projects; _hasMore = false;}

	    const initialGalleryItems = projectItems.map((project) => {
			return < GalleryItem key={project.id} increaseAp={this.props.increaseAp} project={project} /> 
		});
		this.setState({
			loadedProjects: 9,
			hasMore: _hasMore,
			divs: initialGalleryItems
		});
	}

	render() {
		//on change if we want to render an object, place it here
		//const projectsArr = props.projects;
		const styling = {
			overflow: 'hidden'
		}
		const itemsPresent = (
			<div className="container-fluid">
			    <InfiniteScroll
		         	next={this.props.generateMoreProjects }
		         	hasMore={this.state.hasMore}
		         	style={styling}
		          	loader={
    					<h4> Loading...</h4>  
					}>
			        {this.state.divs}
	   	        </InfiniteScroll>
		    </div>
		);

		const noItems = (
			<h2 className="nothing-found header">No Projects Found...  </h2>  
		);
		return(
			<div className="container-fluid gallery-style">
			 	{ this.state.divs.length > 0 ? itemsPresent : noItems}
      		</div>
		);
	}
}


Gallery.propTypes = {
	projects: React.PropTypes.array.isRequired,
	generateMoreProjects: React.PropTypes.func.isRequired,
	increaseAp: React.PropTypes.func.isRequired
}
Gallery.contextTypes = {  //context 
	router: React.PropTypes.object.isRequired
}


export default Gallery;

			