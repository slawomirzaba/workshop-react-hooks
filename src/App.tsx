import React, { useState, FunctionComponent, ReactElement } from 'react';
import { ToDoList } from './modules/ToDoList/Container';
import { Header } from './modules/Common/Components/Header';
import { AuthContext } from './context/';
import './App.css';

const App: FunctionComponent = (): ReactElement<{}> => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = (): void => {
        setIsAuthenticated(true);
    };

    const logoutHandler = (): void => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                authenticated: isAuthenticated,
                login: loginHandler,
                logout: logoutHandler,
            }}
        >
            <div className="background" />
            <Header />
            <ToDoList />
        </AuthContext.Provider>
    );
};

export default App;
