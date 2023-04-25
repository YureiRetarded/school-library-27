import axios from "axios";

export default class {
    static async storeAuthor(user, data, image = '') {
        const config = {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        };
        const response = await axios.post('http://127.0.0.1:8000/api/author/', {
            ...data,
            image: image,
        }, config);
        if (response.data.success) {
            //Возвращаем истину
            return {status: true, data: []};
        } else {
            //Возвращаем ошибку
            //В случае ошибки, возвращается 'ложь' и массив ошибок
            return {status: false, errors: response.data.data};
        }

    }
}
