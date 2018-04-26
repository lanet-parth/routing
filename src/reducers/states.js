import _ from 'lodash';
import {ADD_STATE, GET_STATES} from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_STATES:
			return action.payload;
		case ADD_STATE:
			state.push(action.payload);
			return _.cloneDeep(state);
		default:
			return state;
	}
};