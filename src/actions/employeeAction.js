import axiosI from '../axiosInstance';
import { GET_EMPLOYEES, ADD_EMPLOYEE, LOGGED_EMPLOYEE, ERROR } from './actionType';

export const GetEmployees = () => {
	const head = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/employee',head).then((response)=>{
			dispatch({
				type:GET_EMPLOYEES,
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
export const addEmployee = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.post('/employee/add',data,head).then((response)=>{
			dispatch({
				type:ADD_EMPLOYEE,
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
export const getEmployeeById = () => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/employee/getById',head).then((response)=>{
			dispatch({
				type:LOGGED_EMPLOYEE,
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