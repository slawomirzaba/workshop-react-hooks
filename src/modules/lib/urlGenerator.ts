import config from '../../config.json';

const TO_DO_ITEMS_URL = config.TO_DO_ITEMS_URL;

export const getFetchAndPostItemsUrl = () => `${TO_DO_ITEMS_URL}.json`;

export const getDeleteAndUpdateItemUrl = (itemId: string) => `${TO_DO_ITEMS_URL}/${itemId}.json`;
