import axios from "axios";

export default class {
    //Рейтинг книги
    static async getBookRating(bookId) {
        const response = await axios.get(`http://127.0.0.1:8000/api/book-rating/${bookId}`);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};

        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Получение оценок вместе со своей
    static async getMyBookRating(user, bookId) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/user-book-rating/${bookId}`, config);
        if (response.data.success) {
            //Возвращаем данные
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }

    //Запись оценки
    static async setMyRating(user, bookId, grade) {
        console.log('Вызов')
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/user-book-rating/${bookId}`, {grade: grade}, config);
        if (response.data.success) {
            //Возвращаем истину
            console.log(response)
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
        const response = await axios.post(`http://127.0.0.1:8000/api/user-book-rating/${bookId}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true};
        } else {
            //Возвращаем ошибку
            return {status: false};
        }
    }
}
