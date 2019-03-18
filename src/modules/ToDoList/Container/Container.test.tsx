import React from 'react';
import { mocked } from 'ts-jest/utils';
import {
    render,
    cleanup,
    fireEvent,
    waitForElement,
    waitForDomChange,
} from 'react-testing-library';
import { fetchItems, deleteItem, saveItem, updateItem } from '../services';
import { calculateProgressValue } from '../lib/calculateProgressValue';
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
    <div id="ItemsLists">
        <button id="removeItem" onClick={() => props.removeItem(MOCKED_ITEMS[0].id)} />
        <button
            id="setIsFinishedItem"
            onClick={() => props.setIsFinishedItem(MOCKED_ITEMS[0].id, true)}
        />
        <button
            id="toggleIsImportantItem"
            onClick={() => props.toggleIsImportantItem(MOCKED_ITEMS[0].id)}
        />
        {[...props.toDoItems, ...props.finishedItems].map(item => (
            <span key={item.id} id={item.id}>
                {JSON.stringify(props)}
            </span>
        ))}
    </div>
);

const MOCKED_FORM = props => (
    <div id="ItemForm">
        <button
            id="addItem"
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
const calculateProgressValueMocked = mocked(calculateProgressValue);
const ItemFormMocked = mocked(ItemForm);
const ItemsListsMocked = mocked(ItemsLists);

describe('Todo items Container', () => {
    beforeEach(() => {
        fetchItemsMocked.mockClear();
        saveItemMocked.mockClear();
        deleteItemMocked.mockClear();
        updateItemMocked.mockClear();
        ItemsListsMocked.mockClear();
        calculateProgressValueMocked.mockClear();

        fetchItemsMocked.mockImplementation((): Promise<ItemI[]> => Promise.resolve([]));
        saveItemMocked.mockImplementation((): Promise<ItemI> => Promise.resolve(MOCKED_ITEMS[0]));
        deleteItemMocked.mockImplementation((): Promise<void> => Promise.resolve());
        updateItemMocked.mockImplementation((): Promise<void> => Promise.resolve());
        ItemFormMocked.mockImplementation(MOCKED_FORM);
        ItemsListsMocked.mockImplementation(MOCKED_ITEMS_LIST);
        calculateProgressValueMocked.mockImplementation(() => 10);
    });

    afterEach(cleanup);

    it('should render form and columns', () => {
        const { container } = render(<Container />);

        const itemForm = container.querySelector('#ItemForm');
        const itemsLists = container.querySelector('#ItemsLists');

        expect(itemForm).toBeTruthy();
        expect(itemsLists).toBeTruthy();
    });

    it('should fetch items and display them in columns after loading page', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve(MOCKED_ITEMS));
        const { container } = render(<Container />);

        await waitForDomChange({ container });
        const firstItem = container.querySelector('#taskId1');
        const secondItem = container.querySelector('#taskId2');

        expect(calculateProgressValueMocked).toBeCalledTimes(2);
        expect(firstItem).toBeTruthy();
        expect(secondItem).toBeTruthy();
    });

    it('should add item', async () => {
        const { container } = render(<Container />);
        const addItemButton = container.querySelector('#addItem') as Element;

        fireEvent.click(addItemButton);
        await waitForDomChange({ container });
        const firstItem = container.querySelector('#taskId1');

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
        const { container } = render(<Container />);
        const removeItemButton = container.querySelector('#removeItem') as Element;

        await waitForDomChange({ container });
        const firstItemBeforeRemove = container.querySelector('#taskId1');

        fireEvent.click(removeItemButton);
        await waitForDomChange({ container });

        const firstItemAfterRemove = container.querySelector('#taskId1');

        expect(firstItemBeforeRemove).toBeTruthy();
        expect(firstItemAfterRemove).toBeNull();
        expect(deleteItemMocked).toBeCalledTimes(1);
        expect(deleteItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id);
    });

    it('should toggle is important item', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve([MOCKED_ITEMS[0]]));
        const { container } = render(<Container />);
        const toggleButton = container.querySelector('#toggleIsImportantItem') as Element;

        await waitForDomChange({ container });
        const firstItemContentBeforeToggle = (container.querySelector('#taskId1') as Element)
            .textContent;

        fireEvent.click(toggleButton);

        await waitForDomChange({ container });
        const firstItemContentAfterToggle = (container.querySelector('#taskId1') as Element)
            .textContent;

        expect(firstItemContentBeforeToggle).toContain(
            `"isImportant":${MOCKED_ITEMS[0].isImportant}`,
        );
        expect(firstItemContentAfterToggle).toContain(
            `"isImportant":${!MOCKED_ITEMS[0].isImportant}`,
        );
        expect(updateItem).toBeCalledTimes(1);
        expect(updateItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id, {
            isImportant: !MOCKED_ITEMS[0].isImportant,
        });
    });

    it('should do nothing with item when action toggle is executed on not existing item', () => {
        const { container } = render(<Container />);
        const toggleButton = container.querySelector('#toggleIsImportantItem') as Element;

        fireEvent.click(toggleButton);

        expect(updateItem).toBeCalledTimes(0);
    });

    it('should set isFinished state to true on item', async () => {
        fetchItemsMocked.mockImplementation(() => Promise.resolve([MOCKED_ITEMS[0]]));
        const { container } = render(<Container />);
        const setIsFinishedButton = container.querySelector('#setIsFinishedItem') as Element;

        await waitForDomChange({ container });

        const firstItemContentBeforeSetIsFinished = (container.querySelector('#taskId1') as Element)
            .textContent;

        fireEvent.click(setIsFinishedButton);

        await waitForDomChange({ container });
        const firstItemContentAfterSetIsFinished = (container.querySelector('#taskId1') as Element)
            .textContent;

        expect(firstItemContentBeforeSetIsFinished).toContain('"isFinished":false');
        expect(firstItemContentAfterSetIsFinished).toContain('"isFinished":true');
        expect(updateItem).toBeCalledTimes(1);
        expect(updateItemMocked).toBeCalledWith(MOCKED_ITEMS[0].id, {
            isFinished: !MOCKED_ITEMS[0].isFinished,
        });
    });
});
