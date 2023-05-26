import axios from "axios";

export default class {
    static async getParameters() {
        const response = await axios.get(`http://127.0.0.1:8000/api/catalog`);
        if (response.data.success) {
            //Возвращаем параметры
            return {status: true, data: response.data.data};
        } else {
            //Возвращаем ошибку
            return {status: false, error: response.statusText};
        }
    }
}
