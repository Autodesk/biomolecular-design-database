import React from 'react';
import './Home.css';
import Modal from 'react-modal';
import ReadProject from './readProject/ReadProject';
import './readProject/modal.css';

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
		console.log(e.target);
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
		    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
		    padding			  : '0px',
		    zIndex : 1050
		  },
		  content : {
		    position                   : 'absolute',
		    top                        : '0px',
		    left                       : '0px',
		    right                      : '0px',
		    paddingTop 					: '3%',
		    paddingBottom 				: '3%',
		    minHeight 					: '100%',
		    marginLeft					: '13%',
		    marginRight					: '13%',
		    width						: '74%',
		    border                     : 'none',
		    background                 : 'transparent',
		    WebkitOverflowScrolling    : 'hidden',
		    borderRadius               : '4px',
		    outline                    : 'none',
		    overflow                   : 'auto',
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
				ticks.push(<span className='green-tick glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
			else{
				ticks.push(<span className='glyphicon glyphicon-ok-circle' aria-hidden='true'></span>);
			}
		}

	return (
	
		<div className="col-lg-3 col-md-4 col-xs-12 showcase-item-layout" onClick={this.activateModal}>
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
	  	       	<i className="fa fa-thumbs-o-up" aria-hidden="true"></i><strong>{this.props.project.likes}</strong>
	           	<i className="fa fa-eye" aria-hidden="true"> </i><strong>{this.props.project.views}</strong>
            </div>
            </div>
            {modal}
	    </div> 
	);
}
}

GalleryItem.propTypes = {
	project: React.PropTypes.object.isRequired,
	increaseAp: React.PropTypes.func.isRequired
}

export default GalleryItem;