import React from 'react';
import {Card, Col, Placeholder, Row} from "react-bootstrap";

const CatalogBookItemPlaceholder = () => {
    return (
        <div>
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
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CatalogBookItemPlaceholder;
