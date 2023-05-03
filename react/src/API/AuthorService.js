import axios from "axios";

export default class {
    //Сохраняем нового автора
    static async storeAuthor(user, data) {
        //Вставка токена в заголовок, для авторизации
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };
            const response = await axios.post('http://127.0.0.1:8000/api/author/', data, config);
            if (response.data.success) {
                //Возвращаем истину
                return {status: true, data: response.data.data};
            } else {
                //Возвращаем ошибку
                //В случае ошибки, возвращается 'ложь' и массив ошибок
                return {status: false, errors: response.data.data};
            }
        } catch (error) {
            //Возвращаем ошибку
            return {status: false, errors: []};
        }


    }

    //Обновление автора
    static async updateAuthor(user, data, id) {
        //Вставка токена в заголовок, для авторизации
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/author/${id}/update`, {_method: 'PATCH', ...data}, config);
            if (response.data.success) {
                //Возвращаем истину
                return {status: true, data: response.data.data};
            } else {
                //Возвращаем ошибку
                //В случае ошибки, возвращается 'ложь' и массив ошибок
                return {status: false, errors: response.data.data};
            }
        } catch (error) {
            //Возвращаем ошибку
            return {status: false, errors: []};
        }


    }

    //Получение авторов
    static async getAuthors(user) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/author/`, config);
        if (response.data.success) {
            //Возвращаем авторов
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Получение автора
    static async getAuthor(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/author/${id}`, config);
        if (response.data.success) {
            //Возвращаем автора
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Удаление автора
    static async deleteAuthor(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/author/${id}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.data.data.toString()};
        }
    }
}
