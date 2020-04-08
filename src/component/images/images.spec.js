import React from 'react';
import {mount, shallow} from 'enzyme';
import Images from './';
import axios from 'axios'
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('Test Images', () => {
    it('Should not fetch data and return 0 images', async () => {
        const component = await shallow(<Images />);
        expect(component.find('img').length).toBe(0);
    });

    it('renders hello correctly', async () => {
        const mockRequest = {
            data:{
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
        axios.get.mockResolvedValue(mockRequest);

        const component = mount(<Images />);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            component.update();
        });

        const images = component.find('img');
        const likes = component.find('p');

        images.forEach((image, index) => {
            expect(image.prop('src')).toBe(mockRequest.data.results[index].urls.thumb);
            expect(image.prop('alt')).toBe(mockRequest.data.results[index].alt_description);
        })

        likes.forEach((like, index) => {
            expect(like.text()).toBe(`Likes: ${mockRequest.data.results[index].likes}`);
        })
        expect(images.length).toBe(2);
        expect(likes.length).toBe(2);
        
  });
    
})