import React from 'react';
import SideBar from "../../components/LibrarianPanel/SideBar.jsx";
import {Outlet} from "react-router-dom";
import Protected from "../../components/Protected.jsx";

const ErrorPageLibrarian = () => {
    return (
        <Protected requirement_access={5}>
            <div className='row flex-nowrap'>
                <SideBar/>
                <h4>Страница не найдена!</h4>
            </div>
        </Protected>
    );
};

export default ErrorPageLibrarian;
