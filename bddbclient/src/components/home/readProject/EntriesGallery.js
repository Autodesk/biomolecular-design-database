import React from 'react';
import './modal.css';
import FileItem from './FileItem.js';

class EntriesGallery extends React.Component{

	render() {
		const fileDisplay = this.props.files.map((file) => {
			return <FileItem key={file.id} file={file} />
		});
		return(
			<div>
				{fileDisplay}
			</div>
		);
	}
}

EntriesGallery.propTypes = {
	files: React.PropTypes.array.isRequired
}
export default EntriesGallery;