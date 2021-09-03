import './App.css';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Btn, ButtonContainer, ConfirmModal, LinkOption, Loading, MainDiv, TableBody, Wrapper} from "./components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser, faKey, faEnvelope, faStar, faCodeBranch,
    faDatabase, faIdBadge, faBuilding, faCalendar, faLink, faPencilAlt, faTrash, faTimes
} from '@fortawesome/fontawesome-free-solid'

function FilterUsers() {
    let history = useHistory();
    const [userName, setUserName] = useState('');
    const [license, setLicense] = useState('');
    const [firm, setFirm] = useState('');
    const [network, setNetwork] = useState('');
    const [branchName, setBranchName] = useState('');
    const [status, setStatus] = useState('');
    const [companyDb, setCompanyDb] = useState('');
    const [email, setEmail] = useState('');
    const [billingMonth, setBillingMonth] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [isDisabled, setDisabled] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [limit, setLimit ] = useState(10);
    const [hideLinks, setHideLinks ] = useState('1');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userId, setUserId] = useState(false);

    let count = 1
    const showMore = () =>{
        setLimit(limit + 10);
    }

    const showLess = () =>{
        if(limit > 10){
            setLimit(limit - 10);
        }
    }

    const findAndSet = (response) =>{
        if( response.user && response.user !== []) {
            if(response.user.length < 10)
            {
                setLimit(response.user.length);
            }
            setFilteredUser(response.user);
        }
    };

    const goToUsers = () =>{
        let path = `/`;
        history.push(path);
    }

    const goToUpdate = (id) =>{
        let path = `update-user?id=${id}`;
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
                return response;

            }).catch(function (err) {
            console.log(err)
        });

        setTimeout(document.location.reload(),2500)
    }

    const applyFilter = () =>{
        setShowResults(!showResults);
        const encodedName = encodeURIComponent(userName);
        const encodedCompanyDb = encodeURIComponent(companyDb);
        const encodedLicense = encodeURIComponent(license);
        const encodedNetwork = encodeURIComponent(network);
        const encodedEmail = encodeURIComponent(email);
        const encodedStatus = encodeURIComponent(status);
        const encodedFirm = encodeURIComponent(firm);
        const encodedBillingMonth = encodeURIComponent(billingMonth);
        const encodedBranch = encodeURIComponent(branchName);
        fetch(`http://localhost:8015/filterCustomer.php?name=${encodedName}&&firm=${encodedFirm}&&license=${encodedLicense}&&network=${encodedNetwork}&&email=${encodedEmail}&&status=${encodedStatus}&&month=${encodedBillingMonth}&&db=${encodedCompanyDb}&&branch=${encodedBranch}`)
            .then(res => res.json())
            .then(result => {
                findAndSet(
                    {user: result}
                );
            });
    }

    useEffect(() => {
        applyFilter();
    },[])

    return(
        <MainDiv>
            <center>
                <h3>ReloSpec IDs and Passwords (NAMES database)</h3><br/>
            </center>
            {!showResults ?
                <>
                    <TableBody update>
                        <fieldset>
                            <legend> Filter User Record</legend>
                            <tr>
                                <td><FontAwesomeIcon icon={faUser}/></td>
                                <td>Name:</td>
                                <td><input value={userName} onChange={(e) => setUserName(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faDatabase}/></td>
                                <td>CompanyDB:</td>
                                <td><input value={companyDb} onChange={(e) => setCompanyDb(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faEnvelope}/></td>
                                <td>EmailAddress:</td>
                                <td><input value={email} onChange={(e) => setEmail(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faIdBadge}/></td>
                                <td> LicenseLevel:</td>
                                <td><input value={license} onChange={(e) => setLicense(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faBuilding}/></td>
                                <td>Firm:</td>
                                <td><input value={firm} onChange={(e) => setFirm(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faLink}/></td>
                                <td>Network:</td>
                                <td><input value={network} onChange={(e) => setNetwork(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faCodeBranch}/></td>
                                <td>BranchName:</td>
                                <td><input value={branchName} onChange={(e) => setBranchName(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faStar}/></td>
                                <td>Status:</td>
                                <td><input value={status} onChange={(e) => setStatus(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faCalendar}/></td>
                                <td>BillingMonth:</td>
                                <td><input value={billingMonth} onChange={(e) => setBillingMonth(e.target.value)}/></td>
                            </tr>
                        </fieldset>
                    </TableBody>
                    <ButtonContainer update><Btn margin onClick={applyFilter} disabled={isDisabled}>Apply Filter</Btn>
                        <Btn onClick={goToUsers} >Go Back</Btn>
                    </ButtonContainer>
                </>
                :
                <>
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
                        {filteredUser.length !== 0 ? filteredUser.slice(0, limit).map(item => (
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
                            <tr><td colSpan="12"><Loading>No Record Found</Loading></td></tr>
                        }
                    </TableBody>

                    <ButtonContainer>
                        {filteredUser.length > 10 &&
                        <>
                            <Btn margin onClick={showMore}>More rows</Btn>
                            <Btn margin onClick={showLess}>Less rows</Btn>
                        </>
                        }
                        <Btn onClick={goToUsers}>Reset Filter</Btn>

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
                </>
            }
        </MainDiv>
    );
}

export default FilterUsers;
