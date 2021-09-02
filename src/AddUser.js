import './App.css';
import styled from 'styled-components'
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

function UpdateUser() {
    let history = useHistory();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [userName, setUserName] = useState('testName');
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
    const [autoNumber, setAutoNumber] = useState(params.id);
    const [isDisabled, setDisabled] = useState(false);

    const findAndSet = (response) =>{
        if(response.user !== []) {
            setRequiredUser(JSON.parse(response.user));
        }
    };

    const goToUsers = () =>{
        let path = `/`;
        history.push(path);
    }

    useEffect(()=>{
        const encodedValue = encodeURIComponent(autoNumber);
        fetch(`http://localhost:8015/getSingle.php?id=${encodedValue}`)
            .then(res => res.json())
            .then(result => {
                findAndSet(
                    {user: result}
                );
            });
    },[autoNumber])
    useEffect(()=>{
        setAutoNumber(params.id);
        console.log(requiredUser);
        if(requiredUser){
            setUserName(requiredUser.UserName);
            setPassword(requiredUser.Password);
            setLicense(requiredUser.LicenseLevel);
            setFirm(requiredUser.Firm);
            setNetwork(requiredUser.Network);
            setBranchName(requiredUser.BranchName);
            setCompanyDb(requiredUser.CompanyDB);
            setEmail(requiredUser.EmailAddress);
            setStatus(requiredUser.Status);
            setBillingMonth(requiredUser.BillingMonth);
        }
    },[requiredUser])

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
                UserAutonumber: autoNumber,
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
        fetch('http://localhost:8015/updateCustomer.php',requestOptions)
            .then(function (response) {
                console.log(response);
                return response;

            }).catch(function (err) {
            console.log(err)
        });

        goToUsers();
    }
    return(
        <div>
            Bettinaw
            <br/>
            this is update page<br/>
            name: <input value={userName} onChange={(e)=> setUserName(e.target.value)}/> <br/>
            password: <input value={password} onChange={(e)=> setPassword(e.target.value)}/> <br/>
            CompanyDb: <input value={companyDb} onChange={(e)=> setCompanyDb(e.target.value)}/> <br/>
            EmailAddress: <input value={email} onChange={(e)=> setEmail(e.target.value)}/> <br/>
            license: <input value={license} onChange={(e)=> setLicense(e.target.value)}/> <br/>
            firm: <input value={firm} onChange={(e)=> setFirm(e.target.value)}/> <br/>
            network: <input value={network} onChange={(e)=> setNetwork(e.target.value)}/> <br/>
            branchName: <input value={branchName} onChange={(e)=> setBranchName(e.target.value)}/> <br/>
            status: <input value={status} onChange={(e)=> setStatus(e.target.value)}/> <br/>
            billingMonth: <input value={billingMonth} onChange={(e)=> setBillingMonth(e.target.value)}/> <br/>
            <button onClick={callUpdate} disabled={isDisabled}>Submit</button>
            <button onClick={goToUsers} >Go Back</button>
        </div>
    );
}

export default UpdateUser;
