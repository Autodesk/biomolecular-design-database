import axios from 'axios';


//axios returns a promise 
export function uploadFile(fileData) {
	return dispatch => {
		return axios.post('/api/files/file', fileData); //make a post request to /api/users and pass userData
	}
}

export function deleteFile(queryString) {
	const apiCall = '/api/files/file?'+queryString;
	return dispatch => {
		return axios.delete(apiCall);
	}
}

export function deleteDocument(queryPath){
  const apiCall = '/api/files/document?'+queryPath;
  return dispatch => {
    return axios.delete(apiCall);
  }
}

export function uploadDocumentToS3({ file, saveLink}) {  
  let data = new FormData();
  data.append('file', file);
  data.append('saveLink', saveLink);
  return dispatch => {
    return axios.post('/api/files/document', data);
  }
}

export function signedUrlForS3Doc( queryString){
  const apiCall = '/api/files/file/getUrl?'+queryString;
  return dispatch => {
    return axios.get(apiCall);
  }
}

export function copyFiles(projectIds){
  return dispatch => {
    return axios.post('/api/files/copyFiles', projectIds); //make a post request to /api/users and pass userData
  }
}