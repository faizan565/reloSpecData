<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once "./config.php";
$UserName = htmlspecialchars($_GET["name"]);
$UserName = '%'.$UserName.'%';
$License = htmlspecialchars($_GET["license"]);
$License = '%'.$License.'%';
$Firm = htmlspecialchars($_GET["firm"]);
$Firm = '%'.$Firm.'%';
$Network = htmlspecialchars($_GET["network"]);
$Network = '%'.$Network.'%';
$BranchName = htmlspecialchars($_GET["branch"]);
$BranchName = '%'.$BranchName.'%';
$Status = htmlspecialchars($_GET["status"]);
$Status = '%'.$Status.'%';
$EmailAddress = htmlspecialchars($_GET["email"]);
$EmailAddress = '%'.$EmailAddress.'%';
$CompanyDB = htmlspecialchars($_GET["db"]);
$CompanyDB = '%'.$CompanyDB.'%';
$BillingMonth = htmlspecialchars($_GET["month"]);
$BillingMonth = '%'.$BillingMonth.'%';

if(!empty($UserName) || !empty($License) || !empty($Firm) || !empty($Network) || !empty($BranchName) || !empty($Status) || !empty($EmailAddress) || !empty($CompanyDB) || !empty($BillingMonth)){
    $sql = "SELECT * FROM Users where (UserName like ?) OR (CompanyDB like ?) OR  (LicenseLevel like ?) OR (Firm  like ?) OR (Network like ?) OR (BranchName like ?) OR (EmailAddress like ?) OR (Status like ?) OR (BillingMonth like ?) ";
    $params = array($UserName, $CompanyDB, $License, $Firm, $Network, $BranchName, $EmailAddress, $Status, $BillingMonth);


    $options =  array("Scrollable" => SQLSRV_CURSOR_KEYSET);
    $result = sqlsrv_query($conn, $sql, $params);
    $data = array();
    while ($row = sqlsrv_fetch_array($result)) {
        array_push($data, json_encode($row));
    }

}

echo json_encode($data);


