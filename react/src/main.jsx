import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Catalog from "./routes/Catalog.jsx";
import Home from "./routes/Home.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import './styles/style.css';
const router = createBrowserRouter(
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
            }
        ]
    }]
);
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
