import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { bindActionCreators } from 'redux';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { GetAllClients, AddClient, AddCredentials } from '../actions/clientAction';

class Client extends Component {
	constructor(){
		super();
		this.state={
			isOpen:false,
			clientname:"",
			username:"",
			password:""
		};
	}
	componentDidMount(){
		if(this.props.ClientData.length === 0){
			this.props.GetAllClients();
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('All Clients : ',nextProps.ClientData);
	}
	addClient = () => {
		const data={
			'clientName':this.state.clientname,
			'username':this.state.username
		};
		const credentials = {
			'username':this.state.username,
			'password':this.state.password,
			'role':'Client'
		};
		this.props.AddCredentials(credentials);
		this.props.AddClient(data);
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
		console.log(this.props.ClientData);
		return (
			<div>
				<Modal show={this.state.isOpen} onHide={this.modalChange} style={{top:'50px'}}>
					<Modal.Header closeButton>
						<h1>Add Client</h1>
					</Modal.Header>
					<Modal.Body>
						<center><TextField
							id='clientname'
							floatingLabelText="Client Name"
							floatingLabelStyle={styles.underlineStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							onChange={this.onChange}
							value={this.state.clientname}
						/>
							<br />
							<TextField
								id='username'
								floatingLabelText="Client UserName"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.username}
							/>
							<br />
							<TextField
								id='password'
								floatingLabelText="Password"
								floatingLabelStyle={styles.underlineStyle}
								floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
								onChange={this.onChange}
								value={this.state.password}
							/>
							<br />
							<FlatButton label="Add Client" primary onClick={this.addClient} /></center>
					</Modal.Body>
				</Modal>
				<FloatingActionButton style={{position:'absolute',right:'40px', top:'90px'}} onClick={this.modalChange}>
					<ContentAdd />
				</FloatingActionButton>
				<Table>
					<TableHeader enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Client Name</TableHeaderColumn>
							<TableHeaderColumn>Client UserName</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{this.props.ClientData.map((v)=>{
							return <TableRow>
								<TableRowColumn>{v.clientName}</TableRowColumn>
								<TableRowColumn>{v.username}</TableRowColumn>
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
		ClientData:state.ClientReducer
	};
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		GetAllClients,
		AddClient,
		AddCredentials
	},dispatch);
};
export default connect(mapStateToProps,matchDispatchToProps)(Client);
