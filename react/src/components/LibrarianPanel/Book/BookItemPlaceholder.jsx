import React from 'react';
import {ButtonGroup, Card, Col, Placeholder, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileLines, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const BookItemPlaceholder = () => {
    return (
        <Card className='mb-2'>
            <Row>
                <Col sm={2} className='author-page-icon d-flex justify-content-center'>
                    <div className='placeholder-icon-author'></div>
                </Col>
                <Col className='row justify-content-between pl-0'>
                    <div>
                        <Card.Title>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={3}/>
                                <Placeholder xs={3}/>
                                <Placeholder xs={3}/>
                            </Placeholder>
                        </Card.Title>
                        <Card.Footer className='bg-light m-0 p-0'>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={4}/>
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={4}/>
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={4}/>
                            </Placeholder>
                        </Card.Footer>
                    </div>
                    <div className='d-flex'>
                        <ButtonGroup className='w-100 align-self-end'>
                            <Placeholder.Button><FontAwesomeIcon icon={faFileLines}/></Placeholder.Button>
                            <Placeholder.Button><FontAwesomeIcon icon={faPen}/></Placeholder.Button>
                            <Placeholder.Button variant='danger'>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </Placeholder.Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default BookItemPlaceholder;
