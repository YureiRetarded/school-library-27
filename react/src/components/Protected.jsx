import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useCheckUser} from "../hooks/useCheckUser.js";
import {setAccessLevel} from "../store/userSlice.js";

const Protected = ({requirement_access, children}) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.token !== '') {
            useCheckUser(user, dispatch)
        } else dispatch(setAccessLevel(0))
    }, [])
    if (user.access_level >= requirement_access) {
        return children
    }
    return (<Navigate to='/' replace/>)
};

export default Protected;
