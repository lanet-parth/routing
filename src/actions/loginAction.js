import axiosI from '../axiosInstance';
import { USER_LOGIN, USER_LOGOUT, ERROR } from './actionType';

export const UserLoginAction = (data) => {
	return (dispatch) => {
		axiosI.post('/users/login', data).then((response) => {
			if(response.data.message === 'Authenticated User') {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('role', response.data.role);
				dispatch({
					type: USER_LOGIN,
					payload: response.data,
				});
			}
			else
			{
				alert('Invalid Username or Password..');
			}
		}).catch((err) => {
			dispatch({
				type: ERROR,
				payload: err,
			});
		});
	};
};
export const UserLogoutAction = () => {
	localStorage.removeItem('token');
	return (dispatch) => {
		dispatch({
			type: USER_LOGOUT,
			payload: null,
		});
	};
};
