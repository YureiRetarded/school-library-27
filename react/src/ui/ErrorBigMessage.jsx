import React from 'react';

const ErrorBigMessage = () => {
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Вы не авторизованны!</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit
                longer so that you can see how spacing within an alert works with this kind of content.</p>
        </div>
    );
};

export default ErrorBigMessage;
