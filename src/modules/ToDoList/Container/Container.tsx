import React, { FunctionComponent, ReactElement, useEffect, useMemo, useReducer } from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsLists } from '../Components/ItemsLists';
import { ItemI, DataBaseItemI } from '../interfaces/ItemI';
import { fetchItems, saveItem, deleteItem, updateItem } from '../services';
import { itemsReducer } from './itemsReducer';

const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

export const Container: FunctionComponent = (): ReactElement<{}> => {
    const [itemsState, dispatchItems] = useReducer(itemsReducer, {
        items: [],
        toDoItems: [],
        finishedItems: [],
        finishedItemsPercentage: 0,
    });

    useEffect(() => {
        fetchItems().then((newItems: ItemI[]) => {
            dispatchItems({
                type: SET_ITEMS,
                items: newItems,
            });
        });
    }, []);

    const addItem = (title: string, description: string, isImportant: boolean): void => {
        const newItem: DataBaseItemI = {
            title,
            description,
            isImportant,
            isFinished: false,
        };

        saveItem(newItem).then((itemWithId: ItemI) => {
            dispatchItems({
                type: ADD_ITEM,
                item: itemWithId,
            });
        });
    };

    const removeItem = (itemId: string): void => {
        deleteItem(itemId).then(() => {
            dispatchItems({
                itemId,
                type: REMOVE_ITEM,
            });
        });
    };

    const setIsFinishedItem = (itemId: string, isFinished: boolean): void => {
        updateItem(itemId, { isFinished }).then(() => {
            dispatchItems({
                itemId,
                type: UPDATE_ITEM,
                updatedProperties: {
                    isFinished,
                },
            });
        });
    };

    const toggleIsImportantItem = (itemId: string): void => {
        const currentItem = itemsState.items.find(item => item.id === itemId);
        if (!currentItem) return;

        const newIsImportantState = !currentItem.isImportant;

        updateItem(itemId, { isImportant: newIsImportantState }).then(() => {
            dispatchItems({
                itemId,
                type: UPDATE_ITEM,
                updatedProperties: {
                    isImportant: newIsImportantState,
                },
            });
        });
    };

    return (
        <div>
            <div className="content">
                {useMemo(
                    () => (
                        <ItemForm addItem={addItem} />
                    ),
                    [],
                )}
                <ItemsLists
                    toDoItems={itemsState.toDoItems}
                    finishedItems={itemsState.finishedItems}
                    finishedItemsPercentage={itemsState.finishedItemsPercentage}
                    removeItem={removeItem}
                    setIsFinishedItem={setIsFinishedItem}
                    toggleIsImportantItem={toggleIsImportantItem}
                />
            </div>
        </div>
    );
};
