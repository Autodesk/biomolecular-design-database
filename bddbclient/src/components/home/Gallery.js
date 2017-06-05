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
		console.log(nextProps);
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
		
		return(
			<div>
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

			