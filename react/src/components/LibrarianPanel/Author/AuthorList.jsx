import React from 'react';
import ErrorBigMessage from "../../../ui/ErrorBigMessage.jsx";
import AuthorItem from "./AuthorItem.jsx";

const AuthorList = ({authors, destroyAuthor}) => {
    return (
        <div>
            {authors.length === 0 ? <ErrorBigMessage message={'Авторы отсутствуют'}/> :
                authors.map(author => <AuthorItem key={author.id} author={author} destroyAuthor={destroyAuthor}/>)}
        </div>
    );
};

export default AuthorList;
