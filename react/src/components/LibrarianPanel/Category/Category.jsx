import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import CategoryService from "../../../API/CategoryService.js";
import CategoryListPlaceholder from "./CategoryListPlaceholder.jsx";
import CategoryList from "./CategoryList.jsx";
import Paginator from "../../Paginator.jsx";

const Category = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Категории
    const [categories, setCategories] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Загружаем категории
    useEffect(() => {
        changePage(1);
    }, []);
    //Удаляем категорию из константы
    const destroyCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };
    //Меням страницу
    const changePage = (page) => {
        setIsLoading(true);
        const fetchCategories = async () => {
            const response = await CategoryService.getCategoriesByPages(user, page);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setCategories(response.data.data);
            setIsLoading(false);
        }
        fetchCategories();
    };
    return (
        <div>
            {isLoading ? <CategoryListPlaceholder/> : <div>
                <CategoryList categories={categories} destroyCategory={destroyCategory}/>
                <div className='d-flex justify-content-center'>
                    <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
                </div>
            </div>}
        </div>
    );
};

export default Category;
