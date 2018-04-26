import axios from 'axios';

const axiosI = axios.create({
	baseURL: 'http://localhost:2525',
});
export default axiosI;
