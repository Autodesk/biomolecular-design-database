import React from 'react';
//import ComponentGallery from 'react-component-gallery';
//import GalleryItem from './GalleryItem';
import './Home.css';
import i1 from '../../../public/Assets/BDDSampleFiles/AutodeskALogo_V2.png';
import i2 from '../../../public/Assets/BDDSampleFiles/AutodeskALogo.png';
import i3 from '../../../public/Assets/BDDSampleFiles/Monolith_MeltingTemperature.png';
import i4 from '../../../public/Assets/BDDSampleFiles/Monolith_Wireframe.png';
import i5 from '../../../public/Assets/BDDSampleFiles/SquareNut_Temperatures.png';
import i6 from '../../../public/Assets/BDDSampleFiles/SquareNut.png';

class Gallery extends React.Component {
	render() {

		return(
			<div>
				<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i1} alt=""/>
	                <h4 className="project-item-title">Autodesk A Logo, Variant 1</h4>
	                <p className="authors-styling">Joseph Schaeffer, Aaron Berliner</p>
	                <hr/>
	            </div>
	             <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i4} alt=""/>
	                <h4 className="project-item-title">Monolith Design, Wyss Institute</h4>
	                <p className="authors-styling">Shawn M. Douglas, Hendrik Dietz, Tim Liedl, Björn Högberg, Franziska Graf, & William M. Shih</p>
	                <hr/>
	            </div>
	             <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i3} alt=""/>
	                <h4 className="project-item-title">Monolith Design showing Melting Temperatures, Wyss Institute</h4>
	                <p className="authors-styling">Shawn M. Douglas, Hendrik Dietz, Tim Liedl, Björn Högberg, Franziska Graf, & William M. Shih</p>
	                <hr/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i2} alt=""/>
	                <h4 className="project-item-title">Flat 2D Origami of Autodesk A Logo</h4>
	                <p className="authors-styling">Joseph Schaeffer, Aaron Berliner</p>
	                <hr/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i5} alt=""/>
	                <h4 className="project-item-title">Square Nut Design, Wyss Institute, Melting Temperatures</h4>
	                <p className="authors-styling">Shawn M. Douglas, Hendrik Dietz, Tim Liedl, Björn Högberg, Franziska Graf, & William M. Shih</p>
	                <hr/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i6} alt=""/>
	                <h4 className="project-item-title">Square Nut Design, Wyss Institute</h4>
	                <p className="authors-styling">Shawn M. Douglas, Hendrik Dietz, Tim Liedl, Björn Högberg, Franziska Graf, & William M. Shih</p>
	                <hr/>
	            </div>
            </div>
		);
	}
}

export default Gallery;