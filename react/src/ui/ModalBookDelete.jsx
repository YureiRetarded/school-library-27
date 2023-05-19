import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalBookDelete = ({show, handleClose, handeDelete}) => {
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
                Вы точно уверены, что хотите удалить этого книгу?
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

export default ModalBookDelete;
