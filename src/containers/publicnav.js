import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';

class PublicNavlink extends Component {
    state = {
        show: false,
        progress: 0,
        logged:false,
        open:false,
    };
    dismiss = () => {
        this.setState({
            show: !this.state.show,
        });
    };
    visible = () => {
        this.setState({
            show: !this.state.show,
        });
    };
	handleToggle = () => this.setState({ open: !this.state.open });
    clicked = () => {
        this.handleToggle();
    };
    render() {
        return (
            <div>
                <AppBar
                    title="Demo App"
                    onLeftIconButtonClick={this.clicked}
                    iconElementRight={<FlatButton label='Login' />}
                />
            </div>
        );
    }
}

export default PublicNavlink;
