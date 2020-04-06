import { types } from './../../actions/types';

export const INITIAL_STATE = {
    user: [],
    items: [],
    error: false
};

export default (state=INITIAL_STATE, action) => {

    switch(action.type){
        case types.GET_POSTS:
            return {...state, items: action.payload}
        case types.GET_POSTS_ERROR:
            return {...state, error: action.payload}
        case types.GET_USER:
            return {...state, user: action.payload}
        case types.GET_USER_ERROR:
            return {...state, error: action.payload}
        default:
            return state;
    }
};