import React from 'react';
import Registering from "../components/Registering.jsx";
import IsNotLogin from "../components/IsNotLogin.jsx";


const RegisteringPage = () => {

    return (
        <IsNotLogin>
            <div className='wrapper'>
                <Registering/>
            </div>
        </IsNotLogin>
    );
};

export default RegisteringPage;
