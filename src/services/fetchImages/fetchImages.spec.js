import moxios from 'moxios'
import fetchImages from './fetchImages';
import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

afterEach(cleanup);

describe('Test fetch success', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should renders request image correctly', async () => {
    const mockResponse = {
      status: 200,
      response:{
        results: [
          {
            id: "9SWHIgu8A8k",
            alt_description: "Test description 1",
            urls: {
              thumb: "Test url thumb 1"
            },
            likes: 621
          },
          {
            id: "9SWHIgujjj8A8k",
            alt_description: "Test description 2",
            urls: {
              thumb: "Test url thumb 2"
            },
            likes: 788
          },
        ],
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockResponse);
    });

    const result= await fetchImages();

    expect(result).toEqual(mockResponse.response.results);
    expect(result.length).toBe(2);
  });

  it('Should return error 400', async () => {
    const mock400 = {
      status: 400,
      response: { data: 'Request failed' }
    };

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(mock400);
    });


    const result = await fetchImages();

    expect(result.status).toBe(mock400.status);
    expect(result.response.data).toBe(mock400.response.data);
  });

  it('Should return error 401', async () => {
    const mock401 = {
      status: 401,
      response: { data: 'Unauthorized' }
    };

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject(mock401);
    });


    const { result } = renderHook(async () => await fetchImages());
    const response = await result.current;

    expect(response.status).toBe(mock401.status);
    expect(response.response.data).toBe(mock401.response.data);
    expect(response.error).toBeUndefined();
  });
});