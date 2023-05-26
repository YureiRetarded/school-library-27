import React from 'react';
import ErrorBigMessage from "../../ui/ErrorBigMessage.jsx";
import AuthorsElementItem from "./AuthorsElementItem.jsx";

const AuthorsElementList = ({authors}) => {
    return (
        <div>
            {authors.length === 0 ? <ErrorBigMessage message={'Авторы отсутствуют'}/> :
                authors.map(author => <AuthorsElementItem key={author.id} author={author}/>)}
        </div>
    );
};

export default AuthorsElementList;
