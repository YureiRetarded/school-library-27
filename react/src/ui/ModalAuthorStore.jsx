import React from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";

const ModalAuthorStore = ({show, handleClose, isLoading, isError,sendToIndex, sendToPage}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {isLoading ?
                        (<span>Идёт сохранение данных  <Spinner animation="border" variant="dark"/></span>) :
                        (isError ?
                            'Не удалось сохранить данные!' :
                            'Данные успешно сохранены!')
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ?
                    'Пожалуйста подождите, идёт загрузка данных автора на сервер!' :
                    (isError ?
                        'Произошла ошибка, пожалуйста обратитесь за помощью к Вашему администратору.' :
                        'Выберите следующие действие:')
                }
            </Modal.Body>
            {!isLoading &&
                (!isError ?
                        <Modal.Footer>
                            <Button variant="primary" onClick={sendToIndex}>
                                Список авторов
                            </Button>
                            <Button variant="primary" onClick={sendToPage}>
                                Страница автора
                            </Button>
                        </Modal.Footer> :
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                )
            }
        </Modal>
    );
};

export default ModalAuthorStore;
