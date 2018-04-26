import _ from 'lodash';
import { ADD_DATA, GET_DATA, UPDATE_DATA, DELETE_DATA } from '../actions/actionType';

export default (state=[],action) => {
	switch (action.type) {
		case GET_DATA:
			return action.payload;
		case ADD_DATA:
			state.push(action.payload);
			return _.cloneDeep(state);
		case UPDATE_DATA:
			let id = action.payload._id;
			let index = _.findIndex(state,(rec)=>{return rec._id === id});
			state[index] = action.payload;
			return _.cloneDeep(state);
		case DELETE_DATA:
			let did = action.payload._id;
			let dindex = _.findIndex(state,(rec)=>{return rec._id === id});
			state.splice(dindex,1);
			return _.cloneDeep(state);
		default:
			return state;
	}
};