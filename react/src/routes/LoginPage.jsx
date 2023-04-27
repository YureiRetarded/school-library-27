import React, {useState} from 'react';
import Login from "../components/Login.jsx";
import IsNotLogin from "../components/IsNotLogin.jsx";

const LoginPage = () => {
    return (
        <IsNotLogin>
            <div className='wrapper'>
                <Login/>
            </div>
        </IsNotLogin>
    );
};

export default LoginPage;
