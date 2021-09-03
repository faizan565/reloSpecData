import './App.css';
import styled from 'styled-components'
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faTimes } from '@fortawesome/fontawesome-free-solid'
import { useHistory } from "react-router-dom";
import {Btn, ButtonContainer, ConfirmModal, LinkOption, Loading, MainDiv, TableBody, Wrapper,} from "./components";

function AllUsers() {
    const [items, setItems ] = useState([]);
    const [limit, setLimit ] = useState(10);
    const [hideLinks, setHideLinks ] = useState('1');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userId, setUserId] = useState(false);
    let count = 1;
    let history = useHistory();

    const setData = ((response) =>{
        setItems(response.items);
    } );

    const showMore = () =>{
        setLimit(limit + 10);
    }

    const showLess = () =>{
        if(limit > 10){
            setLimit(limit - 10);
        }
    }

    const goToUpdate = (id) =>{
        let path = `update-user?id=${id}`;
        history.push(path);
    }

    const addUser = () =>{
        let path = `/add-user`;
        history.push(path);
    }

    const filterUsers = () =>{
        let path = `/filter-users`;
        history.push(path);
    }

    const setModal = (id) =>{
        setUserId(id);
        setConfirmDelete(!confirmDelete);
    }
    const deleteUser = () =>{
        setConfirmDelete(false);
        const requestOptions = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            body: JSON.stringify({
                UserAutonumber: userId,
            })
        };
        fetch('http://localhost:8015/deleteCustomer.php',requestOptions)
            .then(function (response) {
                console.log(response);
                return response;

            }).catch(function (err) {
            console.log(err)
        });

        setTimeout(document.location.reload(),2500)
    }

    useEffect(()=>{
        fetch('http://localhost:8015/getCustomers.php')
            .then(res => res.json())
            .then(result => {
                setData({
                    items: result,
                });
            });
    },[]);

    return (

        <MainDiv>
            <center><h2>ReloSpec IDs and Passwords (NAMES database)</h2></center>
            <LinkOption>
                <label><input type="radio" name="link" value="1" onClick={()=> setHideLinks('1')} checked={hideLinks === '1'}/> Standard Display</label>
                <label><input type="radio" name="link" value="2" onClick={()=> setHideLinks('2')} /> Hide Links</label>
            </LinkOption>
            <TableBody>
                <tr>
                    <th>#</th>
                    <th>UserName<br/>(LoginName)</th>
                    <th>Password</th>
                    <th>CompanyDB</th>
                    <th>LicenseLevel</th>
                    <th>Firm</th>
                    <th>Network</th>
                    <th>BranchName</th>
                    <th>LoginTime</th>
                    <th>Status</th>
                    <th>BillingMonth</th>
                    {hideLinks !== '2' && <th>Edit / Delete</th>}
                </tr>
                {items.length !== 0 ? items.slice(0, limit).map(item => (
                        <tr >
                            <td>{count++}</td>
                            <td>{JSON.parse(item).UserName}</td>
                            <td>{JSON.parse(item).Password}</td>
                            <td>{JSON.parse(item).CompanyDB}</td>
                            <td>{JSON.parse(item).LicenseLevel}</td>
                            <td>{JSON.parse(item).Firm}</td>
                            <td>{JSON.parse(item).Network}</td>
                            <td>{JSON.parse(item).BranchName}</td>
                            <td>{JSON.parse(item).LoginTime && JSON.parse(item).LoginTime.date.split('.')[0]}</td>
                            <td>{JSON.parse(item).Status}</td>
                            <td>{JSON.parse(item).BillingMonth}</td>
                            {hideLinks !== '2' &&
                            <td><a style={{cursor: "pointer"}}
                                   onClick={() => goToUpdate(JSON.parse(item).UserAutonumber)}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </a>
                                <br/>
                                <a style={{cursor: "pointer" }}
                                   onClick={() => setModal(JSON.parse(item).UserAutonumber)}>
                                    <FontAwesomeIcon style={{marginTop: '10px'}} icon={faTrash}/>
                                </a>
                            </td>
                            }
                        </tr>
                    ))
                    :
                    <tr><td colSpan="12"><Loading>Loading Data</Loading></td></tr>
                }
            </TableBody>
            <ButtonContainer>
                <Btn margin onClick={showMore}>More rows</Btn>
                <Btn margin onClick={showLess}>Less rows</Btn>
                {hideLinks !== '2' &&
                <>
                    <Btn margin onClick={addUser}>Add Record</Btn>
                    <Btn onClick={filterUsers}>Filter Record</Btn>
                </>}
            </ButtonContainer>
            {confirmDelete &&
            <>
                <Wrapper>
                </Wrapper>
                <ConfirmModal>
                    <FontAwesomeIcon onClick={setModal} style={{float: 'right', cursor: 'pointer', color: '#666'}} icon={faTimes}/>
                    <p>Are you sure, you want to delete this Record.</p>
                    <Btn modal onClick={() => deleteUser()}>Confirm</Btn>
                </ConfirmModal>
            </>}
        </MainDiv>
    );
}

export default AllUsers;
