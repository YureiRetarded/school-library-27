import React, {useEffect, useState} from 'react';
import AuthorTool from "./AuthorTool.jsx";
import {useSelector} from "react-redux";
import AuthorService from "../../../API/AuthorService.js";
import AuthorList from "./AuthorList.jsx";
import AuthorItemPlaceholder from "./AuthorItemPlaceholder.jsx";
import AuthorListPlaceholder from "./AuthorListPlaceholder.jsx";

const Author = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Страны
    const [authors, setAuthors] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Загружаем авторов
    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await AuthorService.getAuthors(user);
            setAuthors(response.data);
            setIsLoading(false);
        }
        fetchAuthors();
    }, []);
    //Удаляем автора из константы
    const destroyCountry = (id) => {
        setAuthors(authors.filter(author => author.id !== id));
    }
    return (
        <div>
            <AuthorTool/>
            {isLoading?<AuthorListPlaceholder/>:<AuthorList authors={authors} destroyAuthor={destroyCountry}/>}
        </div>
    );
};

export default Author;
