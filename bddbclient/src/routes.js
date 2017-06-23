import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import EventPage from "./components/events/EventPage"
import requireAuth from './utils/requireAuth';
import NotFound from './components/NotFound';
import serverError from './components/ServerError';
import Profile from './components/profile/Profile.js';

// "/" path links to the App component (basic) + "/XX" {XX} component
//"/signup" renders the App component + the signup component 

export default (
	<Route path="/" component={App} >
		<IndexRoute component={HomePage} />
		<Route path="projects" component={HomePage}/>
		<Route path="projects/:projectId" component={HomePage}/>
		<Route path="signup" component={SignupPage} />
		<Route path="profile" component={Profile} />
		<Route path="login" component={LoginPage} />
		<Route path="new-event" component={requireAuth(EventPage)} />
		<Route path="notfound" component={NotFound} />
		<Route path="serverError" component={serverError} />
	</Route>
);



