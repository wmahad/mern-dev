import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: action.payload && Object.keys(action.payload).length > 0,
                user: action.payload,
            };
        default:
            return state;
    }
}
