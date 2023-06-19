import React, {useEffect, useState} from 'react';
import CatalogForm from "./CatalogForm.jsx";
import CatalogList from "./CatalogList.jsx";
import BookService from "../../API/BookService.js";

const Catalog = () => {
    //Книги
    const [books, setBooks] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Поиск по имени
    const [searchName, setSearchName] = useState('');
    //Поиск по категории
    const [searchCategory, setSearchCategory] = useState(null);
    //Поиск по авторам
    const [searchAuthors, setSearchAuthors] = useState([]);
    //Есть ли параметры для поиска
    const [haveParameters, setHaveParameters] = useState(false);
    //Загружаем книги
    useEffect(() => {
        changePage(1);
    }, []);
    //Меняем имя для поиска
    const changingName = (values) => {
        if (values?.name || searchAuthors || searchCategory) {
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
    //Меня параметры(категории авторы)
    const changingParameter = (values) => {
        if (values?.category || (values?.authors && values.authors.length > 0) || searchName) {
            setHaveParameters(true);
        } else {
            setHaveParameters(false);
        }

        if (values?.category) {
            setSearchCategory(values.category);
        } else {
            setSearchCategory(null);
        }
        if (values?.authors && values.authors.length > 0) {
            setSearchAuthors(values.authors);
            let authorsString = '';
            values.authors.map(author => {
                authorsString = authorsString + '&[]authors=' + author
            })
        } else {
            setSearchAuthors([]);
        }
    };
    //Получаем все параметры поиска в виде get параметров
    const getAllParameters = () => {
        let string = '';
        if (searchName.length > 0) {
            string = string + '&name=' + searchName;
        }
        if (searchCategory !== null) {
            string = string + '&category_id=' + searchCategory;
        }
        if (searchAuthors.length > 0) {
            let authorsString = '';
            searchAuthors.map(author => {
                authorsString = authorsString + '&authors[]=' + author
            })
            string = string + authorsString;
        }
        return string;
    };
    //Меням страницу
    const changePage = (page) => {
        setIsLoading(true);
        const fetchBooks = async () => {
            const response = await BookService.getBooksWithParameters(page, getAllParameters());
            if (response.status) {
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
                setBooks(response.data.data);
            }
            setIsLoading(false);
        }
        fetchBooks();
    };
    //Перезагружаем данные если параметры поменялись
    useEffect(() => {
        changePage(1)
    }, [searchCategory, searchAuthors, searchName, haveParameters]);

    return (
        <div className='catalog'>
            <CatalogForm changing={changingParameter}/>
            <CatalogList isLoading={isLoading} lastPage={lastPage} currentPage={currentPage} changePage={changePage}
                         books={books} changing={changingName}/>
        </div>
    );
};

export default Catalog;
