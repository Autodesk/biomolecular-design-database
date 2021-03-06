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

export function getFilesObject(filesQuery){
	const apiCallFiles = '/api/files?'+filesQuery;
	return dispatch => {
		return axios.get(apiCallFiles);
	}
}

export function getSignedUrl(fileId){
	const getFileUrl = '/api/files/file?fileId='+fileId;
	return dispatch => {
		return axios.get(getFileUrl);
	}
}

export function getComments(query){
	const apiCall = '/api/projects/comments?'+query;
	return dispatch => {
		return axios.get(apiCall);
	}
}

export function saveComment(obj){
	return dispatch => {
		return axios.post('/api/projects/comments', obj);
	}
}

export function updateProject(data){
	return dispatch => {
		return axios.put('/api/projects/project', data);
	}
}

export function incViews(data){
	return dispatch => {
		return axios.put('/api/projects/project/incviews', data);
	}
}

export function updateFileItem(data){
	return dispatch => {
		return axios.put('/api/files/file', data);
	}
}
