import React from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Protected = ({requirement_access, user_access_level, children}) => {
    if (user_access_level >= requirement_access) {
        return children
    }
    return <Navigate to='/' replace/>
};

export default Protected;
