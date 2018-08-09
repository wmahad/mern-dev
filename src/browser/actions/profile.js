import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, PROFILE_NOT_FOUND } from './types';

export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading());
    const {data} = await axios.get('/api/profile');
    dispatch({
        type: GET_PROFILE,
        payload: data,
    });
}

export const setProfileLoading = () => ({ type: PROFILE_LOADING })