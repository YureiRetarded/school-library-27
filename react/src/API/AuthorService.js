import axios from "axios";

export default class {
    //Сохраняем нового автора
    static async storeAuthor(user, data, image = '') {
        //Вставка токена в заголовок, для авторизации
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post('http://127.0.0.1:8000/api/author/', data, config);
        if (response.data.success) {
            console.log(response)
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            //В случае ошибки, возвращается 'ложь' и массив ошибок
            return {status: false, errors: response.data.data};
        }

    }
}
