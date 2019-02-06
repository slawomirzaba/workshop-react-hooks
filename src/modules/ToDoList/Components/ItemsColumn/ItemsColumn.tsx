import React, { ReactElement, FunctionComponent } from 'react';
import { ItemI } from '../../interfaces/ItemI';
import { Item } from '../Item';

interface PropsI {
    columnTitle: string;
    items: ItemI[];
}

export const ItemsColumn: FunctionComponent<PropsI> = ({
    columnTitle,
    items,
}: PropsI): ReactElement<PropsI> => (
    <div className="items-column">
        <div className="items-column__title">{columnTitle}</div>
        <div className="items-column__items">
            {items.map((item: ItemI) => (
                <Item {...item} key={item.id} />
            ))}
        </div>
    </div>
);
