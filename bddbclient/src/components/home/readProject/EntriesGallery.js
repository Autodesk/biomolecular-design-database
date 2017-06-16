import React from 'react';
import './modal.css';
import FileItem from './FileItem.js';

class EntriesGallery extends React.Component{
	componentWillMount(){
    	console.log('mountiong etries');
    }
	render() {
		const fileDisplay = this.props.files.map((file) => {
			return <FileItem key={file.id} file={file} getSignedUrl={this.props.getSignedUrl} />
		});
		return(
			<div>
				{fileDisplay}
			</div>
		);
	}
}



EntriesGallery.propTypes = {
	files: React.PropTypes.array.isRequired,
	getSignedUrl: React.PropTypes.func.isRequired
}

export default EntriesGallery;

