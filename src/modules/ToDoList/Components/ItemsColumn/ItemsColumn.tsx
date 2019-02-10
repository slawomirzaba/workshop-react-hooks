import React, { ReactElement, FunctionComponent } from 'react';
import { ItemI } from '../../interfaces/ItemI';
import { Item } from '../Item';

interface PropsI {
    columnTitle: string;
    items: ItemI[];
    removeItem: (itemId: string) => void;
    toggleIsImportantItem?: (itemId: string) => void;
    setIsFinishedItem: (itemId: string, isFinished: boolean) => void;
}

export const ItemsColumn: FunctionComponent<PropsI> = ({
    columnTitle,
    items,
    removeItem,
    setIsFinishedItem,
    toggleIsImportantItem,
}: PropsI): ReactElement<PropsI> => (
    <div className="items-column">
        <div className="items-column__title">{columnTitle}</div>
        <div className="items-column__items">
            {items.map((item: ItemI) => (
                <Item
                    {...item}
                    key={item.id}
                    removeItem={removeItem}
                    setIsFinishedItem={setIsFinishedItem}
                    columnTitle={columnTitle}
                    toggleIsImportantItem={toggleIsImportantItem}
                />
            ))}
        </div>
    </div>
);
