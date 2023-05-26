import React from 'react';
import Paginator from "../Paginator.jsx";
import CatalogBookList from "./CatalogBookList.jsx";
import CatalogSearch from "./CatalogSearch.jsx";
import CatalogBookListPlaceholder from "./CatalogBookListPlaceholder.jsx";


const CatalogList = ({isLoading, books, lastPage, currentPage, changePage, changing}) => {
    return (
        <div className='catalog-list'>
            <CatalogSearch changing={changing}/>
            {isLoading ? <CatalogBookListPlaceholder/> : <div>
                <CatalogBookList books={books}/>
                <div className='d-flex justify-content-center'>
                    <Paginator lastPage={lastPage} currentPage={currentPage} callback={changePage}/>
                </div>
            </div>
            }
        </div>
    );
};

export default CatalogList;
