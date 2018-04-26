import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton, SelectField, MenuItem, DatePicker, Toggle } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetProjects } from '../actions/projectAction';
import { addTask, getTask } from '../actions/taskAction';
import { GetEmployees } from '../actions/employeeAction';

class Task extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			projectName:"",
			taskName:"",
			description:"",
			employeeId:"",
			priority:"",
			estimatedHours:"",
			status:"",
			projectId:"",
			startDate:"",
			endDate:"",
			value:"",
			pvalue:"",
			evalue:"",

		};
	}
	componentDidMount(){
		if(this.props.ProjectData.length === 0){
			this.props.GetProjects();
		}
		if(this.props.TaskData.length === 0){
			this.props.getTask();
		}
		if(this.props.EmployeeData.length === 0){
			this.props.GetEmployees();
		}
	}
	AddTask = () => {
		const data={
			'taskName':this.state.taskName,
			'description':this.state.description,
			'employeeId':this.state.employeeId,
			'priority':this.state.pvalue,
			'estimatedHours':this.state.estimatedHours,
			'status':0,
			'projectId':this.state.projectId,
			'startDate':this.state.startDate,
			'endDate':this.state.endDate,
		};
		this.props.addTask(data);
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
	getEmployee = () => {
		let items = [];
		this.props.EmployeeData.forEach((states,index)=>{
			if(states.employeeDesignation !== 'Manager')
				items.push(<MenuItem value={index} primaryText={states.employeeName} />);
		});
		return items;
	};
	getProject = () => {
		let items=[];
		this.props.ProjectData.forEach((record,index)=>{
			items.push(<MenuItem value={index} primaryText={record.projectName} />);
		});
		return items;
	};
	onStateChange = (event,value) => {
		let projectName = event.target.innerHTML;
		let id = this.props.ProjectData[Number(value)]._id;
		this.setState({
			projectId:id,
			value:value
		});
	};
	onPriorityChange = (event,value) => {
		this.setState({
			pvalue:value
		});
	};
	onEmployeeChange = (event) => {
		let emp = event.target.innerHTML;
		let index = _.findIndex(this.props.EmployeeData,(e)=>{return e.employeeName === emp});
		let id = this.props.EmployeeData[index]._id;
		this.setState({
			employeeId:id,
			evalue:index
		});
	};
	getPriority = () => {
		let items=[];
		items.push(<MenuItem value={0} primaryText='High' />);
		items.push(<MenuItem value={1} primaryText='Moderate' />);
		items.push(<MenuItem value={2} primaryText='Low' />);
		return items;
	};
	dateChanged = (e,date) => {
		let startDate = moment(date).format('l');
		this.setState({
			startDate:startDate
		});
	};
	endDateChanged = (e,date) => {
		let endDate = moment(date).format('l');
		this.setState({
			endDate:endDate
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
		console.log(this.props.TaskData);
		return (
			<div>
				<Modal show={this.state.isOpen} onHide={this.modalChange} style={{top:'50px'}}>
					<Modal.Header closeButton>
						<h1>Add City</h1>
					</Modal.Header>
					<Modal.Body>
						<center>
							<SelectField hintText='Select Project' value={this.state.value} onChange={this.onStateChange}>
								{this.getProject()}
							</SelectField>
							<br />
							<TextField
								id='taskName'
								floatingLabelText="Task Name"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.taskName}
							/>
							<br />
							<TextField
								id='description'
								floatingLabelText="Description"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.description}
							/>
							<br />
							<SelectField hintText='Select Priority' value={this.state.pvalue} onChange={this.onPriorityChange}>
								{this.getPriority()}
							</SelectField>
							<br />
							<SelectField hintText='Select Employee' value={this.state.evalue} onChange={this.onEmployeeChange}>
								{this.getEmployee()}
							</SelectField>
							<br />
							<TextField
								id='estimatedHours'
								type='number'
								floatingLabelText="Estimated Hours"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.estimatedHours}
							/>
							<br />
							<DatePicker hintText="Start Date" onChange={this.dateChanged} />
							<br />
							<DatePicker hintText="End Date" onChange={this.endDateChanged}/>
							<br />
							<br />
							<FlatButton label="Add Task" primary onClick={this.AddTask} /></center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Project</TableHeaderColumn>
							<TableHeaderColumn>Task Name</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
							<TableHeaderColumn>Employee</TableHeaderColumn>
							<TableHeaderColumn>Priority</TableHeaderColumn>
							<TableHeaderColumn>Estimated Hours</TableHeaderColumn>
							<TableHeaderColumn>Start Date</TableHeaderColumn>
							<TableHeaderColumn>End Date</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.TaskData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{
									this.props.ProjectData.map((p)=>{
										if(p._id === v.projectId)
											return p.projectName
									})
								}</TableRowColumn>
								<TableRowColumn>{v.taskName}</TableRowColumn>
								<TableRowColumn>{v.description}</TableRowColumn>
								<TableRowColumn>{
									this.props.EmployeeData.map((e)=>{
										if(e._id === v.employeeId)
											return e.employeeName
								})}</TableRowColumn>
								<TableRowColumn>{v.priority}</TableRowColumn>
								<TableRowColumn>{v.estimatedHours}</TableRowColumn>
								<TableRowColumn>{v.startDate}</TableRowColumn>
								<TableRowColumn>{v.endDate}</TableRowColumn>
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
		ProjectData:state.ProjectReducer,
		TaskData:state.TaskReducer,
		EmployeeData:state.EmployeeReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getTask,
		addTask,
		GetProjects,
		GetEmployees
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(Task);
