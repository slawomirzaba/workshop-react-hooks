import { getFetchAndPostItemsUrl } from '../../lib/urlGenerator';
import { ItemI } from '../interfaces/ItemI';

export const fetchItems = (): Promise<ItemI[]> => {
    const url = getFetchAndPostItemsUrl();

    return fetch(url)
        .then(response => response.json())
        .then(items => {
            const newItems: ItemI[] = [];
            for (const key in items) {
                newItems.push({ id: key, ...items[key] });
            }

            return newItems;
        });
};
