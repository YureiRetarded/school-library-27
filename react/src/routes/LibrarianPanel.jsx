import React from 'react';
import SideBar from "../components/LibrarianPanel/SideBar.jsx";
import {Outlet} from "react-router-dom";
import Protected from "../components/Protected.jsx";

const LibrarianPanel = () => {
    return (
        <Protected requirement_access={5}>
            <div className='row flex-nowrap'>
                <SideBar/>
                <div className='col py-3'>
                    <Outlet/>
                </div>
            </div>
        </Protected>
    );
};

export default LibrarianPanel;
