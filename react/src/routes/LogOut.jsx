import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAccessLevel, setId, setToken} from "../store/userSlice.js";
import {Navigate} from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setId(0))
        dispatch(setAccessLevel(0))
        dispatch(setToken(0))
    }, [])
    return (
        <Navigate to='/login' replace={true}/>
    );
};

export default LogOut;
