import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useCheckUser} from "../hooks/useCheckUser.js";
import {setAccessLevel} from "../store/userSlice.js";

const Profile = () => {
    //Привязка состояние пользователя redux
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.token !== '') {
            useCheckUser(user, dispatch)
        } else dispatch(setAccessLevel(0))
    }, [])
    return (
        <div>
            {user.access_level > 0 ? (
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Вы авторизованны!</h4>
                    <p>Поздравляем Ваш уровень доступа: {user.access_level}</p>
                </div>
            ) : (
                <div>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Вы не авторизованны!</h4>
                        <p>Для получения доступа к этой странице пожалуйста пройдите авторизацию.</p>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Profile;
