//reducer is a simple function which takes in state and action and 
//returns a new state (after performing actions on the given state )
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';


export default(state = [], action = {}) => {
	switch(action.type) {
		case ADD_FLASH_MESSAGE:
		return [
			...state, //current state + append another object 
			{
				id: shortid.generate(),
				type: action.message.type,
				text: action.message.text
			}
		];
		case DELETE_FLASH_MESSAGE:
			const index = findIndex(state, {id: action.id });
			if(index >=0){
				return [
					...state.slice(0, index),
					...state.slice(index+1)
				];
			}
			return state;
			
		default: return state;
	}
}