import React from 'react';
import Modal from 'react-modal';
import './upload.css';
import WritePage from './WritePage.js';

class UpoloadNew extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modalActive: true
		}
		this.activateModal = this.activateModal.bind(this);
		this.deactivateModal = this.deactivateModal.bind(this);
	}

	activateModal(){
		this.setState({ modalActive: true });
	}

	deactivateModal(){
		this.setState({ modalActive: false });
		if(this.props.closeBool) {
			this.props.closeWrite();
		}
	}
	componentWillMount(){
		console.log(this.props.project);
	}
	render(){
		const customStyles = {
		  overlay : {
		    position          : 'fixed',
		    top               : 0,
		    left              : 0,
		    right             : 0,
		    bottom            : 0,
		    backgroundColor   : 'rgba(0, 0, 0, 0.85)',
		    padding			  : '0px',
		    paddingRight	  : '52px',
		    paddingLeft		  : '52px',
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
		    maxWidth 				: '1360px',
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
					<WritePage deactivateModal={this.deactivateModal}/>
				</Modal>

		return(
			<div>
				{modal}
			</div>
		);
	}
}

UpoloadNew.propTypes = {
	closeWrite: React.PropTypes.func,
	closeBool: React.PropTypes.bool
}
export default UpoloadNew;
