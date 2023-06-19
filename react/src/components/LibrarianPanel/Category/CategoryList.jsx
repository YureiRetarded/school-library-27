import React from 'react';
import ErrorBigMessage from "../../../ui/ErrorBigMessage.jsx";
import CategoryItem from "./CategoryItem.jsx";

const CategoryList = ({categories, destroyCategory}) => {
    return (
        <div>
            {categories.length === 0 ? <ErrorBigMessage message={'Категории отсутствуют'}/> :
                categories.map(category =>
                    <CategoryItem category={category} key={category.id} destroyCategory={destroyCategory}/>
                )}
        </div>
    );
};

export default CategoryList;
