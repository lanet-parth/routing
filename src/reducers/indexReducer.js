import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import StateReducer from './states';
import CityReducer from './cityReducer';
import ClientReducer from './clientReducer';
import EmployeeReducer from './employeeReducer';
import ProjectReducer from './projectReducer';
import CrudReducer from './crudReducer';
import TaskReducer from './taskReducer';
import LoggedReducer from './loggedReducer';

const allReducers = combineReducers({ LoginReducer, StateReducer, CityReducer, ClientReducer, EmployeeReducer, ProjectReducer, CrudReducer, TaskReducer, LoggedReducer });

export default allReducers;
