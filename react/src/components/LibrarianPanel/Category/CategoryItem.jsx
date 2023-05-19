import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CategoryService from "../../../API/CategoryService.js";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import ModalCategoryDelete from "../../../ui/ModalCategoryDelete.jsx";

const CategoryItem = ({category, destroyCategory}) => {
    //Для аутентификации пользователя в запросе
    const user = useSelector(state => state.user)
    //Для возможности отправки на страницу редактирования
    const navigate = useNavigate();
    //Показать модальное окно
    const [show, setShow] = useState(false);
    //Калбек для закрытия модального окна
    const handleClose = () => setShow(false);
    //Функция для вызова модального окна
    const handleOpen = () => setShow(true);
    //Функция для удаления категории из бд
    const destroy = async () => {
        const response = await CategoryService.deleteCategory(user, category.id);
        if (response.status) {
            destroyCategory(category.id);
            handleClose();
        }
    }
    //Отправка на страницу редактирования
    const edit = () => {
        navigate(`/librarian/categories/${category.id}/edit`);
    }
    return (
        <div className='card my-1'>
            <ModalCategoryDelete
                show={show}
                handleClose={handleClose}
                handeDelete={destroy}
            />
            <div className='card-body'>
                <div className='card-title d-flex justify-content-between align-items-center'>
                    {category.name}
                    <div className='d-flex justify-content-between align-items-center'>
                        <Button onClick={edit} variant='primary'>
                            <FontAwesomeIcon icon={faPen}/>
                        </Button>
                        <Button onClick={handleOpen} variant='danger' className='mx-1'>
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;
