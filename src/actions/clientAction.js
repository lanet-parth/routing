import axiosI from '../axiosInstance';
import { ADD_CLIENT, GET_CLIENTS, ERROR } from './actionType';

export const GetAllClients = () => {
	const data = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/client/getAllClients',data).then((response) => {
			dispatch({
				type:GET_CLIENTS,
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
export const AddClient = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/client/add',data,head).then((response)=>{
			dispatch({
				type:ADD_CLIENT,
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
export const AddCredentials = (credentials) => {
	const head = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/users/add',credentials,head).then((response)=>{
			dispatch({
				type:'',
			});
		}).catch((err)=>{
			dispatch({
				type:ERROR,
				payload:err
			});
		})
	}
};