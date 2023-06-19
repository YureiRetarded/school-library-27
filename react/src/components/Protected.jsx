import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import UserService from "../API/UserService.js";

//Проверка на требуемый уровень доступа у пользователя
const Protected = ({requirement_access, children}) => {
    //Взятие состояния пользователя
    const user = useSelector(state => state.user);
    //Dispatch для сервиса API
    const dispatch = useDispatch();
    //Обновление и проверка данных пользователя
    useEffect(() => {
        const checking = async () => {
            await UserService.userCheck(user, dispatch)
        }
        checking().catch(console.error);
    }, []);
    //Если уровень доступ подходит, пользователя пропускают
    if (user.access_level >= requirement_access) {
        return children;
    }
    //Иначе возвращают на главную страницу
    return <Navigate to='/' replace/>;
};

export default Protected;
