import React from 'react';
import {Link} from "react-router-dom";

const BookTool = () => {
    return (
        <div className='mb-1'>
            <Link to={'create'} className='btn btn-primary'>Добавить книгу</Link>
        </div>
    );
};

export default BookTool;
