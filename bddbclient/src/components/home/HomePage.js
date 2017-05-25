//import { Link } from 'react-router';
import React from 'react';
import './Home.css';

class HomePage extends React.Component {
	render (){
		return(
			<div>
				<div className="general">
					<h2 className="home-title"> Showcase & Discovery DNA Constructs </h2>
					<button className="button">Sign up</button>
				</div>
				<hr width="65%" />
			</div>
		);
	}
}


export default HomePage;
