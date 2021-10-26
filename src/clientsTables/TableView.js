import {MainDiv} from "../components";
import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";

function TableView() {

    const [dbItems, setDbItems ] = useState([]);
    const [tableItems, setTableItems ] = useState([]);
    const [clientData, setClientData ] = useState([]);
    const [tableData, setTableData ] = useState([]);
    const [tableRows, setTableRows ] = useState([]);
    const [selectedValue, setSelectedValue ] = useState('');
    const [selectedTableValue, setSelectedTableValue ] = useState('');
    const [pending, setPending ] = useState(true);
    const [rows, setRows ] = useState([]);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];
    let columns;

    columns = [
        {
            name: '#',
            cell: (row, index) => index + 1,
            minWidth: '5%',
            maxWidth: '5%',
        },
        {
            id: 1,
            name: "Agent ID",
            selector: (row) => row.AgentID,
            sortable: true,
            reorder: true,
            minWidth: '5%',
            maxWidth: '10%',
            center: true,
        },
        {
            id: 2,
            name: "Agent Name",
            selector: (row) => row.FirstName,
            sortable: true,
            reorder: true,
            center: true,
            minWidth: '5%',
            maxWidth: '10%'
        }]

    const setData = ((response) =>{
        setDbItems(response.dbItems);
    } );

    const setTableDropData = ((response) =>{
        setTableItems(response.dbItems);
    } );

    const setRowData = ((response) =>{
        setRows(response.rowsData);
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
        setPending(true);
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


    useEffect(()=>{
        const encodedCValue = encodeURIComponent(selectedValue);
        const encodedTValue = encodeURIComponent(selectedTableValue);
        if(selectedValue != '' && selectedTableValue != ''){
        fetch(`http://localhost:8015/getSelectedTable.php?dbName=${encodedCValue}&&tableName=${encodedTValue}`)
            .then(res => res.json())
            .then(result => {
                setRowData({
                    rowsData: result,
                });
                setPending(false);
            })
        }
    },[selectedTableValue, selectedValue]);

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

    useEffect(() =>{
        rows !== [] && rows.map(item =>{
                setTableRows(tableRows => [...tableRows,JSON.parse(item)]);
            },
        )},[rows]);


        return (
          <MainDiv>
              <center>
                  <h3>ReloSpec Databases</h3><br/>

              </center>

              <Card>
                  <div className="flex-div">
                      <Select
                          onChange={selectDbChange}
                          options={clientData || options}
                          defaultValue={{ label: "Select Database", value: 0 }}
                      />

                      <Select
                          onChange={selectTableChange}
                          options={tableData || options}
                          isDisabled={selectedValue === ''}
                          defaultValue={{ label: "Select Table", value: 0 }}

                      />
                  </div>
                  {rows.length !== 0 &&
                  <DataTable
                      dense
                      title=" ReloSpec User's Database"
                      columns={columns}
                      data={tableRows}
                      defaultSortFieldId={1}
                      pagination
                      keyField="AgentID"
                      striped
                      progressPending={pending}
                      persistTableHead
                  />}
              </Card>
          </MainDiv>
    );
}

export default TableView;
