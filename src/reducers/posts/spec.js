import { types } from './../../actions/types';
import postsReducer, {INITIAL_STATE} from './reducer';

describe('Posts Reducer', () => {

    it('Should return default state', () => {
        const newState = postsReducer(undefined, {});
        expect(newState).toEqual(INITIAL_STATE);
    });

    it('Should return new state if receiving type to update posts', () => {

        const items = [{ title: 'Test 1'}, { title: 'Test 2'}, { title: 'Test 3'}];
        const newState = postsReducer(undefined, {
            type: types.GET_POSTS,
            payload: items
        });

        expect(newState).toEqual({...INITIAL_STATE, items});
    });

    it('Should return new state if receiving type to update users', () => {

        const user = { 
            login: "franSales",
            id: 20588822,
            url: "https://api.github.com/users/franSales",
            html_url: "https://github.com/franSales",
        };

        const newState = postsReducer(undefined, {
            type: types.GET_USER,
            payload: user
        });

        expect(newState).toEqual({...INITIAL_STATE, user});
    });

});