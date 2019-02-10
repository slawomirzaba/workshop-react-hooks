const TO_DO_ITEMS_URL = 'https://react-hooks-to-do-list.firebaseio.com/items';

export const getFetchAndPostItemsUrl = () => `${TO_DO_ITEMS_URL}.json`;

export const getDeleteAndUpdateItemUrl = (itemId: string) => `${TO_DO_ITEMS_URL}/${itemId}.json`;
