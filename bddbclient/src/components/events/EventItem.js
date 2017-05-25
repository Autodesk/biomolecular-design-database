import React from 'react';
import './Event.css';
import fileExtension from 'file-extension';

class EventItem extends React.Component{
	toPreview(file){
		const fileName=file[0].name;
		//returns link to img to display as a preview
		if(fileExtension(fileName)==='jpg'||fileExtension(fileName)==='png'||fileExtension(fileName) === 'jpeg'){
			return file[0].preview;
		}
		return file[0].preview;
	}


	render() {
		//const key=this.props.key;
		const file=this.props.file;
		
		return (
	
			<div className="itemContainer">
			<li className="itemLayout"> 
				<h3>{file[0].name.substring(0,file[0].name.length - fileExtension(file[0].name).length-1)}</h3>
				<div className="container">
					<div className="col-md-4" >
				        <img  src={this.toPreview(file)} alt={file[0].name} className='image image-responsive'/>
				    </div>
				</div>
				<div className="middle">
					<i className="fa fa-remove remove fa-3x" aria-hidden="true"></i> 
				</div>
			</li>
			<hr/>
			</div>
		)
	}
}


export default EventItem;
