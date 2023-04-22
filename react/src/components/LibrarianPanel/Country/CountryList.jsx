import React from 'react';
import CountryItem from "./CountryItem.jsx";
import ErrorBigMessage from "../../../ui/ErrorBigMessage.jsx";

const CountryList = ({countries, destroyCountry}) => {

    return (
        <div>
            {countries.length === 0 ? <ErrorBigMessage message={'Страны отсутствуют'}/> :
                countries.map(country =>
                    <CountryItem country={country} key={country.id} destroyCountry={destroyCountry}/>
                )}
        </div>
    );
};

export default CountryList;
