import './App.css';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Btn, ButtonContainer, ConfirmModal, LinkOption, Loading, MainDiv, TableBody, Wrapper} from "./components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser, faEnvelope, faStar, faCodeBranch,
    faDatabase, faIdBadge, faBuilding, faCalendar, faLink, faPencilAlt, faTrash, faTimes
} from '@fortawesome/fontawesome-free-solid'
import Card from "@material-ui/core/Card";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
    const [hideLinks, setHideLinks ] = useState('1');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userData, setUserData ] = useState([]);


    const findAndSet = (response) =>{
        if( response.user && response.user !== []) {
            setFilteredUser(response.user);
        }
        setShowResults(!showResults);
    };

    const goToUsers = () =>{
        let path = `/`;
        history.push(path);
    }

    const goToFilter = () =>{
        window.location.reload();
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
        const encodedName = encodeURIComponent(userName);
        const encodedCompanyDb = encodeURIComponent(companyDb);
        const encodedLicense = encodeURIComponent(license);
        const encodedNetwork = encodeURIComponent(network);
        const encodedEmail = encodeURIComponent(email);
        const encodedStatus = encodeURIComponent(status);
        const encodedFirm = encodeURIComponent(firm);
        const encodedBillingMonth = encodeURIComponent(billingMonth);
        const encodedBranch = encodeURIComponent(branchName);
        fetch(`http://localhost:8015/filterCustomer.php?name=${encodedName || '***xz'}&&firm=${encodedFirm || '***xz'}&&license=${encodedLicense || '***xz'}&&network=${encodedNetwork || '***xz'}&&email=${encodedEmail || '***xz'}&&status=${encodedStatus || '***xz'}&&month=${encodedBillingMonth || '***xz'}&&db=${encodedCompanyDb || '***xz'}&&branch=${encodedBranch || '***xz'}`)
            .then(res => res.json())
            .then(result => {
                findAndSet(
                    {user: result}
                );
            });
    }

    const subHeaderComponent = <><LinkOption>
        <label><input type="radio" name="link" value="1" onClick={()=> setHideLinks('1')} checked={hideLinks === '1'}/> Standard Display</label>
        <br/>
        <label><input type="radio" name="link" value="2" onClick={()=> setHideLinks('2')} /> Hide Links</label>
    </LinkOption>
        {hideLinks !== '2' &&
        <ButtonContainer allUser>
            <Btn onClick={goToFilter}>Go To Filter</Btn>
        </ButtonContainer>}
    </>;

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1
        },
        {
            id: 1,
            name: "User Name",
            selector: (row) => row.UserName,
            sortable: true,
            reorder: true,
            minWidth: '10%',
            maxWidth: '20%',
            center: true,
        },
        {
            id: 2,
            name: "User Id",
            selector: (row) => row.UserAutonumber,
            sortable: true,
            reorder: true,
            center: true,
            minWidth: '10%',
            maxWidth: '20%'
        },
        {
            id: 3,
            name: "CompanyDB",
            selector: (row) => row.CompanyDB,
            // sortable: true,
            right: true,
            reorder: true,
            minWidth: '10%',
            maxWidth: '20%',
            center: true,
        },
        {
            id: 4,
            name: "License",
            selector: (row) => row.LicenseLevel,
            // sortable: true,
            reorder: true,
            minWidth: '10%',
            maxWidth: '20%',
            center: true,
        },
        {
            id: 5,
            name: "Firm",
            selector: (row) => row.Firm,
            // sortable: true,
            reorder: true,
            center: true,
            minWidth: '10%',
            maxWidth: '20%'
        },
        {
            id: 6,
            name: "Network",
            selector: (row) => row.Network,
            // sortable: true,
            reorder: true,
            center: true,
            minWidth: '10%',
            maxWidth: '20%'
        },
        {
            id: 7,
            name: "Biiling Month",
            selector: (row) => row.BillingMonth,
            // sortable: true,
            reorder: true,
            center: true,
            minWidth: '10%',
            maxWidth: '20%'
        },
        hideLinks === "1" && {
            name: "Edit",
            center: true,
            minWidth: '10%',
            maxWidth: '20%',
            cell: (row) => (
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={()=> goToUpdate(row.UserAutonumber)}
                >
                    <EditIcon />
                </IconButton>
            )
        },
        hideLinks === "1" && {
            name: "Delete",
            center: true,
            minWidth: '10%',
            maxWidth: '20%',
            cell: (row) => (
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={()=> setModal(row.UserAutonumber)}
                >
                    <DeleteIcon />
                </IconButton>
            )
        }
    ];


    useEffect(() =>{
        filteredUser !==[] && filteredUser.map(item =>{
                setUserData(userData => [...userData,JSON.parse(item)])
            },
        )},[filteredUser]);

    useEffect(() => {
        applyFilter();
    },[])

    return(
        <MainDiv>
            {!showResults ?
                <>
                    <center>
                        <h3>ReloSpec IDs and Passwords (NAMES database)</h3><br/>
                    </center>
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
                    <div className="App">
                        <Card>
                            <DataTable
                                dense
                                title=" ReloSpec User Data"
                                columns={columns}
                                data={userData}
                                defaultSortFieldId={1}
                                sortIcon={<SortIcon/>}
                                pagination
                                subHeader={true}
                                subHeaderComponent={subHeaderComponent}
                                subHeaderAlign="left"
                                keyField="UserAutonumber"
                                striped
                            />
                        </Card>
                    </div>
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
