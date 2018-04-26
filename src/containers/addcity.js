import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton, SelectField, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetCities, addCity } from '../actions/cityAction';
import { GetAllStates } from '../actions/stateAction';

class AddCity extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			cityname:"",
			statename:"",
			stateId:"",
			value:"",
		};
	}
	componentDidMount(){
		if(this.props.CityData.length === 0){
			this.props.GetCities();
		}
		if(this.props.StateData.length === 0){
			this.props.GetAllStates();
		}
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.CityData);
	}
	AddCity = () => {
		const data={
			'CityName':this.state.cityname,
			'stateName':this.state.statename
		};
		this.props.addCity(data);
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
	getStates = () => {
		let items = [];
		this.props.StateData.forEach((states,index)=>{
			items.push(<MenuItem value={index} primaryText={states.StateName} />);
		});
		return items;
	};
	onStateChange = (event,value) => {
		let stateName = event.target.innerHTML;
		let id = this.props.StateData[Number(value)]._id;
		this.setState({
			statename:stateName,
			stateId:id,
			value:value
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
							<SelectField hintText='Select State' value={this.state.value} onChange={this.onStateChange}>
								{this.getStates()}
							</SelectField>
							<br />
							<TextField
							id='cityname'
							floatingLabelText="City Name"
							floatingLabelStyle={styles.underlineStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							onChange={this.onChange}
							value={this.state.cityname}
						/>
							<br />
							<FlatButton label="Add City" primary onClick={this.AddCity} /></center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>State Name</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.CityData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{v.stateName}</TableRowColumn>
								<TableRowColumn>{v.CityName}</TableRowColumn>
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
		CityData:state.CityReducer,
		StateData:state.StateReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetCities,
		addCity,
		GetAllStates
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(AddCity);
