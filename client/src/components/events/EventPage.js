import React from 'react';
import EventForm from './EventForm';
import Details from './Details';
import './Event.css';

class EventPage extends React.Component {
	render() {
		return (
			<div className="general row wrapper">
				<div className="details col-md-6">
					<Details />
				</div>
				<div className="eventLayout col-md-6">
					<EventForm />
				</div>
			</div>
		);
	}
}
 
export default EventPage;