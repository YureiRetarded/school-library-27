import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import BookService from "../../../API/BookService.js";
import {Document, Page} from "react-pdf/dist/esm/entry.vite";
import {Pagination, Spinner} from "react-bootstrap";
import EmptyComponent from "../../EmptyComponent.jsx";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const BookReadFile = () => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user);
    //ID книги в адресной строке
    const {bookId} = useParams();
    //Кол-во страниц
    const [numPages, setNumPages] = useState(1);
    //Текущая страница
    const [pageNumber, setPageNumber] = useState(1);
    //Книга в base64
    const [base64Book, setBase64Book] = useState('');
    //Состояние загрузки
    const [isLoading, setIsLoading] = useState(true);
    //Переход на первую страницу
    const firstPage = () => {
        if (pageNumber !== 1)
            setPageNumber(1);
    };
    //Переход на предыдущую страницу
    const prevPage = () => {
        if (pageNumber !== 1)
            setPageNumber(pageNumber - 1);
    };
    //Переход на следующую страницу
    const nextPage = () => {
        if (pageNumber !== numPages)
            setPageNumber(pageNumber + 1);
    };
    //Переход на последнюю страницу
    const lastPage = () => {
        if (pageNumber !== numPages)
            setPageNumber(numPages);
    };
    //Переход на текущую страницу - 2
    const pageNumberMinusTwo = () => {
        setPageNumber(pageNumber - 2);
    };
    //Переход на текущую страницу + 2
    const pageNumberPlusTwo = () => {
        setPageNumber(pageNumber + 2);
    };
    //Загрузка книги
    useEffect(() => {
        const fetchBook = async () => {
            const response = await BookService.getBookFile(user, bookId);
            if (response.status) {
                setBase64Book(response.data);
                setIsLoading(false)

            } else {
                console.log(response);
            }
        };
        fetchBook();
    }, []);

    //Когда книга загружена
    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages);
    };

    return (
        <div>
            {isLoading ?
                <Spinner animation="border" variant="dark"/> :
                <div className='book'>
                    <Document
                        file={`data:application/pdf;base64,${base64Book}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        error={''}
                        loading={<Spinner animation='border'/>}
                        className='book-app'
                    >
                        <Page pageNumber={pageNumber}
                              canvasBackground={'white'}
                              error={''}
                              loading={<EmptyComponent/>}
                              renderTextLayer={false}
                              className='book-page'
                        ></Page>
                    </Document>
                    <Pagination className='book-paginate'>
                        <Pagination.First disabled={pageNumber === 1} onClick={firstPage}/>
                        <Pagination.Prev disabled={pageNumber === 1} onClick={prevPage}/>
                        {pageNumber - 3 > 0 && <Pagination.Item onClick={firstPage}>{1}</Pagination.Item>}
                        {pageNumber - 3 > 1 && <Pagination.Ellipsis/>}
                        {pageNumber - 2 > 0 &&
                            <Pagination.Item onClick={pageNumberMinusTwo}>{pageNumber - 2}</Pagination.Item>}
                        {pageNumber - 1 > 0 && <Pagination.Item onClick={prevPage}>{pageNumber - 1}</Pagination.Item>}
                        <Pagination.Item active={pageNumber}>{pageNumber}</Pagination.Item>
                        {pageNumber + 1 <= numPages &&
                            <Pagination.Item onClick={nextPage}>{pageNumber + 1}</Pagination.Item>}
                        {pageNumber + 2 <= numPages &&
                            <Pagination.Item onClick={pageNumberPlusTwo}>{pageNumber + 2}</Pagination.Item>}
                        {pageNumber + 3 <= numPages - 1 && <Pagination.Ellipsis/>}
                        {pageNumber + 3 <= numPages && <Pagination.Item onClick={lastPage}>{numPages}</Pagination.Item>}
                        <Pagination.Next disabled={pageNumber === numPages} onClick={nextPage}/>
                        <Pagination.Last disabled={pageNumber === numPages} onClick={lastPage}/>
                    </Pagination>
                </div>
            }
        </div>
    );
};

export default BookReadFile;
