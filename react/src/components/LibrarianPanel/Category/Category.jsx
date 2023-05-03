import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import CategoryService from "../../../API/CategoryService.js";
import CategoryTool from "./CategoryTool.jsx";
import CategoryListPlaceholder from "./CategoryListPlaceholder.jsx";
import CategoryList from "./CategoryList.jsx";

const Category = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Категории
    const [categories, setCategories] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Загружаем категории
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await CategoryService.getCategories(user);
            setCategories(response.data);
            setIsLoading(false);
        }
        fetchCategories();
    }, []);
    //Удаляем категорию из константы
    const destroyCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    }
    return (
        <div>
            <CategoryTool/>
            {isLoading ? <CategoryListPlaceholder/> :
                <CategoryList categories={categories} destroyCategory={destroyCategory}/>}
        </div>
    );
};

export default Category;
