import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import Footer from './Footer';

class App extends React.Component {
	render() {
		return (
			<div className="container fill"> 
				<NavigationBar />
				<FlashMessagesList />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}


export default App;



