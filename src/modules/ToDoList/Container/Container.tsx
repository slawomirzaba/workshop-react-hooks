import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsLists } from '../Components/ItemsLists';
import { ItemI, DataBaseItemI } from '../interfaces/ItemI';
import { fetchItems, saveItem, deleteItem, updateItem } from '../services';
import { calculateProgressValue } from '../lib';

export const Container: FunctionComponent = (): ReactElement<{}> => {
    const [items, setItems] = useState<ItemI[]>([]);
    const [toDoItems, setToDoItems] = useState<ItemI[]>([]);
    const [finishedItems, setFinishedItems] = useState<ItemI[]>([]);
    const [finishedItemsPercentage, setFinishedItemsPercentage] = useState(0);

    useEffect(() => {
        fetchItems().then((newItems: ItemI[]) => {
            setItems(newItems);
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
            setItems((prevItems: ItemI[]) => [...prevItems, itemWithId]);
        });
    };

    const removeItem = (itemId: string): void => {
        deleteItem(itemId).then(() => {
            setItems((prevItems: ItemI[]) => prevItems.filter((item: ItemI) => item.id !== itemId));
        });
    };

    const setIsFinishedItem = (itemId: string, isFinished: boolean): void => {
        updateItem(itemId, { isFinished }).then(() => {
            setItems((prevItems: ItemI[]) =>
                prevItems.map((item: ItemI) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            isFinished: isFinished,
                        };
                    }
                    return item;
                }),
            );
        });
    };

    const toggleIsImportantItem = (itemId: string): void => {
        const currentItem = items.find(item => item.id === itemId);
        if (!currentItem) return;

        const newIsImportantState = !currentItem.isImportant;

        updateItem(itemId, { isImportant: newIsImportantState }).then(() => {
            setItems((prevItems: ItemI[]) =>
                prevItems.map((item: ItemI) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            isImportant: newIsImportantState,
                        };
                    }
                    return item;
                }),
            );
        });
    };

    return (
        <div className="content">
            <ItemForm addItem={addItem} />
            <ItemsLists
                toDoItems={toDoItems}
                finishedItems={finishedItems}
                finishedItemsPercentage={finishedItemsPercentage}
                removeItem={removeItem}
                setIsFinishedItem={setIsFinishedItem}
                toggleIsImportantItem={toggleIsImportantItem}
            />
        </div>
    );
};
