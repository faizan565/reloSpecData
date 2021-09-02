<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents('php://input'));
 
require_once "./config.php";

// var_dump($data);
// var_dump($conn);
if(!empty($data->UserAutonumber)){
	$UserAutonumber = intval($data->UserAutonumber);
	$UserName = $data->UserName;
    $Password = $data->Password;
    $License = $data->License;
    $Firm = $data->Firm;
    $Network = $data->Network;
    $BranchName = $data->BranchName;
    $Status = $data->Status;
    $EmailAddress = $data->EmailAddress;
    $CompanyDB = $data->CompanyDB;
    $BillingMonth = $data->BillingMonth;

    // echo  gettype($UserAutonumber) . $UserName . $Password . $License . $Firm . $Network . gettype($BillingMonth). $BranchName .$BillingMonth;
	$query = "UPDATE Users SET UserName = ?, Password = ?, LicenseLevel = ?, Firm = ?, Network = ?, BranchName = ?, Status = ?, EmailAddress = ?, CompanyDB = ?, BillingMonth = ?   WHERE UserAutonumber = ?";
     
    $params = array($UserName, $Password, $License, $Firm, $Network, $BranchName, $Status, $EmailAddress, $CompanyDB, $BillingMonth, $UserAutonumber);
    $result = sqlsrv_query($conn, $query, $params);
    // $rows_affected = sqlsrv_rows_affected( $result);

    if ($result) {  
        echo "Record Updated Succesfully.\n" ;
        // . $rows_affected;  
    } else {  
        echo "Record Updation failed.\n";  
        die(print_r(sqlsrv_errors(), true));  
    }  
}
sqlsrv_close($conn);  
?>