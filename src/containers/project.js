import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton, SelectField, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import _ from 'lodash';
import { GetEmployees } from '../actions/employeeAction';
import { GetAllClients } from '../actions/clientAction';
import { GetProjects, addProject } from '../actions/projectAction';

class Project extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			projectName:"",
			clientId:"",
			employeeId:"",
			status:"",
			cvalue:"",
			evalue:"",
		};
	}
	componentDidMount(){
		if(this.props.EmployeeData.length === 0){
			this.props.GetEmployees();
		}
		if(this.props.ClientData.length === 0){
			this.props.GetAllClients();
		}
		if(this.props.ProjectData.length === 0){
			this.props.GetProjects();
		}
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.CityData);
	}
	AddProject = () => {
		const data={
			'projectName':this.state.projectName,
			'clientId':this.state.clientId,
			'employeeId':this.state.employeeId,
			'status':0,
		};
		this.props.addProject(data);
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
	getClients = () => {
		let items = [];
		this.props.ClientData.forEach((states,index)=>{
			items.push(<MenuItem value={index} primaryText={states.clientName} />);
		});
		return items;
	};
	getEmployees = () => {
		let items = [];
		this.props.EmployeeData.forEach((states,index)=>{
			if(states.employeeDesignation === 'Manager'){
				items.push(<MenuItem value={index} primaryText={states.employeeName} />);
			}
		});
		return items;
	};
	onClientChange = (event,value) => {
		let id = this.props.ClientData[Number(value)]._id;
		this.setState({
			clientId:id,
			cvalue:value
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
							<SelectField hintText='Select Client' value={this.state.cvalue} onChange={this.onClientChange}>
								{this.getClients()}
							</SelectField>
							<br />
							<SelectField hintText='Select Employee' value={this.state.evalue} onChange={this.onEmployeeChange}>
								{this.getEmployees()}
							</SelectField>
							<br />
							<TextField
								id='projectName'
								floatingLabelText="Project Name"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.projectName}
							/>
							<br />
							<FlatButton label="Add Project" primary onClick={this.AddProject} /></center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Project Name</TableHeaderColumn>
							<TableHeaderColumn>Client Name</TableHeaderColumn>
							<TableHeaderColumn>Employee Head</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.ProjectData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{v.projectName}</TableRowColumn>
								<TableRowColumn>{
									this.props.ClientData.map((c)=>{
										if(c._id === v.clientId){
											return c.clientName
										}
									})
								}</TableRowColumn>
								<TableRowColumn>{
									this.props.EmployeeData.map((e)=>{
										if(e._id === v.employeeId){
											return e.employeeName
										}
									})
								}</TableRowColumn>
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
		ClientData:state.ClientReducer,
		ProjectData:state.ProjectReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetEmployees,
		GetAllClients,
		GetProjects,
		addProject
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(Project);
