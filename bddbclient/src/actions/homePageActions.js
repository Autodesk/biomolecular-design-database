import axios from 'axios';

export function getProjects(queryString){
	const apiCall = '/api/projects?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}