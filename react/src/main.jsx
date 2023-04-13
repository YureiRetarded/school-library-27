import React from 'react'
import './styles/style.css';
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {router} from "./routes/routes.jsx"
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then();
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
