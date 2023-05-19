import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import BookService from "../../../API/BookService.js";
import BookTool from "./BookTool.jsx";
import BookListPlaceholder from "./BookListPlaceholder.jsx";
import BookList from "./BookList.jsx";

const Book = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Книги
    const [books, setBooks] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Загружаем книги
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await BookService.getBooks(user);
            setBooks(response.data);
            setIsLoading(false);
        }
        fetchBooks();
    }, []);
    //Удаляем книгу из константы
    const destroyBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    }
    return (
        <div>
            <BookTool/>
            {isLoading ? <BookListPlaceholder/> : <BookList books={books} destroyBook={destroyBook}/>}
        </div>
    );
};

export default Book;
