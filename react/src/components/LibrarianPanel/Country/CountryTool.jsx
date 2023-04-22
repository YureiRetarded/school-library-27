import React from 'react';
import {Link} from "react-router-dom";

const CountryTool = () => {
    return (
        <div className='btn-group mb-1'>
            <Link to={'create'} className='btn btn-primary'>Добавить страну</Link>
        </div>
    );
};

export default CountryTool;
