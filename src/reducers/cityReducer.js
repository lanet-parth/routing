import _ from 'lodash';
import { ADD_CITY, GET_CITIES } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_CITIES:
			return action.payload;
		case ADD_CITY:
			state.push(action.payload);
			return _.cloneDeep(state);
		default:
			return state;
	}
};