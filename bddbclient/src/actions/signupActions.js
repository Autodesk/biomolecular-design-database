import axios from 'axios';


//axios returns a promise 
export function userSignupRequest(userData) {
	return dispatch => {
		return axios.post('/api/users', userData); //make a post request to /api/users and pass userData
	}
}