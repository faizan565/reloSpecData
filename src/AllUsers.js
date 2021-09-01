import './App.css';
import styled from 'styled-components'
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { useHistory } from "react-router-dom";


const MainDiv = styled.div`
  margin: 0 auto;
  max-width: fit-content;
  h2 {
    color: #666;
  }
`;
const ButtonContainer = styled.div`
  margin: 50px auto 20px auto;
  position: relative;
  width: fit-content;
`;

const Btn = styled.button`
  padding: 6px;
  background-color: white;
  color: #666;
  margin-right: ${props => props.margin && '30px'};
  border: 2px solid #6c7ae0;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #6c7ae0;
    color: white;
    border: 2px solid white;
    cursor: pointer;
  }
`;

const TableBody = styled.table`
  
  font-size: small;
  border: 3px solid #d9d9fa;
  border-radius: 5px;
  padding: 5px;
  max-width: 90%;
  margin-left: 5%;
  tr{
    &:hover{
      background-color: #d9d9fa;
    }
  }
  th {
    border-radius: 5px;
    padding: 5px;
    background: #6c7ae0;
    border: none;
    color: #FFF !important;
    font-family: sans-serif;
  }
  td {
    text-align: center;
    vertical-align: top;
    color: #666;
    padding: 5px;
    font-family: Arial, Helvetica, sans-serif;
    
  }
`;

function AllUsers() {
    const [items, setItems ] = useState([]);
    const [limit, setLimit ] = useState(10);
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
                    <th>Edit</th>
                </tr>
                {items !== [] ? items.slice(0, limit).map(item => (
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
                        <td><a style={{cursor:"pointer"}}
                               onClick={()=> goToUpdate(JSON.parse(item).UserAutonumber)}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </a></td>
                    </tr>
                ))
                :
                    <div>Loading</div>
                }
            </TableBody>
            <ButtonContainer>
                <Btn margin onClick={showMore}>More rows</Btn>
                <Btn onClick={showLess}>Less rows</Btn>
            </ButtonContainer>
        </MainDiv>
    );
}

export default AllUsers;
