import axios from 'axios';


//axios returns a promise 
export function uploadFile(fileData) {
	return dispatch => {
		return axios.post('/api/files/file', fileData); //make a post request to /api/users and pass userData
	}
}

export function deleteFile(queryString) {
	console.log('deleting file');
	const apiCall = '/api/files/file?'+queryString;
	return dispatch => {
		return axios.delete(apiCall);
	}
}