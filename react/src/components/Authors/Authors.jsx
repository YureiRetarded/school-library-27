import React, {useEffect, useState} from 'react';
import AuthorService from "../../API/AuthorService.js";
import AuthorsList from "./AuthorsList.jsx";
import AuthorsForm from "./AuthorsForm.jsx";

const Authors = () => {
    //Авторы
    const [authors, setAuthors] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Поиск по имени
    const [searchName, setSearchName] = useState('');
    //Поиск по странам
    const [searchCountry, setSearchCountry] = useState(null);
    //Есть ли параметры для поиска
    const [haveParameters, setHaveParameters] = useState(false);
    //Загружаем книги
    useEffect(() => {
        changePage(1);
    }, []);
    //Меняем имя для поиска
    const changingName = (values) => {
        if (values?.name || searchCountry) {
            setHaveParameters(true);
        } else {
            setHaveParameters(false);
        }
        if (values?.name && values.name.length > 0) {
            setSearchName(values.name);
        } else {
            setSearchName('');
        }
    };
    //Меня параметры(страны)
    const changingParameter = (values) => {
        if (values?.category) {
            setHaveParameters(true);
        } else {
            setHaveParameters(false);
        }

        if (values?.country) {
            setSearchCountry(values.country);
        } else {
            setSearchCountry(null);
        }
    };
    //Получаем все параметры поиска в виде get параметров
    const getAllParameters = () => {
        let string = '';
        if (searchName.length > 0) {
            string = string + '&name=' + searchName;
        }
        if (searchCountry !== null) {
            string = string + '&country_id=' + searchCountry;
        }
        return string;
    };
    //Меням страницу
    const changePage = (page) => {
        setIsLoading(true);
        const fetchAuthors = async () => {
            const response = await AuthorService.getAuthorsWithParameters(page, getAllParameters());
            if (response.status) {
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
                setAuthors(response.data.data);
            }
            setIsLoading(false);
        }
        fetchAuthors();
    };
    //Перезагружаем данные если параметры поменялись
    useEffect(() => {
        changePage(1)
    }, [searchCountry, searchName, haveParameters]);

    return (
        <div className='catalog'>
            <AuthorsForm changing={changingParameter}/>
            <AuthorsList isLoading={isLoading} lastPage={lastPage} currentPage={currentPage} changePage={changePage}
                         authors={authors} changing={changingName}/>
        </div>
    );
};

export default Authors;
