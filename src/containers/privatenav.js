import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar, IconButton, IconMenu, MenuItem, Drawer } from 'material-ui';
import { push } from 'react-router-redux';
import ActionHome from 'material-ui/svg-icons/action/home';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { UserLogoutAction } from '../actions/loginAction';
import { getEmployeeById } from '../actions/employeeAction';

class PrivateNavlink extends Component {
	componentWillMount(){
		this.props.getEmployeeById();
	}
    constructor(){
        super();
        this.state = {
            open: false,
        };
    }
	handleToggle = () => this.setState({ open: !this.state.open });
	clicked = () => {
		this.handleToggle();
	};
	logout = () => {
        this.props.UserLogoutAction();
    };
	Home = () => {
	    localStorage.getItem('role') === 'User' ? this.props.toHome() : this.props.toAdminHome();

    };
    render() {
	    const iconStyles = {
		    marginRight: 24,
	    };
	    const Logged = (props) => (
            <div><ActionHome
                style={iconStyles}
                onClick={this.Home}
            />
	        <IconMenu
			    {...props}
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
			    }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <NavLink to="/help"><MenuItem primaryText="Help" /></NavLink>
                <MenuItem primaryText="Sign out" onClick={this.logout} />
            </IconMenu></div>
	    );
	    const UserLeftMenu = (props) => {
	    	console.log('adad',this.props.LoggedData.employeeDesignation);
		    return <Drawer
			    {...props}
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={this.handleToggle}
            >
                <AppBar title="User" onLeftIconButtonClick={this.clicked} />
                <NavLink to="/home"><MenuItem>Home</MenuItem></NavLink>
                <NavLink to="/about"><MenuItem >About Us</MenuItem></NavLink>
                <NavLink to="/crud"><MenuItem >Crud Operations</MenuItem></NavLink>
			    {
					this.props.LoggedData.employeeDesignation === 'Manager'?
						<div>
							<NavLink to="/client/Task"><MenuItem>Add Task</MenuItem></NavLink>
							<NavLink to="/crud"><MenuItem >Assign Task</MenuItem></NavLink>
						</div>
						:
						''
			    }
            </Drawer>
	    };
	    const AdminLeftMenu = (props) => {
		    return <Drawer
			    {...props}
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={this.handleToggle}
            >
                <AppBar title="Admin" onLeftIconButtonClick={this.clicked} />
                <NavLink to="/adminhome"><MenuItem>Home</MenuItem></NavLink>
                <NavLink to="/state"><MenuItem>Add State</MenuItem></NavLink>
                <NavLink to="/city"><MenuItem>Add City</MenuItem></NavLink>
                <NavLink to="/client"><MenuItem>Add Client</MenuItem></NavLink>
                <NavLink to="/employee"><MenuItem>Add Employee</MenuItem></NavLink>
            </Drawer>
	    };
	    const ClientLeftMenu = (props) => {
	    	return <Drawer
			    {...props}
			    docked={false}
			    width={200}
			    open={this.state.open}
			    onRequestChange={this.handleToggle}
		    >
			    <AppBar title="Client" onLeftIconButtonClick={this.clicked} />
			    <NavLink to="/client/Home"><MenuItem>Home</MenuItem></NavLink>
			    <NavLink to="/project"><MenuItem>Add Project</MenuItem></NavLink>
		    </Drawer>
	    };
        return (
            <div>
                {
                    localStorage.getItem('role') === 'Admin' ?
                        <div>
                            <AdminLeftMenu />
                            <AppBar
                            title="Admin"
                            onLeftIconButtonClick={this.clicked}
                            iconElementRight={<Logged />}
                            />
                        </div>
                    :
	                    localStorage.getItem('role') === 'User'?
                        <div>
                            <UserLeftMenu />
                            <AppBar
                                title="User"
                                onLeftIconButtonClick={this.clicked}
                                iconElementRight={<Logged />}
                            />
                        </div>
	                    :
		                    <div>
			                    <ClientLeftMenu />
			                    <AppBar
			                        title="Client"
			                        onLeftIconButtonClick={this.clicked}
			                        iconElementRight={<Logged />}
			                    />
		                    </div>
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
	return {
		LoggedData:state.LoggedReducer,
		LoginData:state.LoginReducer
	};
};
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        UserLogoutAction,
        toHome: () => push('/home'),
        toAdminHome: () => push('/adminhome'),
	    getEmployeeById,
    }, dispatch);
};
export default connect(mapStateToProps, matchDispatchToProps)(PrivateNavlink);
