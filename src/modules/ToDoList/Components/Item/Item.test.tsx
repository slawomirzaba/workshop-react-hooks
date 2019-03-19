import React from 'react';
import { Item } from './Item';
import { render } from 'react-testing-library';

describe('Item', () => {
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
        const EXPECTED_MESSAGE = `Item has been moved from '${GIVEN_ITEM_PROPS.columnTitle}' columns`
        spyOn(window, 'alert');
        const { unmount } = render(
            <Item
                {...GIVEN_ITEM_PROPS}
            />,
        );
        unmount();
        expect(window.alert).toHaveBeenCalledWith(EXPECTED_MESSAGE);
    });
});
