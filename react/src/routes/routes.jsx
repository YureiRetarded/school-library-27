import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import HomePage from "./HomePage.jsx";
import CatalogPage from "./CatalogPage.jsx";
import LogOut from "./LogOut.jsx";
import ProfilePage from "./ProfilePage.jsx";
import LibrarianPanel from "./Librarian/LibrarianPanel.jsx";
import LibrarianHome from "./Librarian/LibrarianHome.jsx";
import BooksPage from "./BooksPage.jsx";
import LibrarianAuthorsPage from "./Librarian/Author/LibrarianAuthorsPage.jsx";
import ReportsPage from "./ReportsPage.jsx";
import UsersPage from "./UsersPage.jsx";
import LibrarianCountryPage from "./Librarian/Country/LibrarianCountryPage.jsx";
import CountryIndex from "./Librarian/Country/CountryIndex.jsx";
import CountryCreate from "./Librarian/Country/CountryCreate.jsx";
import CountryEdit from "./Librarian/Country/CountryEdit.jsx";
import AuthorIndex from "./Librarian/Author/AuthorIndex.jsx";
import AuthorEdit from "./Librarian/Author/AuthorEdit.jsx";
import AuthorCreate from "./Librarian/Author/AuthorCreate.jsx";
import AuthorRead from "./Librarian/Author/AuthorRead.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisteringPage from "./RegisteringPage.jsx";
import LibrarianCategoriesPage from "./Librarian/Category/LibrarianCategoriesPage.jsx";
import CategoryIndex from "./Librarian/Category/CategoryIndex.jsx";
import CategoryCreate from "./Librarian/Category/CategoryCreate.jsx";
import CategoryEdit from "./Librarian/Category/CategoryEdit.jsx";


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
                element: <LoginPage/>,
            },
            {
                path: 'register',
                element: <RegisteringPage/>,
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
                        element: <BooksPage/>

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
                        path: 'categories',
                        element: <LibrarianCategoriesPage/>,
                        children: [
                            {
                                path: '',
                                element: <CategoryIndex/>
                            },
                            {
                                path: 'create',
                                element: <CategoryCreate/>
                            },
                            {
                                path: ':categoryId/edit',
                                element: <CategoryEdit/>
                            }
                        ]
                    },
                    {
                        path: 'authors',
                        element: <LibrarianAuthorsPage/>,
                        children: [
                            {
                                path: '',
                                element: <AuthorIndex/>
                            },
                            {
                                path: ':authorId',
                                element: <AuthorRead/>
                            },
                            {
                                path: 'create',
                                element: <AuthorCreate/>
                            },
                            {
                                path: ':authorId/edit',
                                element: <AuthorEdit/>
                            },
                        ]
                    },
                    {
                        path: 'reports',
                        element: <ReportsPage/>
                    },
                    {
                        path: 'users',
                        element: <UsersPage/>
                    }
                ]
            }

        ]
    }]
);
