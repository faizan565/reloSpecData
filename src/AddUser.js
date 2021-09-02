import './App.css';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Btn, ButtonContainer, LinkOption, MainDiv, TableBody} from "./components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding, faCalendar,
    faCodeBranch,
    faDatabase,
    faEnvelope,
    faIdBadge,
    faKey, faStar,
    faUser, faLink,
} from "@fortawesome/fontawesome-free-solid";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

function AddUser() {
    let history = useHistory();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [license, setLicense] = useState('');
    const [firm, setFirm] = useState('');
    const [network, setNetwork] = useState('');
    const [branchName, setBranchName] = useState('');
    const [status, setStatus] = useState('');
    const [companyDb, setCompanyDb] = useState('');
    const [email, setEmail] = useState('');
    const [billingMonth, setBillingMonth] = useState('');
    const [requiredUser, setRequiredUser] = useState();
    const [isDisabled, setDisabled] = useState(false);

    // const findAndSet = (response) =>{
    //     if(response.user !== []) {
    //         setRequiredUser(JSON.parse(response.user));
    //     }
    // };

    const goToUsers = () =>{
        let path = `/`;
        history.push(path);
    }

    // useEffect(()=>{
    //     const encodedValue = encodeURIComponent(autoNumber);
    //     fetch(`http://localhost:8015/getSingle.php?id=${encodedValue}`)
    //         .then(res => res.json())
    //         .then(result => {
    //             findAndSet(
    //                 {user: result}
    //             );
    //         });
    // },[autoNumber])
    // useEffect(()=>{
    //     // setAutoNumber(params.id);
    //     console.log(requiredUser);
    //     if(requiredUser){
    //         setUserName(requiredUser.UserName);
    //         setPassword(requiredUser.Password);
    //         setLicense(requiredUser.LicenseLevel);
    //         setFirm(requiredUser.Firm);
    //         setNetwork(requiredUser.Network);
    //         setBranchName(requiredUser.BranchName);
    //         setCompanyDb(requiredUser.CompanyDB);
    //         setEmail(requiredUser.EmailAddress);
    //         setStatus(requiredUser.Status);
    //         setBillingMonth(requiredUser.BillingMonth);
    //     }
    // },[requiredUser])

    const callUpdate =()=>{
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
                UserName: userName,
                Password: password,
                License: license,
                Firm: firm,
                Network: network,
                BranchName: branchName,
                Status: status,
                EmailAddress: email,
                CompanyDB: companyDb,
                BillingMonth: billingMonth
            })         //---------------add other values to be updated.
        };
        fetch('http://localhost:8015/AddCustomer.php',requestOptions)
            .then(function (response) {
                console.log(response);
                return response;

            }).catch(function (err) {
            console.log(err)
        });

        goToUsers();
    }
    return(
        <MainDiv>
            <center>
                <h3>ReloSpec IDs and Passwords (NAMES database)</h3><br/>
            </center>
            <TableBody update>
                <fieldset>
                    <legend> Add User Record</legend>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser}/></td>
                        <td>Name:</td>
                        <td><input value={userName} onChange={(e)=> setUserName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faKey}/></td>
                        <td>Password:</td>
                        <td><input value={password} onChange={(e)=> setPassword(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faDatabase}/></td>
                        <td>CompanyDB:</td>
                        <td><input value={companyDb} onChange={(e)=> setCompanyDb(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEnvelope}/></td>
                        <td>EmailAddress:</td>
                        <td><input value={email} onChange={(e)=> setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faIdBadge}/></td>
                        <td> LicenseLevel:</td>
                        <td><input value={license} onChange={(e)=> setLicense(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faBuilding}/></td>
                        <td>Firm:</td>
                        <td><input value={firm} onChange={(e)=> setFirm(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faLink}/></td>
                        <td>Network:</td>
                        <td><input value={network} onChange={(e)=> setNetwork(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faCodeBranch}/></td>
                        <td>BranchName:</td>
                        <td><input value={branchName} onChange={(e)=> setBranchName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faStar}/></td>
                        <td>Status:</td>
                        <td><input value={status} onChange={(e)=> setStatus(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faCalendar}/></td>
                        <td>BillingMonth:</td>
                        <td><input value={billingMonth} onChange={(e)=> setBillingMonth(e.target.value)}/></td>
                    </tr>
                </fieldset>
            </TableBody>
            <ButtonContainer update><Btn margin onClick={callUpdate} disabled={isDisabled}>Submit</Btn>
                <Btn onClick={goToUsers} >Go Back</Btn>
            </ButtonContainer>
        </MainDiv>
    );
}

export default AddUser;
