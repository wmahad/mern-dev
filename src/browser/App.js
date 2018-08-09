import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/setauthtoken';
import { setCurrentUser, logOutUser } from './actions/auth'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import store from './store';


// check for token
const token = localStorage.jwtToken;
if (token) {
    setAuthToken(token);
    // decode token and set user info
    store.dispatch(setCurrentUser(token));
    const currentTime = Date.now() / 1000;
    const expired = jwt_decode(token);
    if (expired < currentTime) {
        store.dispatch(logOutUser());
        window.location.href = '/login';
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router>
                <div className='App'>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <div className='container'>
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                    </div>
                    <Footer />
                </div>
            </Router>
            </Provider>
        )
    }
}

export default App;
