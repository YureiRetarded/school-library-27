import React, {useEffect, useState} from 'react';
import GlobalService from "../../API/GlobalService.js";
import {Spinner} from "react-bootstrap";
import CatalogFormList from "./CatalogFormList.jsx";

const CatalogForm = ({changing}) => {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchCategoriesAndAuthors = async () => {
            const response = await GlobalService.getParameters();
            setAuthors(response.data.authors);
            setCategories(response.data.categories);
            setIsLoading(false);
        }
        fetchCategoriesAndAuthors();
    }, []);
    return (
        <div className='catalog-form'>
            {isLoading ? <Spinner/> : <CatalogFormList categories={categories} authors={authors} changing={changing}/>}
        </div>
    );
};

export default CatalogForm;
