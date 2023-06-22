import axios from "axios";

export default class {
    //Рейтинг книги
    static async getBookRating(bookId) {
        const response = await axios.get(import.meta.env.VITE_API_URL+`/book-rating/${bookId}`);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};

        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Получение оценок вместе со своей
    static async getUserBookRating(user, bookId) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(import.meta.env.VITE_API_URL+`/user-book-rating/${bookId}`, config);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Запись оценки
    static async setUserRating(user, bookId, grade) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(import.meta.env.VITE_API_URL+`/user-book-rating/${bookId}`, {grade: grade}, config);
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
        const response = await axios.post(import.meta.env.VITE_API_URL+`/user-book-rating/${bookId}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }
}
