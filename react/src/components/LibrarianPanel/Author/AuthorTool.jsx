import React from 'react';
import {Link} from "react-router-dom";

const AuthorTool = () => {
    return (
        <div className='mb-1'>
            <Link to={'create'} className='btn btn-primary'>Добавить автора</Link>
        </div>
    );
};

export default AuthorTool;
