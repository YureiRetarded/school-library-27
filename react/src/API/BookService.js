import axios from "axios";

export default class {
    //Сохраняем новую книгу
    static async storeBook(user, data) {
        //Вставка токена в заголовок, для авторизации
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };
            const response = await axios.post('http://127.0.0.1:8000/api/book/', data, config);
            if (response.data.success) {
                //Возвращаем истину
                return {status: true, data: response.data.data};
            } else {
                //Возвращаем ошибку
                //В случае ошибки, возвращается 'ложь' и массив ошибок
                console.log(response.data)
                return {status: false, errors: response.data.data};
            }
        } catch (error) {
            //Возвращаем ошибку
            console.log(error)
            return {status: false, errors: []};
        }


    }

    //Обновление книги
    static async updateBook(user, data, id) {
        //Вставка токена в заголовок, для авторизации
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            };
            const response = await axios.post(`http://127.0.0.1:8000/api/book/${id}/update`, {_method: 'PATCH', ...data}, config);
            console.log(data)
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
            console.log(error)
            return {status: false, errors: []};
        }


    }

    //Получение всех книг
    static async getBooks(user) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/book_all`, config);
        if (response.data.success) {
            //Возвращаем книги
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Получение книг по страницам
    static async getBooksByPage(user, page) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/book?page=${page}`, config);
        if (response.data.success) {
            //Возвращаем книги
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Получение книги
    static async getBook(id) {
        console.log(`http://127.0.0.1:8000/api/book/${id}`)
        const response = await axios.get(`http://127.0.0.1:8000/api/book/${id}`);
        if (response.data.success) {
            //Возвращаем книгу
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Получение файл книги
    static async getBookFile(id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/book/${id}/file`);
        if (response.data.success) {
            //Возвращаем книгу
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }

    //Удаление книги
    static async deleteBook(user, id) {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post(`http://127.0.0.1:8000/api/book/${id}`, {_method: 'DELETE'}, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            return {status: false, error: []};
        }
    }

    static async getBooksWithOutParameters(page) {
        const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${page}`);
        if (response.data.success) {
            //Возвращаем книги
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: []};
        }
    }

    static async getBooksWithParameters(page, parameters) {
        const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${page}${parameters}`);
        if (response.data.success) {
            //Возвращаем книги
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: []};
        }
    }
}
