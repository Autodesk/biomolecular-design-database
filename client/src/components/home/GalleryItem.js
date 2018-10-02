import React from 'react';
import './Home.css';
import Modal from 'react-modal';
import ReadProject from './readProject/ReadProject';
import './readProject/modal.css';
import './readProject/modalQueries.css';
import appreciation from '../../../public/Assets/icons/appreciations.svg';
import views from '../../../public/Assets/icons/views.svg';
import ratingOff from '../../../public/Assets/icons/ratingOff.svg';
import ratingOn from '../../../public/Assets/icons/ratingOn.svg';
import noImg from '../../../public/Assets/no-img.jpg';
import S3Image from '../S3Image';

class GalleryItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			modalActive: false
		};
		this.onClick = this.onClick.bind(this);
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
	}

	componentWillMount(){
		if(this.props.modalActive){ //called directyly by the home page if the project id was queried
			this.setState({modalActive: this.props.modalActive});
		}
	}

	activateModal(){
		this.setState({ modalActive: true });
	};

	deactivateModal(){
		this.setState({modalActive: false });
	};

	onClick(e){
		e.preventDefault();
	};

	render(){
		//MODAL
		const customStyles = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.80)',
		    padding			  : '0px',
		    zIndex 			  : 1050
		  },
		  content : {
		    position                   : 'absolute',
		    top                        : '0px',
		    left                       : '50px',
		    right                      : '50px',
		    bottom 					   : '0px',
		    paddingTop 				   : '2%',
		    paddingLeft				   : '0px',
		    paddingRight 			   : '0px',
		    marginBottom 			   : '0px',
		    minHeight 				   : '100%',
		    margin 					   : 'auto',
		    maxWidth 				   : '1350px',
		    border                     : 'none',
		    background                 : 'transparent',
		    outline                    : 'none',
		    overflow                   : 'auto'
		  }
		};

		const modal = <Modal
				isOpen={this.state.modalActive}
				onAfterOpen={this.activateModal}
				onRequestClose={this.deactivateModal}
				style={customStyles}
				contentLabel="Modal Open">
					<ReadProject project={this.props.project} increaseAp={this.props.increaseAp} deactivateModal={this.deactivateModal} />
				</Modal>
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
	
		<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout" onClick={this.activateModal}>
	      	<S3Image className="img-responsive project-image" src={this.props.project.header_image_link ? this.props.project.header_image_link : noImg } alt=""/>
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
		  	       	<img src={appreciation} className="img-icon-styling" alt="appreciations"/><strong className="likes-style"> {this.props.project.likes} </strong>
		           	<img className="views-style img-icon-styling" src={views} alt="views"/><strong className="likes-style"> {this.props.project.views}</strong>
	            </div>
            </div>
            {modal}
	    </div> 
	);
}
}

GalleryItem.propTypes = {
	project: React.PropTypes.object.isRequired,
	increaseAp: React.PropTypes.func
}

export default GalleryItem;
