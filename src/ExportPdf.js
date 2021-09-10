import './App.css';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {ExportButton} from "./components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFilePdf } from '@fortawesome/fontawesome-free-solid'

function ExportPdf( {rows}) {
    const convert = () =>{
        const doc = new jsPDF({
            orientation: 'l',
            format: 'a1',
        });
        var arrays = rows.map(el=>Object.values(el));
        doc.autoTable({
            head: [['ID', 'UserName', 'Password', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']],
            body: arrays,
        })
        doc.save('ReloSpec.pdf');
};
    return (
        <ExportButton margin><button title="Export Pdf" onClick={convert}><FontAwesomeIcon icon={faFilePdf}/></button></ExportButton>
    );
}

export default ExportPdf;
