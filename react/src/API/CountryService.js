import axios from "axios";

export default class CountryService {
    //Получение всех стран
    static async getCountries(user) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get('http://127.0.0.1:8000/api/country', config);
        if (response.data.success) {
            //Возвращаем страны
            return {status: true, data: response.data.data, error: []};
        } else {
            //Возвращаем текст ошибки
            return {status: false, error: response.statusText};
        }
    }

    //Сохранение новой страны
    static async storeCountry(user, data) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post('http://127.0.0.1:8000/api/country/', data, config);
        if (response.data.success) {
            //Возвращаем подтверждения добавления
            return {status: true, error: ''};
        } else {
            //Возвращаем текст ошибки
            return {status: false, error: response.data.data.name.toString()};
        }
    }

    //Получаем конкретную страну
    static async getCountry(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/country/${id}`, config);
        if (response.data.success) {
            //Возвращаем страну
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Обновляем страну
    static async updateCountry(user, id, data) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/country/${id}/update`, {
            _method: 'PATCH',
            name: data
        }, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.toString()};
        }
    }

    //Удаляем страну
    static async deleteCountry(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/country/${id}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.toString()};
        }
    }
}
