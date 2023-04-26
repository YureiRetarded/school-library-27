import React, {useEffect, useState} from 'react';
import CountryTool from "./CountryTool.jsx";
import CountryList from "./CountryList.jsx";
import {useSelector} from "react-redux";
import CountryService from "../../../API/CountryService.js";
import CountyItemPlaceholder from "./CountyItemPlaceholder.jsx";

const Country = () => {
    const user = useSelector(state => state.user)
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchCountries = async () => {
            const response = await CountryService.getCountries(user)
            setCountries(response.data)
            setIsLoading(false)
        }
        fetchCountries();
    }, [])
    const destroyCountry = (id) => {
        setCountries(countries.filter(country => country.id !== id))
    }
    return (
        <div>
            <CountryTool/>
            {isLoading ? <CountyItemPlaceholder/> :
                <CountryList countries={countries} destroyCountry={destroyCountry}/>}
        </div>
    );
};

export default Country;
