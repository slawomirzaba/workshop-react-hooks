import React, { FunctionComponent, ReactElement } from 'react';
import { ToDoList } from './modules/ToDoList/Container';
import { Header } from './modules/Common/Components/Header';
import './App.css';

const App: FunctionComponent = (): ReactElement<{}> => {
    return (
        <>
            <div className="background" />
            <Header />
            <ToDoList />
        </>
    );
};

export default App;
