import axios from "axios";

export default class {
    //Получение всех статусов
    static async getStatuses() {
        const response = await axios.get(import.meta.env.VITE_API_URL + `/statuses/`);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Получение статусов вместе со своим
    static async getUserStatuses(user, bookId) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(import.meta.env.VITE_API_URL + `/user-statuses/${bookId}`, config);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Запись статуса
    static async setStatus(user, bookId, statusId) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(import.meta.env.VITE_API_URL + `/user-statuses/${bookId}`, {statusId: statusId}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Удаление оценки
    static async delete(user, bookId) {

        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(import.meta.env.VITE_API_URL + `/user-statuses/${bookId}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

}
