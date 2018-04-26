import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton, SelectField, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetEmployees, addEmployee } from '../actions/employeeAction';
import { AddCredentials } from '../actions/clientAction';

class Employee extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			employeeName:"",
			employeeDesignation:"",
			username:"",
			password:"",
			value:"",
		};
	}
	componentDidMount(){
		if(this.props.EmployeeData.length === 0){
			this.props.GetEmployees();
		}
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.EmployeeData);
	}
	AddEmployee = () => {
		const data={
			'employeeName':this.state.employeeName,
			'employeeDesignation':this.state.employeeDesignation,
			'username':this.state.username
		};
		const credentials = {
			'username':this.state.username,
			'password':this.state.password,
			'role':'User'
		};
		this.props.AddCredentials(credentials);
		this.props.addEmployee(data);

		this.modalChange();
	};
	modalChange = () => {
		this.setState({
			isOpen:!this.state.isOpen
		});
	};
	onChange=(e)=>{
		this.setState({
			[e.target.id]:e.target.value
		});
	};
	onDesignationChange = (event,value) => {
		this.setState({
			employeeDesignation:event.target.innerHTML,
			value:value,
		});
	};
	render() {
		const styles = {
			underlineStyle: {
				borderColor: orange500,
			},
			floatingLabelFocusStyle: {
				color: blue500,
			},
		};
		return (
			<div>
				<Modal show={this.state.isOpen} onHide={this.modalChange} style={{top:'50px'}}>
					<Modal.Header closeButton>
						<h1>Add City</h1>
					</Modal.Header>
					<Modal.Body>
						<center>
							<SelectField hintText='Select Designation' value={this.state.value} onChange={this.onDesignationChange}>
								<MenuItem value={0} primaryText='Developer' />
								<MenuItem value={1} primaryText='Manager' />
								<MenuItem value={2} primaryText='Designer' />
							</SelectField>
							<br />
							<TextField
								id='employeeName'
								floatingLabelText="Employee Name"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.employeeName}
							/>
							<br />
							<TextField
								id='username'
								floatingLabelText="Employee Username"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.username}
							/>
							<br />
							<TextField
								id='password'
								type='password'
								floatingLabelText="Employee Password"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.password}
							/>
							<br />
							<FlatButton label="Add Employee" primary onClick={this.AddEmployee} /></center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Employee Name</TableHeaderColumn>
							<TableHeaderColumn>Employee Designation</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.EmployeeData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{v.employeeName}</TableRowColumn>
								<TableRowColumn>{v.employeeDesignation}</TableRowColumn>
							</TableRow>

						})}
					</TableBody>
				</Table>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		EmployeeData:state.EmployeeReducer,
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetEmployees,
		addEmployee,
		AddCredentials,
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(Employee);
