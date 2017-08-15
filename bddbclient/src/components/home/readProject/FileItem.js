import React from 'react';
import './modal.css';
//import i1 from './a.png';
import htmlToText from 'html-to-text';
import path from 'path';
import Lightbox from 'react-image-lightbox';
//import validator from 'youtube-validator';

const customStyles = {
	    overlay : {
	    zIndex 			  : 9999
	}
}
var images = [];

class FileItem extends React.Component{
	constructor(props) {
        super(props);
 
        this.state = {
            isOpen: false,
            photoIndex: 0,
            downloadable: true,
            lightboxDisplay: '',
            videoLink : '',
            youtubeId: '',
            validYoutubeLink: false
        };
        this.getSignedUrlToDownload = this.getSignedUrlToDownload.bind(this);
    }
    componentWillMount(){
      if(this.props.file.video){
          var url = this.props.file.videoLink;
          console.log(url);
          if(url.indexOf("www.youtube.com") > -1){
              var ind = url.indexOf('watch?v=');
              var id = url.slice(ind+8, url.length);
              console.log(id);
              this.setState({ validYoutubeLink: true, youtubeId: id });
          }
      }
    	if(!this.props.file.file_link){ //link is undefined
	    	this.setState({ downloadable: false, linkPresent: false });
    	}
    	else if(this.props.file.links_array.length <= 0){
    		this.setState ({
				lightboxDisplay:	<Lightbox
						reactModalStyle={customStyles}
                        mainSrc={this.props.file.file_link}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    /> 
	    	});
    	}
    	else{
    		//var images = this.props.file.links_array;
    		images = ['https://www.w3schools.com/css/trolltunga.jpg', 'https://tse4.mm.bing.net/th?id=ORT.TH_470633631&pid=1.12&eid=G.470633631', 'https://s-media-cache-ak0.pinimg.com/originals/1f/dd/a0/1fdda06cf10ff1c105e61ab8812920d8.jpg' ];
 
    		this.setState ({
				lightboxDisplay:	<Lightbox
						mainSrc={images[this.state.photoIndex]}
                        nextSrc={images[(this.state.photoIndex + 1) % images.length]}
                        prevSrc={images[(this.state.photoIndex + images.length - 1) % images.length]}
						reactModalStyle={customStyles}
                       
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() => this.setState({
                            photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
                        })}
                        onMoveNextRequest={() => {
                        	console.log(images[this.state.photoIndex]);
                        	this.setState({
                            photoIndex: (this.state.photoIndex + 1) % images.length,
                        })}}
                    /> 
	    	});
   	 	}
   	 }

   	componentWillReceiveProps(nextProps){
   	 	console.log(nextProps);
   	 	var _videoLink = '';
   	 	if(nextProps.file.video){
   	 		var url = nextProps.file.videoLink;
   	 		console.log(url);
   	 		if(url.indexOf("www.youtube.com") > -1){
     	 			var ind = url.indexOf('watch?v=');
     	 			var id = url.slice(ind+8, url.length);
     	 			console.log(id);
     	 			this.setState({ validYoutubeLink: true, youtubeId: id });
   	 		}
   	 		
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

	toDisplayName(){
		var baseName = path.basename(this.props.file.file_name, path.extname(this.props.file.file_name));
		if(baseName === 'null'){
			return <p></p>;
		}
		else{
			var extName = path.extname(this.props.file.file_name);
			return <span className="plain-background"><h5>{baseName} <br/>({extName} file) </h5></span>;
		}
	}


	render() {
		
		const {
            isOpen, lightboxDisplay
        } = this.state;
 
		const details = '<p>'+this.props.file.description+'</p>';
		const text = htmlToText.fromString(details);
		const type = this.props.file.type;
		const imgBool = this.imgOrNot(type);
		const nonImg = this.toDisplayName();
		const youtubeUrl = 'https://www.youtube.com/embed/'+this.state.youtubeId;

		return(
			<div className="single-file container-fluid" >
				<hr/>
				<h5 className="file-item-title">{this.props.file.title}</h5>
				<div className="col-sm-12 file-image" >
					{imgBool ? <img className="img-responsive image-file-style" onClick={() => this.setState({ isOpen: true })} src={ this.props.file.file_link } alt=""/> : nonImg}
					{this.state.validYoutubeLink ?  <iframe src={youtubeUrl} className="youtube-video-style"></iframe> : ''}
				</div>
				<div className="file-details">
					<p > {text} </p>
				</div>
				{this.state.downloadable ? <a href={this.props.file.file_link} className="download" download>DOWNLOAD</a> : ''}
		
				{isOpen ? lightboxDisplay : ''}
			</div>
		);
	}
}

FileItem.propTypes = {
	file: React.PropTypes.object.isRequired,
	getSignedUrl: React.PropTypes.func.isRequired
}

export default FileItem;
