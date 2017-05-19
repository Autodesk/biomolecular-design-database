import axios from 'axios';


//axios makes a promise to make a post request
export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post('/api/users', userData); //make a post request to /api/users and pass userData
	}
}