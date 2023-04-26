import React from 'react';
import {Placeholder} from "react-bootstrap";
import {faTrashCan, faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CountyItemPlaceholder = () => {
    return (
        <div className='card my-1'>
            <div className='card-body'>
                <div className='card-title d-flex justify-content-between align-items-center'>
                    <Placeholder xs={7}/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Placeholder.Button variant='danger' className='mx-1'>
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </Placeholder.Button>
                        <Placeholder.Button variant='primary'>
                            <FontAwesomeIcon icon={faPen}/>
                        </Placeholder.Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountyItemPlaceholder;
