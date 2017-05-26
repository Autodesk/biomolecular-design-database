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
			<div align="center">
				<div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i1} alt=""/>
	            </div>
	             <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i4} alt=""/>
	            </div>
	             <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i3} alt=""/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i2} alt=""/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i5} alt=""/>
	            </div>
	            <div className="col-lg-3 col-md-4 col-xs-6 showcase-item-layout">
	                <img className="img-responsive" src={i6} alt=""/>
	            </div>
            </div>
		);
	}
}

export default Gallery;