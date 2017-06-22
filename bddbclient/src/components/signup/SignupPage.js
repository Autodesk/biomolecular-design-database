import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages.js';


//this page wraps signupform. userSignupRequest function is passed as the 'prop' to signupform 
//usersignup request is a function which is passed on to the signupform component
class SignupPage extends React.Component {
	render() {
		const { userSignupRequest, addFlashMessage } = this.props;
		return (
			<div className="row general">
				<div className=" box-style">
					<SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
				</div>
			</div>	
		);			
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}
export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);

