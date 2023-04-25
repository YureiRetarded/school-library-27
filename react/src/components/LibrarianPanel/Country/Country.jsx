import React, {useEffect, useState} from 'react';
import CountryTool from "./CountryTool.jsx";
import CountryList from "./CountryList.jsx";
import {useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import CountryService from "../../../API/CountryService.js";

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
            {isLoading ? <Spinner animation='border'/> :
                <CountryList countries={countries} destroyCountry={destroyCountry}/>}
        </div>
    );
};

export default Country;
