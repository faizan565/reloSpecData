import React from 'react';
import { Link } from 'react-router-dom';
import {Btn, ConfirmModal, MainDiv, Wrapper} from "./components";
import {useHistory} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/fontawesome-free-solid";


function Error404(){
    let history = useHistory();

    const goToUsers=()=>{
        let path = '/';
        history.push(path);
    }

    return (
        <>
            <Wrapper>
            </Wrapper>
            <ConfirmModal>
                <FontAwesomeIcon style={{marginLeft: '39%', color: '#666', fontSize: '40px'}} icon={faExclamationTriangle}/>
                <p>404 - Not A valid Link</p>
                <Btn modal onClick={goToUsers}>
                    Go To Users Page
                </Btn>
            </ConfirmModal>
        </>
    );
}

export default Error404;