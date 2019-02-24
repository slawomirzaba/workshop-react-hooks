import React, { ReactElement, FunctionComponent, useContext } from 'react';
import { AuthContext } from '../../../../context';

export const Header: FunctionComponent = (): ReactElement<{}> => {
    const authorizationContext = useContext(AuthContext);

    return (
        <header className="header">
            <div className="logo">
                <i className="fas fa-tasks" /> <span>TO DO LIST</span>
            </div>
            {authorizationContext.authenticated ? (
                <button
                    onClick={authorizationContext.logout}
                    className="header__auth-button header__auth-button--logout"
                >
                    Log out
                </button>
            ) : (
                <button onClick={authorizationContext.login} className="header__auth-button">
                    Log in
                </button>
            )}
        </header>
    );
};
