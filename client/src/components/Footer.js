import React from 'react';
import logo from '../../public/Assets/logo.svg';

class Footer extends React.Component {
	render (){
		return(
			<div className="container-fluid">
				<hr/>
				<div className="row">
					<div className="col-xs-12 paddingBottom">
						<img src={logo} width="180" alt="Autodesk Logo"/>
						<p> &copy; 2017 </p>
					</div>
				</div>		
				
			</div>
		);
	}
}


export default Footer;
