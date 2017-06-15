import React from 'react';
import './modal.css';
import Modal from 'react-modal';
import i1 from './a.png';
import htmlToText from 'html-to-text';
import path from 'path';

class FileItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalActive: false
		};
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
	}

	activateModal(){
		this.setState({ modalActive: true });
	};

	deactivateModal(){
		this.setState({modalActive: false });
	};

	imgOrNot(type){
		if(type){ //type is not null
			type = type.toString();
			if(type.indexOf('image') !== -1){
				return true;
			}
			return false;
		}
		return false;
	}

	toDisplayName(name){
		if(name === 'null'){
			return <p></p>;
		}
		return <span className="plain-background"><h5>{name}</h5></span>;
	}

	render() {
		const details = '<p>'+this.props.file.description+'</p>';
		const text = htmlToText.fromString(details);
		const type = this.props.file.type;
		const imgBool = this.imgOrNot(type);
		const fileName = path.basename(this.props.file.file_name);
		const nonImg = this.toDisplayName(fileName);
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
		    paddingTop 					: '0',
		    paddingBottom 				: '0',
		    minHeight 					: '100%',
		    marginLeft					: '13%',
		    marginRight					: '13%',
		    width						: '74%',
		    border                     : 'none',
		    background                 : 'transparent',
		    WebkitOverflowScrolling    : 'hidden',
		    borderRadius               : '4px',
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
					<img className="modal-display" src={ imgBool ? this.props.file.file_link : i1} alt=""/>
				</Modal>

		return(
			<div className="single-file container-fluid" >
				<h5 className="file-item-title">{this.props.file.title}</h5>
				<div className="file-image" >
					{imgBool ? <img className="pull-left" onClick={this.activateModal} src={ this.props.file.file_link } alt=""/> : nonImg}
				</div>
				<div className="file-details">
					<p > {text} </p>
				</div>
				<a className="download" href={this.props.file.file_link} download>DOWNLOAD</a>
				{modal}
				<hr/>
			</div>
		);
	}
}

FileItem.propTypes = {
	file: React.PropTypes.object.isRequired
}

export default FileItem;
