import { GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA, ERROR } from './actionType';
import axiosI from "../axiosInstance";

export const getAllData = () => {
	const head = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/users/login/personalInfo',head).then((response)=>{
			dispatch({
				type:GET_DATA,
				payload:response.data
			});
		}).catch((err)=>{
			dispatch({
				type:ERROR,
				payload:err
			});
		})
	};
};

export const addData = (data) => {
	const head = {
		headers: {
			'x-auth': localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/users/login/personalInfo', data, head).then((response) => {
			dispatch({
				type: ADD_DATA,
				payload: response.data
			});
		}).catch((err) => {
			dispatch({
				type: ERROR,
				payload: err
			});
		})
	};
};
export const updateData = (data) => {
	const head = {
		headers: {
			'x-auth': localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.patch('/users/login/personalInfo/updateUser', data, head).then((response) => {
			dispatch({
				type: UPDATE_DATA,
				payload: response.data
			});
		}).catch((err) => {
			dispatch({
				type: ERROR,
				payload: err
			});
		})
	};
};
export const deleteData = (data) => {
	const head = {
		headers: {
			'x-auth': localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/users/login/personalInfo/delete', data, head).then((response) => {
			dispatch({
				type: DELETE_DATA,
				payload: response.data
			});
		}).catch((err) => {
			dispatch({
				type: ERROR,
				payload: err
			});
		})
	};
};