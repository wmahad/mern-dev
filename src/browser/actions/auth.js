import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/setauthtoken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => async dispatch => {
    // use a try catch block to get errors
    // dispatch on error with a type of GET_ERRORS
    const user = await axios.post('/api/auth/register', userData);
    history.push('/login');
};

export const loginUser = (userData) => async (dispatch) => {
    const response = await axios.post('/api/auth/login', userData);
    const {token} = response.data
    // store token in local storage
    localStorage.setItem('jwtToken', token);
    // set auth to header
    setAuthToken(token);
    dispatch(setCurrentUser(token));
};

export const setCurrentUser = token => ({
    type: SET_CURRENT_USER,
    payload: token ? jwt_decode(token) : {},
});

export const logOutUser = () => dispatch => {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
    // remove auth to header
    setAuthToken();
    dispatch(setCurrentUser());
};
