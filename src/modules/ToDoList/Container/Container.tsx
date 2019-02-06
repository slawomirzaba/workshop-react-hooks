import React, { FunctionComponent, ReactElement } from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsLists } from '../Components/ItemsLists';
import { ItemI } from '../interfaces/ItemI';

export const Container: FunctionComponent = (): ReactElement<{}> => {
    const items = [
        {
            id: '1',
            title: 'jakis tam task to do',
            description: 'description taska ktory ma zostac wykonnay i jets fajny',
            isFinished: false,
            isImportant: false,
        },
        {
            id: '3',
            title: 'jakis tam trudny item',
            description:
                'description taska ktory ma zostac wykonnay i jets fajny i jest super i powinien zostac zrobiony ale jets trudny',
            isFinished: false,
            isImportant: true,
        },
        {
            id: '2',
            title: 'jakis tam task skonczony',
            description: 'description asasd',
            isFinished: true,
            isImportant: false,
        },
    ];
    const toDoItems: ItemI[] = [];
    const finishedItems: ItemI[] = [];
    items.forEach((item: ItemI) => {
        if (item.isFinished) finishedItems.push(item);
        else toDoItems.push(item);
    });
    const finishedItemsPercentage = toDoItems.length
        ? 100 - (toDoItems.length * 100) / (toDoItems.length + finishedItems.length)
        : 0;

    return (
        <div className="content">
            <ItemForm />
            <ItemsLists
                toDoItems={toDoItems}
                finishedItems={finishedItems}
                finishedItemsPercentage={finishedItemsPercentage}
            />
        </div>
    );
};
