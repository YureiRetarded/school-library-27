import React, {useEffect, useState} from 'react';
import CountryTool from "./CountryTool.jsx";
import CountryList from "./CountryList.jsx";
import {useSelector} from "react-redux";
import CountryService from "../../../API/CountryService.js";
import CountryListPlaceholder from "./CountryListPlaceholder.jsx";
import Paginator from "../../Paginator.jsx";

const Country = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Страны
    const [countries, setCountries] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Текущая страница
    const [currentPage, setCurrentPage] = useState(1);
    //Последняя страница
    const [lastPage, setLastPage] = useState(1);
    //Загружаем страны
    useEffect(() => {
        changePage(1);
    }, []);
    //Удаляем страну из константы
    const destroyCountry = (id) => {
        setCountries(countries.filter(country => country.id !== id));
    };
    const changePage = (page) => {
        setIsLoading(true);
        const fetchCountries = async () => {
            const response = await CountryService.getCountriesByPage(user, page);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setCountries(response.data.data);
            setIsLoading(false);
        }
        fetchCountries();
    };
    return (
        <div>
            <CountryTool/>
            {isLoading ? <CountryListPlaceholder/> : <div>
                <CountryList countries={countries} destroyCountry={destroyCountry}/>
                <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
            </div>}
        </div>
    );
};

export default Country;
