import axiosI from "../axiosInstance";
import {ADD_TASK, ERROR, GET_TASK} from "./actionType";

export const addTask = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/task/addtask',data,head).then((response)=>{
			dispatch({
				type:ADD_TASK,
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
export const getTask = () => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/task',head).then((response)=>{
			dispatch({
				type:GET_TASK,
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