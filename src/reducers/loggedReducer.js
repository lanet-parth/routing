import _ from 'lodash';
import { LOGGED_EMPLOYEE, LOGGED_EMPLOYEE_LOGOUT } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case LOGGED_EMPLOYEE:
			return action.payload;
		case LOGGED_EMPLOYEE_LOGOUT:
			state=[];
			return _.cloneDeep(state);
		default:
			return state;
	}
};