import {ADD_TASK, GET_TASK} from "../actions/actionType";
import _ from 'lodash';

export default (state=[], action) => {
	switch (action.type){
		case ADD_TASK:
			state.push(action.payload);
			return _.cloneDeep(state);
		case GET_TASK:
			return _.cloneDeep(action.payload);
		default:
			return state;
	}
};