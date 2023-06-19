import React, {useEffect, useState} from 'react';
import CountryService from "../../API/CountryService.js";
import {Spinner} from "react-bootstrap";
import AuthorsFormList from "./AuthorsFormList.jsx";

const AuthorsForm = ({changing}) => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchCountry = async () => {
            const response = await CountryService.getCountries();
            setCountries(response.data);
            setIsLoading(false);
        }
        fetchCountry();
    }, []);
    return (
        <div className='catalog-form'>
            {isLoading ? <Spinner/> : <AuthorsFormList countries={countries} changing={changing}/>}
        </div>
    );
};

export default AuthorsForm;
