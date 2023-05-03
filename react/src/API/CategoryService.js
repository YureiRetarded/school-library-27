import axios from "axios";

export default class CategoryService {
    //Получение всех категорий
    static async getCategories(user) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get('http://127.0.0.1:8000/api/category', config);
        if (response.data.success) {
            //Возвращаем категории
            return {status: true, data: response.data.data, error: []};
        } else {
            //Возвращаем текст ошибки
            return {status: false, error: response.statusText};
        }
    }

    //Сохранение новой категории
    static async storeCategory(user, data) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post('http://127.0.0.1:8000/api/category/', data, config);
        if (response.data.success) {
            //Возвращаем подтверждения добавления
            return {status: true, error: ''};
        } else {
            //Возвращаем текст ошибки
            return {status: false, error: response.data.data.name.toString()};
        }
    }

    //Получаем конкретную категорию
    static async getCategory(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/category/${id}`, config);
        if (response.data.success) {
            //Возвращаем категорию
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Обновляем категорию
    static async updateCategory(user, id, data) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/category/${id}/update`, {
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

    //Удаляем категорию
    static async deleteCategory(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/category/${id}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.toString()};
        }
    }
}
