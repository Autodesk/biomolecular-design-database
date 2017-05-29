import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


function validateInput(data) {
	let errors = {};

	if(Validator.isNull(data.email)){
		errors.email = 'Email is required';
	}
	if(!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	if(Validator.isNull(data.password)){
		errors.password = 'Password is required';
	}
	if(Validator.isNull(data.passwordConfirmation)){
		errors.passwordConfirmation = 'Password Confirmation is required';
	}
	if(!Validator.equals(data.password, data.passwordConfirmation)){
		errors.passwordConfirmation = 'Passwords must match';
	}
	if(Validator.isNull(data.username)){
		errors.username = 'Username is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}



class SignupForm extends React.Component {
	//construct and initialize the state 

	//Need to do i.e. this.onChange.bind(this) to pass 'this' state" to the function 
	//otherwise, onChange(e) function refers 'this' to the passed event and not the state of the whole object 
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			errors: {},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	isValid() {
		 const { errors, isValid } = validateInput(this.state); //validateInput returns an object i.e. { errors{}, isValid }
		 if(!isValid) {
		 	this.setState({ errors });
		 }
		 return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.isValid()){ //only make a request to the server if there are no errors 
			this.setState({ errors: {}, isLoading: true }); //set to empty initially. Get's repopulated later 
			this.props.userSignupRequest(this.state).then(
				() => { //if everything goes well, (event handler)
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed up successfully.'
					});
					this.context.router.push('/');
				}, 
				(err) => this.setState({ errors: err.response.data, isLoading: false })// if something goes bad
			); 			//pass in the parameter (User object / this.state) to userSignupRequest function 
					  //in actions/signupaction
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1> Join our Community! </h1>

				<TextFieldGroup error={errors.username} label="Username" onChange={this.onChange} value={this.state.username} field="username" />
				<TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} value={this.state.email} field="email" />
				<TextFieldGroup error={errors.password} label="Password" onChange={this.onChange} type="password" value={this.state.password} field="password" />
				<TextFieldGroup error={errors.passwordConfirmation} label="Password Confirmation" type="password" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" />


				<div className="form-group">
					<button disabled={this.state.isLoading} className="button-signup">
						Sign Up
					</button>
				</div>
			</form>
		);
	}
}


//this prop function is required !!
SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;

