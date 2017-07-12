import React from 'react';
import Lightbox from 'react-image-lightbox';
import path from 'path';


const customStyles = {
	    overlay : {
	    position          : 'fixed',
	    zIndex 			  : 9999
	}
}

class FileWriteDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpen: false,
            lightboxDisplay: '',
            title: '',
            details: ''
		}
		this.onChange = this.onChange.bind(this);
	}

	onChange(e){
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	componentWillMount(){
		if(this.props.file.file_link){
			this.setState ({
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
		}
		this.setState({
			title: this.props.file.title,
			details: this.props.file.description
		});
	}

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
	
	render(){
		const {
            isOpen, lightboxDisplay
        } = this.state;
		const type = this.props.file.type;
		const imgBool = this.imgOrNot(type);
		const fileName = path.basename(this.props.file.file_name);
		const nonImg = this.toDisplayName(fileName);

		return(
			<div>
			<div className="single-file container-fluid" >
				<div className="file-title-write"><input type='text' placeholder="Title*" onChange={this.onChange} value={this.state.title ? this.state.title : ''} name="title" /></div>
				<div className="col-sm-12 file-image" >
					{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
				</div>
				<div className="file-abstract-input">
					<textarea type='text' placeholder="File Details" value={this.state.details} onChange={this.onChange} name="details" rows='5'></textarea>
				</div>
				<div className="row file-btns">
					<button className="btn upload-media-btn">Upload Additional Media</button>
					<button className="btn done-file-btn"> Done </button>
				</div>
				{isOpen ? lightboxDisplay : ''}
				
			</div>
			<hr className="hr-display"/>
			</div>
		);
	}
}

FileWriteDisplay.propTypes = {
	file: React.PropTypes.object
}

export default FileWriteDisplay;
