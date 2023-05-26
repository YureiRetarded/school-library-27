import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const AuthorsBookListItem = ({author}) => {
    const location = useLocation();
    const navigate = useNavigate();
    //Переадресации на автора
    const toAuthor = () => {
        //Временное решение проблемы куда переадресовывать учитывая текущие местоположение
        switch (location.pathname.substring(0, 4)) {
            case ('/lib'): {
                switch (location.pathname.substring(0, 17)) {
                    case('/librarian/books'):
                        navigate('/librarian/authors/' + author.id);
                        break;
                    case ('/librarian/books/'):
                        navigate('/librarian/authors/' + author.id);
                        break;
                }
                break
            }
            default: {
                switch (location.pathname.substring(0, 5)) {
                    case ('/catal'):
                        navigate('/authors/' + author.id);
                        break;
                    case ('/book'):
                        navigate('/authors/' + author.id);
                        break;
                }
                break;
            }
        }
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
