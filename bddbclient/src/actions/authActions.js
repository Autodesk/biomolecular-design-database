import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}
 
export function logout() { //remove jwttoken from local storage and setAuthorization(NULL) sets authenticated to false
	return dispatch => {
		localStorage.removeItem('jwtToken');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}

export function login(data) {
	return dispatch => {
		return axios.post('/api/auth', data).then( res => { //promise returns
			const token = res.data.token;
			localStorage.setItem('jwtToken', token); 
			setAuthorizationToken(token);
			
			dispatch(setCurrentUser(jwtDecode(token)));
		}); //return promise from axios 
	}
}

//object is decoded with jwt.decode(token)) 