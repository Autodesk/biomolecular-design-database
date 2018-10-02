import React from 'react';
import './Home.css';

const GalleryRow= ({itemArr}) => {
	
	return (
		<div className="row">
			{itemArr}
		</div>
	);
}

GalleryRow.propTypes = {
	itemArr: React.PropTypes.array.isRequired
}



export default GalleryRow;