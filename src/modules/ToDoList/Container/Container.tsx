import React, {FunctionComponent, ReactElement, useEffect, useState} from 'react';
import {ItemForm} from '../Components/ItemForm';
import {ItemsLists} from '../Components/ItemsLists';
import {DataBaseItemI, ItemI} from '../interfaces/ItemI';
import {calculateProgressValue} from '../lib';
import {deleteItem, fetchItems, saveItem, updateItem} from "../services";

export const Container: FunctionComponent = (): ReactElement<{}> => {
    const [items, setItems] = useState<ItemI[]>([]);
    const [toDoItems, setToDoItems] = useState<ItemI[]>([]);
    const [finishedItems, setFinishedItems] = useState<ItemI[]>([]);

    const [finishedItemsPercentage, setFinishItemPercentage] = useState(0);

    useEffect(() => {
        dbFetchItems();
    }, []);

    useEffect(() => {
        const newFinishedItems: ItemI[] = [];
        const newToDoItems: ItemI[] = [];
        items.forEach((item: ItemI) => {
            if (item.isFinished) newFinishedItems.push(item);
            else newToDoItems.push(item);
        });
        setToDoItems(newToDoItems);
        setFinishedItems(newFinishedItems);
        setFinishItemPercentage(calculateProgressValue(newToDoItems.length, newFinishedItems.length));
    }, [items]);

    const dbFetchItems = () => fetchItems().then((newItems) => {
        setItems(newItems);
    });

    const addNewItem = (title: string, description: string, isImportant: boolean) => {
        const newItem: DataBaseItemI = {
            title: title,
            description: description,
            isFinished: false,
            isImportant: isImportant,
        };
        saveItem(newItem).then((addedItem: ItemI) => {
            setItems([...items, addedItem]);
        });
    };

    const removeItem = (itemId: string): void => {
        deleteItem(itemId).then((item) => {
            setItems(items.filter((item) => item.id !== itemId));
        })
    };

    const setItemFinished = (itemId:string, isFinished:boolean) => {
          updateItem(itemId, {
              isFinished: isFinished,
          }).then((item)=>{
              setItems((prevItems:ItemI[]) => {
                  const newItems = [...prevItems];
                  newItems.map((item:ItemI)=>{
                      if(item.id === itemId){
                          item.isFinished=isFinished;
                      }
                  });
                  return newItems;
              })
          })
    };

    return (
        <div className="content">
            <ItemForm addNewItem={addNewItem}/>
            <ItemsLists
                toDoItems={toDoItems}
                finishedItems={finishedItems}
                finishedItemsPercentage={finishedItemsPercentage}
                removeItem={removeItem}
                setItemFinished={setItemFinished}
            />
        </div>
    );
};
