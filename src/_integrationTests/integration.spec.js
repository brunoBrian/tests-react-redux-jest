import moxios from 'moxios';
import { testStore } from './../../Utils';
import { fetchPosts } from './../actions';
import { fetchUser } from './../actions/getUser';

import userMocks from '../__mocks__/userMocks';
import postsMocks from '../__mocks__/postsMocks';

describe('fetchPosts action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly', () => {
        const responseMock = postsMocks.getPostsSuccessMock;
        const store = testStore();
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(responseMock);
        });

        return store.dispatch(fetchPosts())
        .then(() => {
            const newState = store.getState();

            expect(newState.data.items).toBe(responseMock.response);
        })
    });

    test('Request failed - 400', () => {
        const responseMock = postsMocks.getPostsError400Mock;
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(responseMock)
        });

        return store.dispatch(fetchPosts())
        .then(() => {
            const newState = store.getState();
            expect(newState.data.error).toBe(responseMock.response.data);
        })
    });

    test('Should reject the request - 401', done => {
        const responseMock = postsMocks.getPostsError401Mock;
        const store = testStore();
        
        moxios.wait(() => {
          const request = moxios.requests.mostRecent()
          request.reject(responseMock)
        });

        return store.dispatch(fetchPosts())
        .then(() => {
            const newState = store.getState();
            expect(newState.data.error).toBe(responseMock.response.data);
            done();
        });
    })
});

describe('fetchUser action', () => {
    beforeEach(() => {
        moxios.install(); // Install moxios before each test
    });

    afterEach(() => {
        moxios.uninstall(); // Uninstall moxios after each test
    });

    test('Store is updated correctly', () => {
        const responseMock = userMocks.getUserSuccessMock;
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(responseMock);
        });

        return store.dispatch(fetchUser())
        .then(() => {
            const newState = store.getState();

            expect(newState.data.user).toBe(responseMock.response);
        })
    });

    test('Request failed - 400', () => {
        const responseMock = userMocks.getUserError400Mock;
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(responseMock)
        });

        return store.dispatch(fetchUser())
        .then(() => {
            const newState = store.getState();
            expect(newState.data.error).toBe(responseMock.message);
        })
    });

    test('Request failed - 401', () => {
        const responseMock = userMocks.getUserError401Mock;
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.reject(responseMock)
        });

        return store.dispatch(fetchUser())
        .then(() => {
            const newState = store.getState();
            expect(newState.data.error).toBe(responseMock.message);
        })
    })
})