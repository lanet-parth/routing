/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import NotFound from './containers/components/notfound';
import PublicNavlink from './containers/publicnav';
import PrivateNavlink from './containers/privatenav';
import Login from './containers/login';
import Home from './containers/components/userhome';
import About from './containers/components/about';
import Help from './containers/components/help';
import AdminHome from './containers/components/adminhome';
import AddState from "./containers/addstate";
import AddCity from "./containers/addcity";
import Client from './containers/AdminClient';
import Employee from './containers/employee';
import Project from './containers/project';
import Crud from './containers/usercrud';
import ClientHome from './containers/components/clientHome';
import Task from "./containers/task";

class App extends Component {
    render() {
        const PublicRoute = ({ component: Components, ...rest }) => {
            return (
                <Route {...rest} render={(routerProps) => {
                    return !this.props.loginReducer.user ?
                        <div>
	                        <PublicNavlink />
                            <Components {...routerProps} />
                        </div>
                        :
	                    this.props.loginReducer.user && localStorage.getItem('role') === 'User' ?
		                    <Redirect to="/home" />
		                    :
		                    this.props.loginReducer.user && localStorage.getItem('role') === 'Client' ?
			                    <Redirect to="/client/Home" />
			                    :
		                        <Redirect to="/adminhome" />
                }}
                />
            );
        };
        const UserRoute = ({ component: Components, ...rest }) => {
            return (
                <Route
                    {...rest}
                    render={(routerProps) => {
                        return this.props.loginReducer.user && localStorage.getItem('role') === 'User' ?
                            <div>
                                <PrivateNavlink />
                                <Components {...routerProps} />
                            </div>
                            :
	                        this.props.loginReducer.user && localStorage.getItem('role') === 'Admin' ?
                                <Redirect to="/adminhome" />
                                :
		                        this.props.loginReducer.user && localStorage.getItem('role') === 'Client' ?
			                        <Redirect to="/client/Home" />
			                        :
                                    <Redirect to="/login" />;
                    }
                    }
                />
            )
        };
	    const AdminRoute = ({ component: Components, ...rest }) => {
		    return (
                <Route
				    {...rest}
                    render={(routerProps) => {
					    return this.props.loginReducer.user && localStorage.getItem('role') === 'Admin' ?
                            <div>
                                <PrivateNavlink />
                                <Components {...routerProps} />
                            </div>
						    :
						    this.props.loginReducer.user && localStorage.getItem('role') === 'User' ?
                                <Redirect to="/home" />
                                :
							    this.props.loginReducer.user && localStorage.getItem('role') === 'Client' ?
								    <Redirect to="/client/Home" />
								    :
                                    <Redirect to="/login" />;
				    }
				    }
                />
		    )
	    };
	    const ClientRoute = ({ component: Components, ...rest }) => {
		    return (
			    <Route
				    {...rest}
				    render={(routerProps) => {
					    return this.props.loginReducer.user && localStorage.getItem('role') === 'Client' ?
						    <div>
							    <PrivateNavlink />
							    <Components {...routerProps} />
						    </div>
						    :
						    this.props.loginReducer.user && localStorage.getItem('role') === 'User' ?
							    <Redirect to="/home" />
							    :
							    this.props.loginReducer.user && localStorage.getItem('role') === 'Admin' ?
								    <Redirect to="/adminhome" />
								    :
							        <Redirect to="/login" />;
				    }
				    }
			    />
		    )
	    };
        return (
            <div>
                <Switch>
                    <PublicRoute exact path="/" component={Login} />
                    <PublicRoute exact path="/login" component={Login} />
                    <UserRoute exact path="/home" component={Home} />
                    <UserRoute exact path="/about" component={About} />
                    <UserRoute exact path="/help" component={Help} />
                    <UserRoute exact path="/crud" component={Crud} />
	                <AdminRoute exact path="/adminhome" component={AdminHome} />
	                <AdminRoute exact path="/state" component={AddState} />
	                <AdminRoute exact path="/city" component={AddCity} />
	                <AdminRoute exact path="/client" component={Client} />
	                <AdminRoute exact path="/employee" component={Employee} />
	                <ClientRoute exact path="/project" component={Project} />
	                <ClientRoute exact path="/client/Home" component={ClientHome} />
	                <UserRoute exact path="/client/Task" component={Task} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        );
    }
}

App.propTypes = {
    loginReducer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loginReducer: state.LoginReducer,
    };
};

export default withRouter(connect(mapStateToProps, null)(App));
