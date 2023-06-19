import React, {useEffect, useState} from 'react';
import AuthorTool from "./AuthorTool.jsx";
import {useSelector} from "react-redux";
import AuthorService from "../../../API/AuthorService.js";
import AuthorList from "./AuthorList.jsx";
import AuthorListPlaceholder from "./AuthorListPlaceholder.jsx";
import Paginator from "../../Paginator.jsx";

const Author = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Авторы
    const [authors, setAuthors] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Загружаем авторов
    useEffect(() => {
        changePage(1);
    }, []);
    //Удаляем автора из константы
    const destroyAuthor = (id) => {
        setAuthors(authors.filter(author => author.id !== id));
    };
    //Меням страницу
    const changePage = (page) => {
        setIsLoading(true);
        const fetchAuthors = async () => {
            const response = await AuthorService.getAuthorsByPage(user, page);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setAuthors(response.data.data);
            setIsLoading(false);
        }
        fetchAuthors();
    };
    return (
        <div>
            <AuthorTool/>
            {isLoading ? <AuthorListPlaceholder/> : <div>
                <AuthorList authors={authors} destroyAuthor={destroyAuthor}/>
                <div className='d-flex justify-content-center'>
                    <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
                </div>
            </div>}
        </div>
    );
};

export default Author;
