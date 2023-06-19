import React from 'react';

const ErrorBigMessage = ({message}) => {
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">{message}</h4>
        </div>
    );
};

export default ErrorBigMessage;
