import React from 'react';
import {Link} from "react-router-dom";

const CategoryTool = () => {
    return (
        <div className='btn-group mb-1'>
            <Link to={'create'} className='btn btn-primary'>Добавить категорию</Link>
        </div>
    );
};

export default CategoryTool;
