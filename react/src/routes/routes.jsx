import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import HomePage from "./HomePage.jsx";
import CatalogPage from "./CatalogPage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import LogOut from "./LogOut.jsx";
import ProfilePage from "./ProfilePage.jsx";
import LibrarianPanel from "./Librarian/LibrarianPanel.jsx";
import LibrarianHome from "./Librarian/LibrarianHome.jsx";
import Books from "./Books.jsx";
import AuthorsPage from "./AuthorsPage.jsx";
import Reports from "./Reports.jsx";
import Users from "./Users.jsx";
import LibrarianCountryPage from "./Librarian/Country/LibrarianCountryPage.jsx";
import CountryIndex from "./Librarian/Country/CountryIndex.jsx";
import CountryCreate from "./Librarian/Country/CountryCreate.jsx";
import CountryEdit from "./Librarian/Country/CountryEdit.jsx";


export const router = createBrowserRouter(
    [{
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <HomePage/>,
            },
            {
                path: 'catalog',
                element: <CatalogPage/>,

            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>,
            },
            {
                path: 'logOut',
                element: <LogOut/>,
            },
            {
                path: 'profile',
                element: <ProfilePage/>
            },
            {
                path: 'librarian',
                element: <LibrarianPanel/>,
                children: [
                    {
                        path: '',
                        element: <LibrarianHome/>
                    },
                    {
                        path: 'books',
                        element: <Books/>

                    },
                    {
                        path: 'countries',
                        element: <LibrarianCountryPage/>,
                        children: [
                            {
                                path: '',
                                element: <CountryIndex/>
                            },
                            {
                                path: 'create',
                                element: <CountryCreate/>
                            },
                            {
                                path: ':countryId/edit',
                                element: <CountryEdit/>
                            }
                        ]
                    },
                    {
                        path: 'authors',
                        element: <AuthorsPage/>
                    },
                    {
                        path: 'reports',
                        element: <Reports/>
                    },
                    {
                        path: 'users',
                        element: <Users/>
                    }
                ]
            }

        ]
    }]
);
