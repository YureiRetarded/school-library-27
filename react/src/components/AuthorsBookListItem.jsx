import React from 'react';
import {useNavigate} from "react-router-dom";

const AuthorsBookListItem = ({author}) => {
    const navigate = useNavigate();
    const toAuthor = () => {
        navigate('/librarian/authors/' + author.id);
    }
    return (
        <span onClick={toAuthor}>
            {author.second_name && author.second_name + ' '}
            {author.first_name && author.first_name + ' '}
            {author.middle_name && author.middle_name}
        </span>
    );
};

export default AuthorsBookListItem;
