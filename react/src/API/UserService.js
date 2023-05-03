import axios from "axios";
import {setAccessLevel, setId, setToken} from "../store/userSlice.js";


export default class UserService {

    //Авторизация пользователя
    static async userAuthorization(dispatch, userData) {
        //Отправка данных из формы
        const response = await axios.post('http://127.0.0.1:8000/api/login', userData);
        if (response.data.success) {
            //В случае успеха, в состояние пользователя записывается уровень доступа, идентификатор и токен доступа,
            //а также возвращается 'истина'
            dispatch(setId(response.data.data.id));
            dispatch(setAccessLevel(response.data.data.access_level));
            dispatch(setToken(response.data.data.token));
            return {status: true, errors: []};
        } else {
            //В случае ошибки, возвращается 'ложь' и массив ошибок
            return {status: false, errors: response.data.data};

        }
    }

    //Регистрация пользователя
    static async userRegistration(dispatch, userData) {
        const response = await axios.post('http://127.0.0.1:8000/api/registration', userData);
        if (response.data.success) {
            //В случае успеха, в состояние пользователя записывается уровень доступа, идентификатор и токен доступа,
            //а также возвращается 'истина'
            dispatch(setId(response.data.data.id));
            dispatch(setAccessLevel(response.data.data.access_level));
            dispatch(setToken(response.data.data.token));
            return {status: true, errors: []};
        } else {
            //В случае ошибки, возвращается 'ложь' и массив ошибок
            return {status: false, errors: response.data.data};
        }
    }

    //Проверка пользователя
    //Учитывая то, что токен и уровень доступа пользователя хранятся на клиенте, вследствие чего могут быть подделаны,
    //необходимо постоянно проверять, что у пользователя с таким токеном есть такой-то уровень доступа.
    static async userCheck(user, dispatch) {
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };
            //В случае, если токен правильный, идёт обновление состояния пользователя
            const response = await axios.post('http://127.0.0.1:8000/api/user', {token: user.token}, config);
            dispatch(setId(response.data.data.id));
            dispatch(setAccessLevel(response.data.data.access_level));
            return true;
        } catch (error) {
            //В случае ошибки, данные пользователя обнуляются
            dispatch(setId(0));
            dispatch(setAccessLevel(0));
            dispatch(setToken(''));
            return false;
        }
    }

    //Разлогинивания пользователя
    //Для того чтобы база не переполнялась токенами которые больше не будут использоваться, мы его удаляем
    static async userLogout(user, dispatch) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post('http://127.0.0.1:8000/api/logout', {tokenID: user.token.split('|')[0]}, config);
        //В случае успеха, данные пользователя обнуляются
        if (response.status) {
            dispatch(setId(0));
            dispatch(setAccessLevel(0));
            dispatch(setToken(0));
        }
    }
}
