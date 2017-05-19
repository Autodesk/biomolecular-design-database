import { ADD_FLASH_MESSAGE } from './types';
import { DELETE_FLASH_MESSAGE } from './types';


//Action Creator
export function deleteFlashMessage(id) {
	return {
		type: DELETE_FLASH_MESSAGE,
		id
	}
}


export function addFlashMessage(message) {
	return {
		type: ADD_FLASH_MESSAGE,
		message
	}
}