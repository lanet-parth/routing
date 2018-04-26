import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetAllStates, Addstate } from '../actions/stateAction';

class AddState extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			statename:""
		};
	}
	componentDidMount(){
		if(this.props.StateData.length === 0){
			this.props.GetAllStates();
		}
	}
	componentWillReceiveProps(){
		console.log('All States : ',this.props.StateData);
	}
	addState = () => {
		const data={
			'StateName':this.state.statename
		};
		this.props.Addstate(data);
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
						<h1>Add State</h1>
					</Modal.Header>
					<Modal.Body>
						<center><TextField
							id='statename'
							floatingLabelText="State Name"
							floatingLabelStyle={styles.underlineStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							onChange={this.onChange}
							value={this.state.statename}
						/>
						<br />
							<FlatButton label="Add State" primary onClick={this.addState} /></center>
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
					{this.props.StateData.map((v)=>{
						return <TableRow>
								<TableRowColumn>{v.StateName}</TableRowColumn>
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
		StateData:state.StateReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetAllStates,
		Addstate
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(AddState);
