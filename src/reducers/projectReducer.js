import _ from 'lodash';
import { ADD_PROJECT, GET_PROJECTS } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_PROJECTS:
			return action.payload;
		case ADD_PROJECT:
			state.push(action.payload);
			return _.cloneDeep(state);
		default:
			return state;
	}
};