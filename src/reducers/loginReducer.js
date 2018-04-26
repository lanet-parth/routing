import _ from 'lodash';
import { USER_LOGIN, USER_LOGOUT } from '../actions/actionType';

const init = { user: localStorage.getItem('token') };
export default (state = init, action) => {
    switch (action.type) {
        case USER_LOGIN:
            const data = action.payload;
            state = data;
            return _.cloneDeep({ ...state, user: true });
        case USER_LOGOUT:
            return { state:[], user: false };
        default:
            return state;
    }
};
