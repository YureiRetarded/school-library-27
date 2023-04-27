import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

//Проверка на залогине ли пользователь или нет
const IsNotLogin = ({children}) => {
    //Взятие состояния пользователя
    const user = useSelector(state => state.user);
    //Если уровень доступ подходит, пользователя пропускают
    if (user.access_level === 0) {
        return children;
    }
    //Иначе возвращают на главную страницу
    return <Navigate to='/' replace/>;
};

export default IsNotLogin;
