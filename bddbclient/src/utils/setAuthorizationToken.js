import axios from 'axios';

export default function setAuthorizationToken(token) {
	if(token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //setting header with this token in order to receive pages
																			// from the server which requires user to be logged in
	} else { //if token is not provided is passed as empty/false, delete the authorization header 
		delete axios.defaults.headers.common['Authorization'];
	}
}

