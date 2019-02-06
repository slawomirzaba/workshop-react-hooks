import React, { ReactElement, FunctionComponent } from 'react';

export const Header: FunctionComponent = (): ReactElement<{}> => (
    <header className="header">
        <div className="logo">
            <i className="fas fa-tasks" /> <span>TO DO LIST</span>
        </div>
    </header>
);
