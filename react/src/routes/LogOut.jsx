import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import UserService from "../API/UserService.js";

const LogOut = () => {
    //Взятие состояния пользователя
    const user = useSelector(state => state.user);
    //Dispatch для сервиса API
    const dispatch = useDispatch();
    //Для переадресации на нужную страницу
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            await UserService.userLogout(user, dispatch);
        }
        logout();
    }, []);
    //Если пользователя не разлогинело
    if (user.access_level >= 0) {
        return <Navigate to={-1}/>;
    }
    //Иначе возвращают на страницу входа
    return <Navigate to='/login'/>;;
};

export default LogOut;
