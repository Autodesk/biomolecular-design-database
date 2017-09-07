import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose }  from 'redux';
import { Provider } from 'react-redux';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';

import routes from './routes';
import rootReducer from './rootReducer';

//Thunk middleware allows us to dispatch async actions 
const store = createStore( 
	rootReducer, 
	compose( applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f) );

if(localStorage.jwtToken) { //has a 'bearer <token>'
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes} />
	</Provider>,  document.getElementById('app'));

