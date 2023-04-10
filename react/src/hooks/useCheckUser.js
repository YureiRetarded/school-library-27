import axios from "axios";
import {setAccessLevel, setId, setToken} from "../store/userSlice.js";

export function useCheckUser(user, dispatch) {
    const config = {
        headers: {
            Authorization: 'Bearer ' + user.token
        }
    }
    axios.post('http://127.0.0.1:8000/api/user', {token: user.token}, config).then(response => {
        dispatch(setId(response.data.data.id));
        dispatch(setAccessLevel(response.data.data.access_level));
    }).catch(error => {
            dispatch(setId(0));
            dispatch(setAccessLevel(0));
            dispatch(setToken(''));
        }
    )
}
