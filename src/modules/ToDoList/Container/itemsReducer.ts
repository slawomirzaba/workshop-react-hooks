import { ItemI } from '../interfaces/ItemI';
import { calculateProgressValue } from '../lib';

interface ActionI {
    type: string;
    items?: ItemI[];
    item?: ItemI;
    itemId?: string;
    updatedProperties?: Partial<ItemI>;
}

interface ItemsReducerStateI {
    items: ItemI[];
    toDoItems: ItemI[];
    finishedItems: ItemI[];
    finishedItemsPercentage: number;
}

const getGroupedItems = (items: ItemI[]): [ItemI[], ItemI[]] => {
    const toDoItems: ItemI[] = [];
    const finishedItems: ItemI[] = [];

    items.forEach((item: ItemI) => {
        if (item.isFinished) finishedItems.push(item);
        else toDoItems.push(item);
    });

    return [toDoItems, finishedItems];
};

const mapItemsToReducerState = (items: ItemI[]): ItemsReducerStateI => {
    const [toDoItems, finishedItems] = getGroupedItems(items);
    const finishedItemsPercentage = calculateProgressValue(toDoItems.length, finishedItems.length);

    return {
        items,
        toDoItems,
        finishedItems,
        finishedItemsPercentage,
    };
};

export const itemsReducer = (
    itemsState: ItemsReducerStateI,
    action: ActionI,
): ItemsReducerStateI => {
    switch (action.type) {
        case 'SET_ITEMS': {
            const items = action.items || [];
            return mapItemsToReducerState(items);
        }
        case 'ADD_ITEM': {
            const items = action.item ? [...itemsState.items, action.item] : itemsState.items;
            return mapItemsToReducerState(items);
        }
        case 'REMOVE_ITEM': {
            const items = itemsState.items.filter((item: ItemI) => item.id !== action.itemId);
            return mapItemsToReducerState(items);
        }
        case 'UPDATE_ITEM': {
            const items = itemsState.items.map((item: ItemI) => {
                if (item.id !== action.itemId) return item;
                return {
                    ...item,
                    ...action.updatedProperties,
                };
            });
            return mapItemsToReducerState(items);
        }
        default: {
            throw new Error('undefiend Action type');
        }
    }
};
