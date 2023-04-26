import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import UserService from "../API/UserService.js";

const LogOut = () => {
    //Взятие состояния пользователя
    const user = useSelector(state => state.user);
    //Dispatch для сервиса API
    const dispatch = useDispatch();
    useEffect(() => {
        const logout = async () => {
            await UserService.userLogout(user, dispatch);
        }
        logout();
    }, []);
    return (
        <Navigate to='/login' replace={true}/>
    );
};

export default LogOut;
