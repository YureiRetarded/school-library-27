import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import BookService from "../../../API/BookService.js";
import BookTool from "./BookTool.jsx";
import BookListPlaceholder from "./BookListPlaceholder.jsx";
import BookList from "./BookList.jsx";
import Paginator from "../../Paginator.jsx";

const Book = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Книги
    const [books, setBooks] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Загружаем книги
    useEffect(() => {
        changePage(1);
    }, []);
    //Удаляем книгу из константы
    const destroyBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };
    //Меням страницу
    const changePage = (page) => {
        setIsLoading(true);
        const fetchBooks = async () => {
            const response = await BookService.getBooksByPage(user, page);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setBooks(response.data.data);
            setIsLoading(false);
        }
        fetchBooks();
    };
    return (
        <div>
            <BookTool/>
            {isLoading ? <BookListPlaceholder/> : <div>
                <BookList books={books} destroyBook={destroyBook}/>
                <div className='d-flex justify-content-center'>
                    <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
                </div>
            </div>
            }
        </div>
    );
};

export default Book;
