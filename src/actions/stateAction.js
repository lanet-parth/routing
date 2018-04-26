import axiosI from '../axiosInstance';
import { ADD_STATE, GET_STATES, ERROR } from './actionType';

export const GetAllStates = () => {
	const data = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/state',data).then((response) => {
			dispatch({
				type:GET_STATES,
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
export const Addstate = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/state/add',data,head).then((response)=>{
			dispatch({
				type:ADD_STATE,
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