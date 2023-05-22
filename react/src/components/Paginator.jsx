import React from 'react';
import {Pagination} from "react-bootstrap";

const Paginator = ({lastPage, currentPage, callback}) => {
    //Переход на первую страницу
    const toFirstPage = () => {
        if (currentPage !== 1)
            callback(1);
    }
    //Переход на предыдущую страницу
    const toPrevPage = () => {
        if (currentPage !== 1)
            callback(currentPage - 1);
    }
    //Переход на следующую страницу
    const toNextPage = () => {
        if (currentPage !== lastPage)
            callback(currentPage + 1);
    }
    //Переход на последнюю страницу
    const toLastPage = () => {
        if (currentPage !== lastPage)
            callback(lastPage);
    }
    //Переход на текущую страницу - 2
    const toPageNumberMinusTwo = () => {
        callback(currentPage - 2);
    }
    //Переход на текущую страницу + 2
    const toPageNumberPlusTwo = () => {
        callback(currentPage + 2);
    }
    return (
        <Pagination>
            <Pagination.First disabled={currentPage === 1} onClick={toFirstPage}/>
            <Pagination.Prev disabled={currentPage === 1} onClick={toPrevPage}/>
            {currentPage - 3 > 0 && <Pagination.Item onClick={toFirstPage}>{1}</Pagination.Item>}
            {currentPage - 3 > 1 && <Pagination.Ellipsis/>}
            {currentPage - 2 > 0 &&
                <Pagination.Item onClick={toPageNumberMinusTwo}>{currentPage - 2}</Pagination.Item>}
            {currentPage - 1 > 0 && <Pagination.Item onClick={toPrevPage}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active={currentPage}>{currentPage}</Pagination.Item>
            {currentPage + 1 <= lastPage &&
                <Pagination.Item onClick={toNextPage}>{currentPage + 1}</Pagination.Item>}
            {currentPage + 2 <= lastPage &&
                <Pagination.Item onClick={toPageNumberPlusTwo}>{currentPage + 2}</Pagination.Item>}
            {currentPage + 3 <= lastPage - 1 && <Pagination.Ellipsis/>}
            {currentPage + 3 <= lastPage && <Pagination.Item onClick={toLastPage}>{lastPage}</Pagination.Item>}
            <Pagination.Next disabled={currentPage === lastPage} onClick={toNextPage}/>
            <Pagination.Last disabled={currentPage === lastPage} onClick={toLastPage}/>
        </Pagination>
    );
};

export default Paginator;
