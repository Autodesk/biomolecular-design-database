import axios from 'axios';

export function getAllPublishedProjects(queryString){
	const apiCall = '/api/profile/published?'+queryString
	return dispatch => {
		return axios.get(apiCall);
	}
}

export function getAllDrafts(queryString){
	const apiCall = '/api/profile/drafts?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}

export function deleteProject(queryString) {
	const apiCall = '/api/projects/project?'+queryString;
	return dispatch => {
		return axios.delete(apiCall);
	}
}

export function reloadPublished(queryString){
	const apiCall = '/api/profile/published?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}

export function reloadDrafts(queryString){
	const apiCall = '/api/profile/drafts?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}

/*
export function getProjectsFiltered(queryString) {
	const apiCall = '/api/projects/filter?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}*/
