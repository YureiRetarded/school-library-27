import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faBook, faPenNib, faPrint, faUsers, faGlobe,faPassport} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu">
                    <li className='nav-item'>
                        <Link to={''} className='nav-link'>
                            <FontAwesomeIcon size='2xl' icon={faHouse} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Главная</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'books'} className='nav-link'>
                            <FontAwesomeIcon size='2xl' icon={faBook} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Книги</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'authors'} className='nav-link'>
                            <FontAwesomeIcon size='2xl' icon={faPenNib} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Авторы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'countries'} className='nav-link'>
                            <FontAwesomeIcon size='2xl' icon={faGlobe} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Страны</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'categories'} className='nav-link'>
                            <FontAwesomeIcon size='2xl' icon={faPassport} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Категории</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'reports'} className='nav-link '>
                            <FontAwesomeIcon size='2xl' icon={faPrint} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Отчёты</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'users'} className='nav-link '>
                            <FontAwesomeIcon size='2xl' icon={faUsers} className='icon-color'/>
                            <span className='ms-1 d-none d-sm-inline bg-sidebar-text'>Чтецы</span>
                        </Link>
                    </li>
                    {/*Нижня информация возможно ещё пригодиться, будет убрана позже*/}
                    {/*<li className="nav-item">*/}
                    {/*    <a href="#" className="nav-link align-middle px-0">*/}
                    {/*        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">*/}
                    {/*        <i className="fs-4 bi-speedometer2"></i> <span*/}
                    {/*        className="ms-1 d-none d-sm-inline">Dashboard</span> </a>*/}
                    {/*    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">*/}
                    {/*        <li className="w-100">*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Item</span> 1 </a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Item</span> 2 </a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#" className="nav-link px-0 align-middle">*/}
                    {/*        <i className="fs-4 bi-table"></i> <span*/}
                    {/*        className="ms-1 d-none d-sm-inline">Orders</span></a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">*/}
                    {/*        <i className="fs-4 bi-bootstrap"></i> <span*/}
                    {/*        className="ms-1 d-none d-sm-inline">Bootstrap</span></a>*/}
                    {/*    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">*/}
                    {/*        <li className="w-100">*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Item</span> 1</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Item</span> 2</a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">*/}
                    {/*        <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span>*/}
                    {/*    </a>*/}
                    {/*    <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">*/}
                    {/*        <li className="w-100">*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Product</span> 1</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Product</span> 2</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Product</span> 3</a>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <a href="#" className="nav-link px-0"> <span*/}
                    {/*                className="d-none d-sm-inline">Product</span> 4</a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#" className="nav-link px-0 align-middle">*/}
                    {/*        <i className="fs-4 bi-people"></i> <span*/}
                    {/*        className="ms-1 d-none d-sm-inline">Customers</span> </a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
