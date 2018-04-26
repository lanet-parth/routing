/* eslint-disable linebreak-style */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, { history } from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
	    <MultiThemeProvider>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
	    </MultiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
