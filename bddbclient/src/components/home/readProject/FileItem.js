import React from 'react';
import './modal.css';
//import i1 from './a.png';
import htmlToText from 'html-to-text';
import path from 'path';
import Lightbox from 'react-image-lightbox';

const customStyles = {
	    overlay : {
	    position          : 'fixed',
	    zIndex 			  : 9999
	}
}

class FileItem extends React.Component{
	constructor(props) {
        super(props);
 
        this.state = {
            isOpen: false,
            downloadable: true,
            lightboxDisplay: ''
        };
        this.getSignedUrlToDownload = this.getSignedUrlToDownload.bind(this);
    }
    componentWillMount(){
    	if(!this.props.file.file_link){ //link is undefined
	    	this.setState({ downloadable: false, linkPresent: false });
    	}
    	else{
    		this.setState ({
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
   	 	}
   	 }

   	 getSignedUrlToDownload(e){
   	 	e.preventDefault();
   	 	const fileIdQuery = 'fileId='+this.props.file.id;
		this.props.getSignedUrl(fileIdQuery).then(
			(res) => {
				const link = JSON.parse(res.request.response).url;
				return link;
			},
			(err) => { console.log(err); 
					return null;
			}
		);

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


	render() {
		
		const {
            isOpen, lightboxDisplay
        } = this.state;
 
		const details = '<p>'+this.props.file.description+'</p>';
		const text = htmlToText.fromString(details);
		const type = this.props.file.type;
		const imgBool = this.imgOrNot(type);
		const fileName = path.basename(this.props.file.file_name);
		const nonImg = this.toDisplayName(fileName);
		

		return(
			<div className="single-file container-fluid" >
				<h5 className="file-item-title">{this.props.file.title}</h5>
				<div className="col-sm-12 file-image" >
					{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
				</div>
				<div className="file-details">
					<p > {text} </p>
				</div>
				{this.state.downloadable ? <a href={this.props.file.file_link} className="download" download>DOWNLOAD</a> : ''}
				{isOpen ? lightboxDisplay : ''}
				<hr/>
			</div>
		);
	}
}

FileItem.propTypes = {
	file: React.PropTypes.object.isRequired,
	getSignedUrl: React.PropTypes.func.isRequired
}

export default FileItem;
