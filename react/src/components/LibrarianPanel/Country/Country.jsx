import React, {useEffect, useState} from 'react';
import CountryTool from "./CountryTool.jsx";
import CountryList from "./CountryList.jsx";
import {useSelector} from "react-redux";
import CountryService from "../../../API/CountryService.js";
import CountryItemPlaceholder from "./CountryItemPlaceholder.jsx";
import CountryListPlaceholder from "./CountryListPlaceholder.jsx";

const Country = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //Странны
    const [countries, setCountries] = useState([]);
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Загружаем страны
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await CountryService.getCountries(user);
            setCountries(response.data);
            setIsLoading(false);
        }
        fetchCountries();
    }, []);
    //Удаляем страну из константы
    const destroyCountry = (id) => {
        setCountries(countries.filter(country => country.id !== id));
    }
    return (
        <div>
            <CountryTool/>
            {isLoading ? <CountryListPlaceholder/> :
                <CountryList countries={countries} destroyCountry={destroyCountry}/>}
        </div>
    );
};

export default Country;
