import React, { FunctionComponent, ReactElement } from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsList } from '../Components/ItemsList';

export const Container: FunctionComponent = (): ReactElement<{}> => {
    return (
        <div>
            <ItemForm />
            <ItemsList />
        </div>
    );
};
