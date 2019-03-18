import React from 'react';
import { mocked } from 'ts-jest/utils';
import {
    render,
    cleanup,
    fireEvent,
    waitForDomChange,
    waitForElement,
} from 'react-testing-library';
import { fetchItems, deleteItem, saveItem, updateItem } from '../services';
import { ToDoList as Container } from './';
import { ItemForm } from '../Components/ItemForm';
import { ItemsLists } from '../Components/ItemsLists';
import { ItemI } from '../interfaces/ItemI';

jest.mock('../services/fetchItems');
jest.mock('../services/deleteItem');
jest.mock('../services/saveItem');
jest.mock('../services/updateItem');
jest.mock('../lib/calculateProgressValue');
jest.mock('../Components/ItemForm');
jest.mock('../Components/ItemsLists');

const MOCKED_ITEMS: ItemI[] = [
    {
        id: 'taskId1',
        title: 'some item',
        description: 'description',
        isFinished: false,
        isImportant: false,
    },
    {
        id: 'taskId2',
        title: 'second item',
        description: '',
        isFinished: true,
        isImportant: true,
    },
];

const MOCKED_ITEMS_LIST = props => (
    <div data-testid="ItemsLists">
        <button data-testid="removeItem" onClick={() => props.removeItem(MOCKED_ITEMS[0].id)} />
        <button
            data-testid="setIsFinishedItem"
            onClick={() => props.setIsFinishedItem(MOCKED_ITEMS[0].id, true)}
        />
        <button
            data-testid="toggleIsImportantItem"
            onClick={() => props.toggleIsImportantItem(MOCKED_ITEMS[0].id)}
        />
        {[...props.toDoItems, ...props.finishedItems].map(item => (
            <span key={item.id} data-testid={item.id}>
                {JSON.stringify(props)}
            </span>
        ))}
    </div>
);

const MOCKED_FORM = props => (
    <div data-testid="ItemForm">
        <button
            data-testid="addItem"
            onClick={() =>
                props.addItem(
                    MOCKED_ITEMS[0].title,
                    MOCKED_ITEMS[0].description,
                    MOCKED_ITEMS[0].isImportant,
                )
            }
        />
    </div>
);

const fetchItemsMocked = mocked(fetchItems);
const saveItemMocked = mocked(saveItem);
const deleteItemMocked = mocked(deleteItem);
const updateItemMocked = mocked(updateItem);
const ItemFormMocked = mocked(ItemForm);
const ItemsListsMocked = mocked(ItemsLists);

describe('Todo items Container', () => {
    beforeEach(() => {
        fetchItemsMocked.mockClear();
        saveItemMocked.mockClear();
        deleteItemMocked.mockClear();
        updateItemMocked.mockClear();
        ItemsListsMocked.mockClear();

        fetchItemsMocked.mockImplementation((): Promise<ItemI[]> => Promise.resolve([]));
        saveItemMocked.mockImplementation((): Promise<ItemI> => Promise.resolve(MOCKED_ITEMS[0]));
        deleteItemMocked.mockImplementation((): Promise<void> => Promise.resolve());
        updateItemMocked.mockImplementation((): Promise<void> => Promise.resolve());
        ItemFormMocked.mockImplementation(MOCKED_FORM);
        ItemsListsMocked.mockImplementation(MOCKED_ITEMS_LIST);
    });

    afterEach(cleanup);

    it('should render form and columns', () => {
        const { getByTestId } = render(<Container />);

        const itemForm = getByTestId('ItemForm');
        const itemsLists = getByTestId('ItemsLists');

        expect(itemForm).toBeTruthy();
        expect(itemsLists).toBeTruthy();
    });

    it('should fetch items and display them in columns after loading page', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve(MOCKED_ITEMS));
        const { container, getByTestId } = render(<Container />);

        await waitForDomChange({ container });
        const firstItem = getByTestId('taskId1');
        const secondItem = getByTestId('taskId2');

        expect(firstItem).toBeTruthy();
        expect(secondItem).toBeTruthy();
    });

    it('should add item', async () => {
        const { container, getByTestId } = render(<Container />);
        const addItemButton = getByTestId('addItem');

        fireEvent.click(addItemButton);
        await waitForDomChange({ container });
        const firstItem = getByTestId('taskId1');

        expect(firstItem).toBeTruthy();
        expect(saveItemMocked).toBeCalledTimes(1);
        expect(saveItemMocked).toBeCalledWith({
            title: MOCKED_ITEMS[0].title,
            description: MOCKED_ITEMS[0].description,
            isImportant: MOCKED_ITEMS[0].isImportant,
            isFinished: false,
        });
    });

    it('should remove item', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve([MOCKED_ITEMS[0]]));
        const { container, getByTestId, queryByTestId } = render(<Container />);
        const removeItemButton = getByTestId('removeItem');

        await waitForDomChange({ container });
        const itemBeforeRemove = getByTestId('taskId1');

        fireEvent.click(removeItemButton);
        await waitForDomChange({ container });

        const itemAfterRemove = queryByTestId('taskId1');

        expect(itemBeforeRemove).toBeTruthy();
        expect(itemAfterRemove).toBeNull();
        expect(deleteItemMocked).toBeCalledTimes(1);
        expect(deleteItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id);
    });

    it('should toggle is important item', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve([MOCKED_ITEMS[0]]));
        const { container, getByTestId } = render(<Container />);
        const toggleButton = getByTestId('toggleIsImportantItem');

        await waitForDomChange({ container });
        const itemContentBeforeToggle = getByTestId('taskId1').textContent;

        fireEvent.click(toggleButton);

        await waitForDomChange({ container });
        const itemContentAfterToggle = getByTestId('taskId1').textContent;

        expect(itemContentBeforeToggle).toContain(`"isImportant":${MOCKED_ITEMS[0].isImportant}`);
        expect(itemContentAfterToggle).toContain(`"isImportant":${!MOCKED_ITEMS[0].isImportant}`);
        expect(updateItem).toBeCalledTimes(1);
        expect(updateItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id, {
            isImportant: !MOCKED_ITEMS[0].isImportant,
        });
    });

    it('should do nothing with item when action toggle is executed on not existing item', () => {
        const { getByTestId } = render(<Container />);
        const toggleButton = getByTestId('toggleIsImportantItem');

        fireEvent.click(toggleButton);

        expect(updateItem).toBeCalledTimes(0);
    });

    it('should set isFinished state to true on item', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve([MOCKED_ITEMS[0]]));
        const { container, getByTestId } = render(<Container />);
        const setIsFinishedButton = getByTestId('setIsFinishedItem');

        await waitForDomChange({ container });
        const itemContentBeforeSetIsFinished = getByTestId('taskId1').textContent;

        fireEvent.click(setIsFinishedButton);

        await waitForDomChange({ container });
        const itemContentAfterSetIsFinished = getByTestId('taskId1').textContent;

        expect(itemContentBeforeSetIsFinished).toContain('"isFinished":false');
        expect(itemContentAfterSetIsFinished).toContain('"isFinished":true');
        expect(updateItem).toBeCalledTimes(1);
        expect(updateItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id, {
            isFinished: !MOCKED_ITEMS[0].isFinished,
        });
    });
});
