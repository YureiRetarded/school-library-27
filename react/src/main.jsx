import React from 'react'
import './styles/style.css';
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {router} from "./routes/index.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
