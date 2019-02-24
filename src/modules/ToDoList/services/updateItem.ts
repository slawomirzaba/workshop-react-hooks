import { getDeleteAndUpdateItemUrl } from '../../lib/urlGenerator';
import { ItemI } from '../interfaces/ItemI';

export const updateItem = (itemId: string, updatedProperties: Partial<ItemI>): Promise<null> => {
    const url = getDeleteAndUpdateItemUrl(itemId);

    return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedProperties),
    }).then(response => response.json());
};
