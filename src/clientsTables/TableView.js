import {MainDiv} from "../components";
import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'

function TableView() {

    const [dbItems, setDbItems ] = useState([]);
    const [tableItems, setTableItems ] = useState([]);
    const [clientData, setClientData ] = useState([]);
    const [tableData, setTableData ] = useState([]);
    const [selectedValue, setSelectedValue ] = useState('');
    const [selectedTableValue, setSelectedTableValue ] = useState('');
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    const setData = ((response) =>{
        setDbItems(response.dbItems);
    } );

    const setTableDropData = ((response) =>{
        setTableItems(response.dbItems);
    } );

    const selectDbChange = (e) =>{
        setSelectedValue(e.value.split('.')[0]);
    }

    const selectTableChange = (e) =>{
        console.log(e.value);
        setSelectedTableValue(e.value.split('.')[0]);
    }


    useEffect(()=>{
        fetch('http://localhost:8015/getReloClients.php')
            .then(res => res.json())
            .then(result => {
                setData({
                    dbItems: result,
                });
            });
    },[]);

    useEffect(()=>{
        const encodedCValue = encodeURIComponent(selectedValue);
        if(selectedValue != ''){
        fetch(`http://localhost:8015/getDbTables.php?dbName=${encodedCValue}`)
            .then(res => res.json())
            .then(result => {
                setTableDropData({
                    dbItems: result,
                });
            })
        }
    },[selectedValue]);

    useEffect(() =>{
        dbItems !==[] && dbItems.map(item =>{
                setClientData(clientData => [...clientData,JSON.parse(item)]);
            },
        )},[dbItems]);

    useEffect(() =>{
        tableItems !==[] && tableItems.map(item =>{
                setTableData(tableData => [...tableData,JSON.parse(item)]);
            },
        )},[tableItems]);


        return (
          <MainDiv>
              <center>
                  <h3>ReloSpec Databases</h3><br/>
                  <Select
                      onChange={selectDbChange}
                      options={clientData || options}
                  />

                  <Select
                      onChange={selectTableChange}
                      options={tableData || options}
                  />
              </center>
          </MainDiv>
    );
}

export default TableView;
