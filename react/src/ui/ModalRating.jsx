import React from 'react';
import {Modal} from "react-bootstrap";
import Stars from "../components/Stars.jsx";

const ModalRating = ({show, handleClose, callback}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='sm'
        >
            <Modal.Body>
                <div className='modal-rating-text'>Оценить книгу</div>
                <Stars callback={callback}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalRating;
