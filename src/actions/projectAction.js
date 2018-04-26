import axiosI from '../axiosInstance';
import { GET_PROJECTS, ADD_PROJECT, ERROR } from './actionType';

export const GetProjects = () => {
	const head = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/project',head).then((response)=>{
			dispatch({
				type:GET_PROJECTS,
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
export const addProject = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	debugger;
	return dispatch => {
		axiosI.post('/project/add',data,head).then((response)=>{
			debugger;
			dispatch({
				type:ADD_PROJECT,
				payload:response.data
			});
		}).catch((err)=>{
			dispatch({
				type:ERROR,
				payload:err
			});
		})
	};
}