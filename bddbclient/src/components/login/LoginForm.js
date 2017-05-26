import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


function validateInput(data) {
	let errors= {};

	if(Validator.isNull(data.username)){
		errors.username = 'Username is required';
	}
	if(Validator.isNull(data.password)){
		errors.password = 'Password is required';
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};	
}

class LoginForm extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				username: '',
				password: '',
				errors: {},
				isLoading: false
			};
			this.onSubmit = this.onSubmit.bind(this);
			this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({errors});
		}
		return isValid;
	}

	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){
			this.setState({ errors: {}, isLoading: true });
			this.props.login(this.state).then(
				(res) => this.context.router.push('/'),
				(err) => this.setState({ errors: err.response.data.errors, isLoading: false}) //if errors are returned from the server, change state
			);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, username, password, isLoading } = this.state;
		return (
			<form onSubmit={this.onSubmit} >
				<h1> Login</h1>
				{ errors.form && <div className="alert alert-danger"> { errors.form} </div> }
				<TextFieldGroup error={errors.username} label="Username" onChange={this.onChange} value={username} field="username" />
				<TextFieldGroup error={errors.password} label="Password" onChange={this.onChange} type="password" value={password} field="password" />
				<div className="form-group"> < button className="button-signup"  disabled={isLoading}>Login</button></div>
			
			</form>
		);
	}
}


LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {  //context 
	router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);  //connect the login form with redux 
													 //we do not need to pass the stte in this component (null)
													 // call login action. 'login' will take the state and perform action and 
													 //return new state 

