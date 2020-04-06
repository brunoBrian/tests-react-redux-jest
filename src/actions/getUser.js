import { types } from './types';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
    await axios.get('https://api.github.com/users/brunoBrian')
    .then(res => {
        dispatch({
            type: types.GET_USER,
            payload: res.data
        })
        return res;
    })
    .catch(err => {
        dispatch({
            type: types.GET_USER_ERROR,
            payload: err.message || 'Ops! Error'
        })
    })
};