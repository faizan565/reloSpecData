// import './App.css';
import "./style/styles.css";
import styled from 'styled-components'
import {useEffect, useMemo, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faTimes } from '@fortawesome/fontawesome-free-solid'
import { useHistory } from "react-router-dom";
import {
    Btn,
    ButtonContainer,
    ConfirmModal,
    LinkOption,
    Loading,
    MainDiv, SearchDiv,
    SearchInput, SubHeader,
    TableBody,
    Wrapper,
} from "./components";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SortIcon from "@material-ui/icons/ArrowDownward";

function AllUsers() {
    const [items, setItems ] = useState([]);
    const [hideLinks, setHideLinks ] = useState('1');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [userId, setUserId] = useState(0);
    let history = useHistory();
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
    const [userData, setUserData ] = useState([]);
    const [filteredItems, setFilteredItems ] = useState([]);

    const setData = ((response) =>{
        setItems(response.items);
    } );

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
        setFilteredItems(userData.filter(
                item => item.UserName && item.UserName.toLowerCase().includes(filterText.toLowerCase()),
            )
        )},[filterText])

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <>
                <LinkOption>
                    <label><input type="radio" name="link" value="1" onClick={()=> setHideLinks('1')} checked={hideLinks === '1'}/> Standard Display</label>
                    <br/>
                    <label><input type="radio" name="link" value="2" onClick={()=> setHideLinks('2')} /> Hide Links</label>
                </LinkOption>
                <SubHeader>
                    <SearchDiv>
                    <input type="text"onInput={e => setFilterText(e.target.value)} value={filterText} />
                    <FontAwesomeIcon onClick={handleClear} style={{cursor: 'pointer'}} icon={faTimes}/>
                </SearchDiv>
                    {hideLinks !== '2' &&
                    <div style={{float:'right'}} >
                        <Btn margin onClick={addUser}>Add Record</Btn>
                        <Btn onClick={filterUsers}>Filter Record</Btn>
                    </div>
                    }
                </SubHeader>

            </>
        );
    }, [filterText, resetPaginationToggle]);



    useEffect(() =>{
        items !==[] && items.map(item =>{
                setUserData(userData => [...userData,JSON.parse(item)]);
                setFilteredItems(userData => [...userData,JSON.parse(item)])
            },
        )},[items]);

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
            <div className="App">
                <Card>
                    <DataTable
                        dense
                        title=" ReloSpec User Data"
                        columns={columns}
                        data={filteredItems}
                        defaultSortFieldId={1}
                        sortIcon={<SortIcon/>}
                        pagination
                        subHeader={true}
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeaderAlign="left"
                        // theme="dark"
                        keyField="UserAutonumber"
                        striped
                        persistTableHead
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
        </MainDiv>
    );
}

export default AllUsers;
