import _ from 'lodash';
import { ADD_CLIENT, GET_CLIENTS } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_CLIENTS:
			return action.payload;
		case ADD_CLIENT:
			state.push(action.payload);
			return _.cloneDeep(state);
		default:
			return state;
	}
};