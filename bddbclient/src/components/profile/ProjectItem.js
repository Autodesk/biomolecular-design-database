import React from 'react';
import '../home/Home.css';
import '../home/readProject/modal.css';
import '../home/readProject/modalQueries.css';
import appreciation from '../../../public/Assets/icons/appreciations.svg';
import views from '../../../public/Assets/icons/views.svg';
import ratingOff from '../../../public/Assets/icons/ratingOff.svg';
import ratingOn from '../../../public/Assets/icons/ratingOn.svg';
import deleteIcon from '../../../public/Assets/icons/delete.svg';
import edit from '../../../public/Assets/icons/edit.svg';
import Modal from 'react-modal';
import ReadProject from '../home/readProject/ReadProject';

class ProjectItem extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			modalActive: false,
			deleteAlert: false,
			showCopied: false
		}
		this.deleteClicked = this.deleteClicked.bind(this);
		this.toggleCopied = this.toggleCopied.bind(this);
		this.changeShowCopied = this.changeShowCopied.bind(this);
		this.onClick = this.onClick.bind(this);
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
		this.activateDeleteAlert = this.activateDeleteAlert.bind(this);
		this.closeDeleteAlert = this.closeDeleteAlert.bind(this);

	}
	deleteClicked(){
		var queryString = "project_id="+this.props.project.id;
		this.props.onDeleteClick(queryString);
	}
	changeShowCopied(){
		this.setState({ showCopied :  false});
	}

	toggleCopied(){
		if(!this.state.showCopied){
			console.log('changed');
			this.setState({ showCopied: true});
		}
		setTimeout(this.changeShowCopied, 6000);
	}

	activateModal(){
		this.setState({ modalActive: true });
	};

	deactivateModal(){
		this.setState({modalActive: false });
	};

	activateDeleteAlert(){
		this.setState({ deleteAlert: true });
	}

	closeDeleteAlert(){
		this.setState({ deleteAlert: false });
	}

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
		    backgroundColor   : 'rgba(0, 0, 0, 0.85)',
		    padding			  : '0px',
		    zIndex : 1050
		  },
		  content : {
		     position               : 'absolute',
		    top                     : '0px',
		    left                    : '0px',
		    right                   : '0px',
		    bottom 					: '0px',
		    paddingTop 			    : '2%',
		    paddingLeft				: '0px',
		    paddingRight 			: '0px',
		    marginBottom 			: '0px',
		    minHeight 				: '100%',
		    margin 					: 'auto',
		    maxWidth 				: '1400px',
		    border                  : 'none',
		    background              : 'transparent',
		    outline                 : 'none',
		    overflow                : 'auto'
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
		const deleteMessage = (
			<div className="delete-alert"> 
				<p> Delete? You can't undo this action </p>
				<button className="button-delete" onClick={this.deleteClicked} > Yes, delete project </button>
				<p className="delete-alert-cancel" onClick={this.closeDeleteAlert}> Cancel </p>
			</div>
		);
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
	
		<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout project-item-layout">
			<div className="delete-project"> < img src={deleteIcon} onClick={this.activateDeleteAlert} alt="delete icon"/></div>
			{this.state.deleteAlert ? deleteMessage : '' }
			<div className="edit-icon"> < img src={edit} alt="edit icon"/></div>
	      	<img className="img-responsive project-image" onClick={this.activateModal} src={this.props.project.header_image_link} alt=""/>
	        <h4 className="project-item-title" onClick={this.activateModal}>{this.props.project.name}</h4>
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
	  	       	<img src={appreciation} alt="appreciations"/><strong className="likes-style"> {this.props.project.likes} </strong>
	           	<img className="views-style" src={views} alt="views"/><strong className="likes-style"> {this.props.project.views}</strong>
            </div>
            </div>
	    	{modal}
	    </div> 
	    
	);
}
}

ProjectItem.propTypes = {
	project: React.PropTypes.object.isRequired,
	increaseAp: React.PropTypes.func,
	onDeleteClick: React.PropTypes.func.isRequired
}
export default ProjectItem;
