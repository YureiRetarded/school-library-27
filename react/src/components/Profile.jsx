import React from 'react';
import {useSelector} from "react-redux";


const Profile = () => {
    //Привязка состояние пользователя redux
    const user = useSelector(state => state.user);
    return (
        <div>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Вы авторизованны!</h4>
                <p>Поздравляем Ваш уровень доступа: {user.access_level}</p>
            </div>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Страница будет доработана в следующих версиях</h4>
            </div>
        </div>


    );
};

export default Profile;
