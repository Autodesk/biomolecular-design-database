import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function(ComposedComponent){
	class Authenticate extends React.Component {

		componentWillMount(){
			if(!this.props.isAuthenticated) {
				this.props.addFlashMessage({
					type: 'error',
					text: 'You need to login to access this page'
				});
				this.context.router.push('/login'); //redirect to login page 
			}
		}

		componentWillUpdate(nextProps){
			if(!nextProps.isAuthenticated) {
				this.context.router.push('/');
			}
		} 

		render(){
			return(
				<ComposedComponent {...this.props} />
			);
		}
	}

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	Authenticate.propTypes = {
		isAuthenticated: React.PropTypes.bool.isRequired,
		addFlashMessage: React.PropTypes.func.isRequired
	}

	function mapStateToProps(state){
		return {
			isAuthenticated: state.auth.isAuthenticated
		}
	}
	return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}

//Authenticate class component wraps up the Passed Component 