import axios from "axios";

export default class CountryService {
    //Получение всех стран
    static async getCountries() {
        const response = await axios.get(import.meta.env.VITE_API_URL+'/country_all');
        if (response.data.success) {
            //Возвращаем страны
            return {status: true, data: response.data.data, error: []};
        } else {
            //Возвращаем текст ошибки
            return {status: false, error: response.statusText};
        }
    }

    //Получение всех стран по страницам
    static async getCountriesByPage(user, page) {
        // Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(import.meta.env.VITE_API_URL+`/country?page=${page}`, config);
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
        const response = await axios.post(import.meta.env.VITE_API_URL+'/country/', data, config);
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
        const response = await axios.get(import.meta.env.VITE_API_URL+`/country/${id}`, config);
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
        const response = await axios.post(import.meta.env.VITE_API_URL+`/country/${id}/update`, {
            _method: 'PATCH',
            name: data.name
        }, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.name};
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
        const response = await axios.post(import.meta.env.VITE_API_URL+`/country/${id}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.toString()};
        }
    }
}
