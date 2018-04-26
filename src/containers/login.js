import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { TextField, FlatButton } from 'material-ui';
import { orange500, blue500 } from 'material-ui/styles/colors';
import { UserLoginAction } from '../actions/loginAction';
import '../App.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    submit = () => {
        const user = {
            'username': this.state.username,
            'password': this.state.password,
        };
	    this.props.UserLoginAction(user);
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
            <div className="loginform">
                <center><table>
                    <th colSpan={2} >
                        <h1 className='heading'>Login</h1>
                    </th>
                    <tr>
                        <td>
                            <TextField
                                id='username'
                                floatingLabelText="Username"
                                floatingLabelStyle={styles.underlineStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                onChange={this.onChange}
                                value={this.state.username}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                id='password'
                                type='password'
                                floatingLabelText="Password"
                                floatingLabelStyle={styles.underlineStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='loginButton'>
                            <FlatButton label="Login" primary onClick={this.submit} />
                        </td>
                    </tr>
                </table>
                </center>
            </div>
        );
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        UserLoginAction,
    }, dispatch);
};

export default withRouter(connect(null, matchDispatchToProps)(Login));
