import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from '../utils/setauthtoken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => async (dispatch) => {
    // use a try catch block to get errors
    // dispatch on error with a type of GET_ERRORS
    const user = await axios.post('/api/auth/register', userData);
    history.push('/login');
    // dispatch({
    //     type: USER_CREATED,
    //     payload: user,
    // });
};

export const loginUser = (userData) => async (dispatch) => {
    const { token } = await axios.post('/api/auth/login', userData).data;
    // store token in local storage
    localStorage.setItem('jwtToken', token);
    // set auth to header
    setAuthToken(token);
    dispatch({
        type: SET_CURRENT_USER,
        payload: jwtDecode(token),
    })
};
