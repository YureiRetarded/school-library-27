import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthorsBookListItem from "./AuthorsBookListItem.jsx";

const AuthorsBookList = ({authors}) => {
    return (
        <div>
            {authors[0] &&
                <span>
                    <AuthorsBookListItem author={authors[0]}/>
                    {(authors[1] ? ', ' : ' ')}
                </span>}
            {authors[1] &&
                <span>
                    <AuthorsBookListItem author={authors[1]}/>
                    {(authors[2] ? ', ' : ' ')}
                </span>}
            {authors[2] &&
                <span>
                    <AuthorsBookListItem author={authors[2]}/>
                    {authors[3]&&'...'}
                </span>}
        </div>
    );
};

export default AuthorsBookList;
