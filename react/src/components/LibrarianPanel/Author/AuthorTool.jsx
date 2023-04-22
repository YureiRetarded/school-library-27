import React from 'react';
import {Link} from "react-router-dom";

const AuthorTool = () => {
    return (
        <div className='btn-group mb-1'>
            <Link to={'create'} className='btn btn-primary'>Добавить автора</Link>
            <Link to={'1'} className='btn btn-primary'>Read</Link>
            <Link to={'1/edit'} className='btn btn-primary'>edit </Link>
        </div>
    );
};

export default AuthorTool;
