import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../store/counterSlice.js";
import Counter from "../components/counter.jsx";


//const count = useSelector(state => state.counter.value)
// const dispatch = useDispatch();

const Login = () => {
    return (
        <div>
            <Counter/>
            <Counter/>
        </div>
    );
};

export default Login;
