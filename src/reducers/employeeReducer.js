import _ from 'lodash';
import {ADD_EMPLOYEE, GET_EMPLOYEES } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_EMPLOYEES:
			return action.payload;
		case ADD_EMPLOYEE:
			state.push(action.payload);
			return _.cloneDeep(state);
		default:
			return state;
	}
};