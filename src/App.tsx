import React, { Component } from 'react';
import { ToDoList } from './modules/ToDoList/Container';
import { Header } from './modules/Common/Components/Header';
import './App.css';

class App extends Component<{}> {
    render() {
        return (
            <>
                <div className="background" />
                <Header />
                <ToDoList />
            </>
        );
    }
}

export default App;
