import React from 'react';
import ErrorBigMessage from "../../ui/ErrorBigMessage.jsx";
import CatalogBookItem from "./CatalogBookItem.jsx";

const CatalogBookList = ({books}) => {
    return (
        <div>
            {books.length === 0 ? <ErrorBigMessage message={'Книги отсутствуют'}/> :
                books.map(book => <CatalogBookItem key={book.id} book={book}/>)}
        </div>
    );
};

export default CatalogBookList;
