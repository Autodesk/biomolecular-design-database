import React from 'react';
import './modal.css';

class testMolViewer extends React.Component{

	render() {
		return(
			<div className="single-file container-fluid" >
				<h5 className="file-item-title">Protein Molecule viewer</h5>
				<div className="col-sm-12 file-image" >
					<iframe className="molecular-viewer" src="https://molviewer.com/?session=1cc72bf0-5837-11e7-8435-cf313ee3409d&tV=embed"></iframe>
				</div>
				<div className="file-details">
					<p > A Protein Molecule </p>
				</div>
				<hr/>
			</div>
		);
	}
}

export default testMolViewer;
