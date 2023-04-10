import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./Home.jsx";
import Catalog from "./Catalog.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import LogOut from "./LogOut.jsx";
import Profile from "./Profile.jsx";

export const router = createBrowserRouter(
    [{
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <Home/>,
            },
            {
                path: 'catalog',
                element: <Catalog/>,

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
                element: <Profile/>
            }

        ]
    }]
);
