import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
import Footer from './Footer';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchValue: ''
		}
		this.searchSubmit = this.searchSubmit.bind(this);
		this.searchValUpdate = this.searchValUpdate.bind(this);
	}

	searchSubmit(e){
		e.preventDefault();
		console.log(this.state.searchValue);
	}

	searchValUpdate(e) {
		e.preventDefault();
		this.setState({ searchValue: e.target.value });
	}

	render() {
		var childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { searchValue: this.state.searchValue });
        });

		return (
			<div className="container fill"> 
				<NavigationBar searchValue={this.state.searchValue} searchSubmit={this.searchSubmit} searchValUpdate={this.searchValUpdate} />
				<FlashMessagesList />
				{childrenWithProps}
				<Footer />
			</div>
		);
	}
}

export default App;
