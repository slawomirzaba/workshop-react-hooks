import React, {
    FunctionComponent,
    ReactElement,
    useState,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsLists } from '../Components/ItemsLists';
import { ItemI, DataBaseItemI } from '../interfaces/ItemI';
import { fetchItems, saveItem, deleteItem, updateItem } from '../services';
import { calculateProgressValue } from '../lib';

const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

interface ActionI {
    type: string;
    items?: ItemI[];
    item?: ItemI;
    itemId?: string;
    updatedProperties?: Partial<ItemI>;
}

const itemsReducer = (items: ItemI[] = [], action: ActionI): ItemI[] => {
    switch (action.type) {
        case 'SET_ITEMS': {
            return action.items || [];
        }
        case 'ADD_ITEM': {
            return action.item ? [...items, action.item] : items;
        }
        case 'REMOVE_ITEM': {
            return items.filter((item: ItemI) => item.id !== action.itemId);
        }
        case 'UPDATE_ITEM': {
            return items.map((item: ItemI) => {
                if (item.id !== action.itemId) return item;
                return {
                    ...item,
                    ...action.updatedProperties,
                };
            });
        }
        default: {
            return items;
        }
    }
};

export const Container: FunctionComponent = (): ReactElement<{}> => {
    const [items, dispatchItems] = useReducer(itemsReducer, []);
    const [toDoItems, setToDoItems] = useState<ItemI[]>([]);
    const [finishedItems, setFinishedItems] = useState<ItemI[]>([]);
    const [finishedItemsPercentage, setFinishedItemsPercentage] = useState(0);

    useEffect(() => {
        fetchItems().then((newItems: ItemI[]) => {
            dispatchItems({
                type: SET_ITEMS,
                items: newItems,
            });
        });
    }, []);

    useEffect(() => {
        const newToDoItems: ItemI[] = [];
        const newFinishedItems: ItemI[] = [];

        items.forEach((item: ItemI) => {
            if (item.isFinished) newFinishedItems.push(item);
            else newToDoItems.push(item);
        });
        const newFinishedItemsPercentage = calculateProgressValue(
            newToDoItems.length,
            newFinishedItems.length,
        );

        setToDoItems(newToDoItems);
        setFinishedItems(newFinishedItems);
        setFinishedItemsPercentage(newFinishedItemsPercentage);
    }, [items]);

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
            })
        });
    };

    const setIsFinishedItem = (itemId: string, isFinished: boolean): void => {
        updateItem(itemId, { isFinished }).then(() => {
            dispatchItems({
                itemId,
                type: UPDATE_ITEM,
                updatedProperties: {
                    isFinished,
                }
            });
        });
    };

    const toggleIsImportantItem = (itemId: string): void => {
        const currentItem = items.find(item => item.id === itemId);
        if (!currentItem) return;

        const newIsImportantState = !currentItem.isImportant;

        updateItem(itemId, { isImportant: newIsImportantState }).then(() => {
            dispatchItems({
                itemId,
                type: UPDATE_ITEM,
                updatedProperties: {
                    isImportant: newIsImportantState,
                }
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
                    toDoItems={toDoItems}
                    finishedItems={finishedItems}
                    finishedItemsPercentage={finishedItemsPercentage}
                    removeItem={removeItem}
                    setIsFinishedItem={setIsFinishedItem}
                    toggleIsImportantItem={toggleIsImportantItem}
                />
            </div>
        </div>
    );
};
