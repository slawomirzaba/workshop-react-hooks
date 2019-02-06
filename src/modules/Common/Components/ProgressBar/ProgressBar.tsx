import React, { FunctionComponent, ReactElement } from 'react';

interface PropsI {
    percentValue: string;
}

export const ProgressBar: FunctionComponent<PropsI> = ({
    percentValue,
}: PropsI): ReactElement<PropsI> => (
    <div className="progress-bar">
        <div style={{ width: `${percentValue}%` }} />
        <span>{percentValue}%</span>
    </div>
);
