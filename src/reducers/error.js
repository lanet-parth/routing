import _ from 'lodash';
import { ERROR } from '../actions/actionType';

export default (state = [], action) => {
	switch (action.type) {
		case ERROR:
			return _.cloneDeep(action.payload);
		default:
			return state;
	}
};
