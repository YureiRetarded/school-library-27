import React from 'react';
import CatalogSearch from "../Catalog/CatalogSearch.jsx";
import CatalogBookListPlaceholder from "../Catalog/CatalogBookListPlaceholder.jsx";
import Paginator from "../Paginator.jsx";
import AuthorsElementList from "./AuthorsElementList.jsx";

const AuthorsList = ({isLoading, authors, lastPage, currentPage, changePage, changing}) => {
    return (
        <div className='catalog-list'>
            <CatalogSearch changing={changing}/>
            {isLoading ? <CatalogBookListPlaceholder/> : <div>
                <AuthorsElementList authors={authors}/>
                <div className='d-flex justify-content-center'>
                    <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
                </div>
            </div>
            }
        </div>
    );
};

export default AuthorsList;
