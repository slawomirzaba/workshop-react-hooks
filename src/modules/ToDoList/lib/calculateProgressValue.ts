export const calculateProgressValue = (todoItemsLength: number, finishedItemsLength: number) => {
    if (!todoItemsLength && !finishedItemsLength) return 0;

    return 100 - (todoItemsLength * 100) / (todoItemsLength + finishedItemsLength);
};
