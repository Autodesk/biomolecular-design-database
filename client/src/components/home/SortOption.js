import React from 'react';
import './Home.css';

const SortOption = ({name, label, handleSort}) => {
	return (
		<button className="sort-button" name={name} onClick={handleSort}>{label}</button>
	  
	);
}

SortOption.propTypes = {
	name: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	handleSort: React.PropTypes.func.isRequired
}



export default SortOption;