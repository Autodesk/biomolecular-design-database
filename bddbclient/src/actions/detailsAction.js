import axios from 'axios';

export function userAppreciated(obj) {
	return dispatch => {
		return axios.post('/api/details', obj);
	};
}

export function checkAppreciations(queryString) {
	const apiCall = '/api/details?'+queryString;
	//get request to just check if the user has already appreciated the project		
	return dispatch => {	
		return axios.get(apiCall);	
	}
}
