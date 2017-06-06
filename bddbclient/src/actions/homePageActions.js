import axios from 'axios';

export function reloadProjects(queryString){
	const apiCall = '/api/projects?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}

export function searchProjects(queryString){
	const apiCallSearch = '/api/search?'+queryString;
	return dispatch =>{
		return axios.get(apiCallSearch);
	}
}
/*
export function getProjectsFiltered(queryString) {
	const apiCall = '/api/projects/filter?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}*/
