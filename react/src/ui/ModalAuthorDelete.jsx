import React from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";

const ModalAuthorDelete = ({show, handleClose, handeDelete}) => {
    //Функция для вызова сразу всех необходимых функций
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Подтверждение удаления!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы точно уверены, что хотите удалить этого автора?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={handeDelete}>
                    Да, уверен!
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAuthorDelete;
