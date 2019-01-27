import React, { Component } from 'react';
import { ToDoList } from './modules/ToDoList/Container';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <ToDoList />
            </div>
        );
    }
}

export default App;
