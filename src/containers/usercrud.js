import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton, SelectField, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetAllStates } from '../actions/stateAction';
import { GetCities } from '../actions/cityAction';
import { addData, getAllData, deleteData, updateData } from '../actions/crudAction';

class Crud extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			statename:'',
			svalue:0,
			cvalue:0,
			selectedState:'Gujarat',
			selectedCity:'Surat',
			firstname:'',
			lastname:'',
			address:'',
			pincode:'',
			gender:'',
			id:"",
			isEdit:false
		};
	}
	componentDidMount(){
		if(this.props.StateData.length === 0){
			this.props.GetAllStates();
		}
		if(this.props.CityData.length === 0){
			this.props.GetCities();
		}
		if(this.props.CrudData.length === 0){
			this.props.getAllData();
		}
	}
	addData = () => {
		let data={
			'First_Name':this.state.firstname,
			'Last_Name':this.state.lastname,
			'Address':this.state.address,
			'city':this.state.selectedCity,
			'state':this.state.selectedState,
			'pincode':this.state.pincode,
			'gender':this.state.gender,
			'file':'null',
		};
		this.props.addData(data);
		this.modalChange();
	};
	modalChange = () => {
		if(this.state.isOpen)
		{
			this.setState({
				firstname:"",
				lastname:"",
				gender:"",
				address:"",
				selectedState:"Gujarat",
				selectedCity:"Surat",
				pincode:"",

				isEdit:!this.state.isEdit,
				isOpen:!this.state.isOpen,
			});
		}
		else {
			this.setState({
				isOpen:!this.state.isOpen
			});
		}
	};
	onChange=(e)=>{
		this.setState({
			[e.target.id]:e.target.value
		});
	};
	getStates = () => {
		let items = [];
		this.props.StateData.forEach((states,index)=>{
			if(states.StateName === 'Gujarat')
				items.push(<MenuItem value={index} primaryText={states.StateName} />);
			else
				items.push(<MenuItem value={index} primaryText={states.StateName} />);
		});
		return items;
	};
	getCities = () => {
		let items = [];
		this.props.CityData.forEach((states,index)=>{
			if(states.stateName === this.state.selectedState)
			{
				items.push(<MenuItem value={index} primaryText={states.CityName} />);
			}
		});
		return items;
	};
	onStateChange = (event,value) => {
		this.setState({
			svalue:value,
			selectedState:event.target.innerHTML,
		});
	};
	onCityChange = (event) => {
		let index = _.findIndex(this.props.CityData,(c)=>{return c.CityName === event.target.innerHTML});
		this.setState({
			cvalue:index,
			selectedCity:event.target.innerHTML,
		});
	};
	deleteRecord = (e,rec) => {
		let data = {
			'_id':rec._id
		};
		this.props.deleteData(data);
	};
	editRecord = (e,rec) => {
		console.log(rec);
		let { firstname, lastname, address, gender, selectedCity, selectedState, pincode, isEdit, id } = this.state;
		firstname = rec.First_Name;
		lastname = rec.Last_Name;
		address = rec.Address;
		gender = rec.gender;
		selectedCity = rec.city;
		pincode = rec.pincode;
		selectedState = rec.state;
		isEdit = !this.state.isEdit;
		id= rec._id
		this.setState({
			firstname,lastname,address,gender,selectedCity,selectedState,pincode,isEdit,id
		},()=>{
			this.modalChange();
		});
	};
	editData = () => {
		let data={
			'First_Name':this.state.firstname,
			'Last_Name':this.state.lastname,
			'Address':this.state.address,
			'city':this.state.selectedCity,
			'state':this.state.selectedState,
			'pincode':this.state.pincode,
			'gender':this.state.gender,
			'file':'null',
			'_id':this.state.id
		};
		this.props.updateData(data);
		this.modalChange();
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
						<h1>Crud</h1>
					</Modal.Header>
					<Modal.Body>
						<center><TextField
							id='firstname'
							floatingLabelText="First Name"
							floatingLabelStyle={styles.underlineStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							onChange={this.onChange}
							value={this.state.firstname}
						/>
							<br />
							<TextField
								id='lastname'
								floatingLabelText="Last Name"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.lastname}
							/>
							<br />
							<TextField
								id='address'
								floatingLabelText="Address"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.address}
							/>
							<br />
							<SelectField hintText='Select State' value={this.state.svalue} onChange={this.onStateChange}>
								{this.getStates()}
							</SelectField>
							<br />
							<SelectField hintText='Select City' value={this.state.cvalue} onChange={this.onCityChange}>
								{this.getCities()}
							</SelectField>
							<br />
							<TextField
								id='pincode'
								floatingLabelText="Pincode"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.pincode}
							/>
							<br />
							<FormGroup  id="gender" onChange={this.onChange}>
								<ControlLabel>Select Gender</ControlLabel><br/>
								<input  type="radio" checked={this.state.gender === "Female"} ref="radioF" name="radioG" value="Female" id="gender"/>Female
								<input  type="radio" checked={this.state.gender === "Male"} ref="radioM" name="radioG" value="Male" id="gender"/>Male
							</FormGroup>
							<br />
							{
								!this.state.isEdit?
									<FlatButton label="Add Data" primary onClick={this.addData} />
									:
									<FlatButton label="Edit Data" primary onClick={this.editData} />
							}
						</center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table multiSelectable={true}>
					<TableHeader enableSelectAll={true}>
						<TableRow>
							<TableHeaderColumn>First Name</TableHeaderColumn>
							<TableHeaderColumn>Last Name</TableHeaderColumn>
							<TableHeaderColumn>Address</TableHeaderColumn>
							<TableHeaderColumn>City</TableHeaderColumn>
							<TableHeaderColumn>State</TableHeaderColumn>
							<TableHeaderColumn>Pincode</TableHeaderColumn>
							<TableHeaderColumn>Gender</TableHeaderColumn>
							<TableHeaderColumn>Operations</TableHeaderColumn>
							<TableHeaderColumn/>
						</TableRow>
					</TableHeader>
					<TableBody>
						{this.props.CrudData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{v.First_Name}</TableRowColumn>
								<TableRowColumn>{v.Last_Name}</TableRowColumn>
								<TableRowColumn>{v.Address}</TableRowColumn>
								<TableRowColumn>{v.city}</TableRowColumn>
								<TableRowColumn>{v.state}</TableRowColumn>
								<TableRowColumn>{v.pincode}</TableRowColumn>
								<TableRowColumn>{v.gender}</TableRowColumn>
								<TableRowColumn><FlatButton onClick={(e)=>{this.editRecord(e,v)}}>Update</FlatButton></TableRowColumn>
								<TableRowColumn><FlatButton onClick={(e)=>{this.deleteRecord(e,v)}}>Delete</FlatButton></TableRowColumn>
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
		StateData:state.StateReducer,
		CityData:state.CityReducer,
		CrudData:state.CrudReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetAllStates,
		GetCities,
		addData,
		getAllData,
		deleteData,
		updateData
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(Crud);
