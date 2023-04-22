import React, {useEffect, useState} from 'react';
import CountryTool from "./CountryTool.jsx";
import CountryList from "./CountryList.jsx";
import axios from "axios";
import {useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";

const Country = () => {
    const user = useSelector(state => state.user)
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
        setIsLoading(true)
        axios.get('http://127.0.0.1:8000/api/country', config).then(response => {
            setIsLoading(false)
            if (response.data.success) {
                setCountries(response.data.data)
            }
        })

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
