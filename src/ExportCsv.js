import React from 'react';
import { DownloadExcel } from "react-excel-export";
// import Button from '../shared/Button';
import DataTable from "react-data-table-component";

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostwriters',
        year: '1984',
    },
    {
        id: 3,
        title: 'Ice road',
        year: '2021',
    },
    {
        id: 4,
        title: 'Nobody',
        year: '2021',
    },
    {
        id: 5,
        title: 'Wrath of man',
        year: '2021',
    }
];

function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    console.log(data);
    const keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}


const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Director',
        selector: row => row.director,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

const ExportCSV = () => {

    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

    return(
        <>
            <DataTable title="Movie List" columns={columns} data={data} actions={actionsMemo} />
            <DownloadExcel
                data={data}
                buttonLabel="Export Data"
                fileName="sample-file"
                // className="export-button"
            />
            {/*<JsonToExcel*/}
            {/*    title="Download as Excel"*/}
            {/*    data={data}*/}
            {/*    fileName="sample-file"*/}
            {/*    // btnClassName="custom-classname"*/}
            {/*/>*/}
        </>
    );
};

export default ExportCSV;