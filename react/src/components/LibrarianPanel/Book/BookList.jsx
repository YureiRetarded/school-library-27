import React from 'react';
import ErrorBigMessage from "../../../ui/ErrorBigMessage.jsx";
import BookItem from "./BookItem.jsx";

const BookList = ({books, destroyBook}) => {
    return (
        <div>
            {books.length === 0 ? <ErrorBigMessage message={'Книги отсутствуют'}/> :
                books.map(book => <BookItem key={book.id} book={book} destroyBook={destroyBook}/>)}
        </div>
    );
};

export default BookList;
