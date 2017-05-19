import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions';


class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			errors: {},
			isLoading: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.createEvent(this.state);
	}

	render(){
		const { title, errors, isLoading } = this.state;
		return(
			<form onSubmit={this.onSubmit}>
				<h1> Upload a new Project </h1>
				<div class="col-md-6 col-sm-1 col-lg-12">
					<TextFieldGroup name="title" label="Event Title" field="title" value={title} onChange={this.onChange} error={errors.title} />
					<button type="submit" disabled={isLoading} className="btn btn-primary"> Create </button>
				</div>

			</form>

		);
	}
}

EventForm.propTypes = {
	createEvent: React.PropTypes.func.isRequired
}


export default connect(null, {createEvent})(EventForm); //connecting to the store to check the authentication