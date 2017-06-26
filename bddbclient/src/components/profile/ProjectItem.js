import React from 'react';
import '../home/Home.css';
import '../home/readProject/modal.css';
import '../home/readProject/modalQueries.css';
import appreciation from '../../../public/Assets/icons/appreciations.svg';
import views from '../../../public/Assets/icons/views.svg';
import ratingOff from '../../../public/Assets/icons/ratingOff.svg';
import ratingOn from '../../../public/Assets/icons/ratingOn.svg';

class ProjectItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			modalActive: false
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e){
		e.preventDefault();
		console.log(e.target);
	};

	render(){
		const qod = this.props.project.quality_of_documentation;
		var counter = 0;
		const authors = this.props.project.authors.map((author) => {
			counter++;
			if(counter === 1){ return author; }
			return ', '+author;
		})
		var ticks = [];
		for(var i = 0; i < 5; i++){
			if( i < qod){
				ticks.push(<img className="ticks-style" src={ratingOn} alt="green tick"/>);
			}
			else{
				ticks.push(<img className="ticks-style" src={ratingOff} alt="grey tick"/>);
			}
		}

	return (
	
		<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	      	<img className="img-responsive project-image" src={this.props.project.header_image_link} alt=""/>
	        <h4 className="project-item-title" >{this.props.project.name}</h4>
	        <p className="authors-styling">{authors}</p>
	        <hr/>
	        <div className="tick-stat row">
	        <div className="tick">
		        {ticks[0]}
		        {ticks[1]}
		        {ticks[2]}
		        {ticks[3]}
		        {ticks[4]}
	        </div>
	  
    	    <div className="stats"> 
	  	       	<img src={appreciation} alt="appreciations"/><strong className="likes-style">{this.props.project.likes}</strong>
	           	<img className="views-style" src={views} alt="views"/><strong className="likes-style">{this.props.project.views}</strong>
            </div>
            </div>
	    </div> 
	);
}
}

ProjectItem.propTypes = {
	project: React.PropTypes.object.isRequired,
	increaseAp: React.PropTypes.func
}

export default ProjectItem;