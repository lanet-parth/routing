import axiosI from '../axiosInstance';
import { GET_CITIES, ADD_CITY, ERROR } from './actionType';

export const GetCities = () => {
	const head = {
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	return dispatch => {
		axiosI.get('/city',head).then((response)=>{
			dispatch({
				type:GET_CITIES,
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
export const addCity = (data) => {
	const head={
		headers:{
			'x-auth':localStorage.getItem('token')
		}
	};
	debugger;
	return dispatch => {
		axiosI.post('/city/add',data,head).then((response)=>{
			debugger;
			dispatch({
				type:ADD_CITY,
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