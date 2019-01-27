import React, { useState } from 'react';
import { ItemForm } from '../Components/ItemForm';
import { ItemsList } from '../Components/ItemsList';

export const Container = () => {
    const [items, setItems] = useState([]);

    const onItemSubmit = (name: string, status: string) => {};

    return (
        <div>
            <ItemForm />
            <ItemsList />
        </div>
    );
};
