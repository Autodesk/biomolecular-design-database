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

export function uploadDocumentToS3({ file, name }) {  
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);
  console.log("here in actions, forwarding request to server. ");
  return (dispatch) => {
    axios.post('api/files/document', data)
      .then(response => console.log("file successfully uploaded"))
      .catch(error => console.log('error occured while uploading a file'));
  };
}