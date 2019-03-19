import React from 'react';
import { cleanup } from 'react-testing-library';
import { Item } from './Item';

describe('Item', () => {
    afterEach(cleanup);

    const GIVEN_ITEM_PROPS = {
        columnTitle: 'columnTitleTest',
        removeItem: jest.fn(),
        setIsFinishedItem: jest.fn(),
        id:'idTest',
        title:'titleTest',
        description:'descriptionTest',
        isFinished:false,
        isImportant:false,
    }

    test('should pop up alert on unmount', () => {
        expect(true).toBe(false);
    });
});
