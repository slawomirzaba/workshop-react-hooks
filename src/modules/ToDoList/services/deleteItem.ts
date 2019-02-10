import { getDeleteAndUpdateItemUrl } from '../../lib/urlGenerator';

export const deleteItem = (itemId: string): Promise<null> => {
    const url = getDeleteAndUpdateItemUrl(itemId);

    return fetch(url, {
        method: 'DELETE',
    }).then(response => response.json());
};
