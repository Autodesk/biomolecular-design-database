import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import NewEventPage from "./components/events/NewEventPage"
import requireAuth from './utils/requireAuth';

// "/" path links to the App component (basic) + "/XX" {XX} component
//"/signup" renders the App component + the signup component 

export default (
	<Route path="/" component={App} >
		<IndexRoute component={Greetings} />
		<Route path="signup" component={SignupPage} />
		<Route path="login" component={LoginPage} />
		<Route path="new-event" component={requireAuth(NewEventPage)} />
	</Route>
)

