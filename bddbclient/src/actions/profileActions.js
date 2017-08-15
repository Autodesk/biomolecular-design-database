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

export function uploadProject(projectData){
	return dispatch => {
		return axios.post('/api/projects/project', projectData); //make a post request to /api/users and pass userData
	}
}


export function updateAssociatedField(data){
	return dispatch => {
		return axios.put('/api/projects/project/associatedField', data);
	}
}
export function deleteAssociatedId(queryString){
	const apiCall = '/api/projects/project?'+queryString;
	return dispatch => {
		return axios.delete('/api/projects/project/associatedField', apiCall);
	}
}

/*
export function getProjectsFiltered(queryString) {
	const apiCall = '/api/projects/filter?'+queryString;
	return dispatch => {
		return axios.get(apiCall);
	}
}*/
