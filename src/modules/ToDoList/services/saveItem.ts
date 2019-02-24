import { getFetchAndPostItemsUrl } from '../../lib/urlGenerator';
import { ItemI, DataBaseItemI } from '../interfaces/ItemI';

export const saveItem = (newItem: DataBaseItemI): Promise<ItemI> => {
    const url = getFetchAndPostItemsUrl();

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(newItem),
    })
        .then(response => response.json())
        .then((response: { name: string }) => {
            return {
                id: response.name,
                ...newItem,
            };
        });
};
