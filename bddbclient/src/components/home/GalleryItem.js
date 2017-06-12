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
		    top               : 20,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
		    padding			  : '0px',
		    z_index : 1050
		  },
		  content : {
		    position                   : 'absolute',
		    top                        : '60px',
		    left                       : '0px',
		    right                      : '0px',
		    bottom                     : '0px',
		    border                     : 'none',
		    background                 : 'rgba(0, 0, 0, 0.10)',
		    overflow                   : 'auto',
		    WebkitOverflowScrolling    : 'hidden',
		    borderRadius               : '4px',
		    outline                    : 'none'

		  }
		};

		const modal = <Modal
				isOpen={this.state.modalActive}
				onAfterOpen={this.activateModal}
				onRequestClose={this.deactivateModal}
				style={customStyles}
				contentLabel="Modal Open">
					<ReadProject project={this.props.project} deactivateModal={this.deactivateModal} />
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
		<div className="col-lg-3 col-md-4 col-xs-12 showcase-item-layout">
	      	<img className="img-responsive project-image" src={this.props.project.header_image_link} alt=""/>
	        <h4 className="project-item-title" onClick={this.activateModal} >{this.props.project.name}</h4>
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
	  	       	<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{this.props.project.likes}
	           	<i className="fa fa-eye" aria-hidden="true"> </i>{this.props.project.views}
            </div>
            </div>
            {modal}
	    </div> 
	);
}
}

GalleryItem.propTypes = {
	project: React.PropTypes.object.isRequired
}

export default GalleryItem;