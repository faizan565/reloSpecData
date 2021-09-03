<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

require_once "./config.php";
$UserName = htmlspecialchars($_GET["name"]);
$License = htmlspecialchars($_GET["license"]);
$Firm = htmlspecialchars($_GET["firm"]);
$Network = htmlspecialchars($_GET["network"]);
$BranchName = htmlspecialchars($_GET["branch"]);
$Status = htmlspecialchars($_GET["status"]);
$EmailAddress = htmlspecialchars($_GET["email"]);
$CompanyDB = htmlspecialchars($_GET["db"]);
$BillingMonth = htmlspecialchars($_GET["month"]);

if(!empty($UserAutonumber) || !empty($License) || !empty($Firm) || !empty($Network) || !empty($BranchName) || !empty($Status) || !empty($EmailAddress) || !empty($CompanyDB) || !empty($BillingMonth)){

    $sql = "SELECT * FROM Users where (UserName = ?) OR (CompanyDB = ?) OR  (LicenseLevel= ?) OR (Firm = ?) OR (Network = ?) OR (BranchName = ?) OR (EmailAddress = ?) OR (Status = ?) OR (BillingMonth = ?) ";
    $params = array($UserName, $CompanyDB, $License, $Firm, $Network, $BranchName, $EmailAddress, $Status, $BillingMonth);
    $options =  array("Scrollable" => SQLSRV_CURSOR_KEYSET);
    $result = sqlsrv_query($conn, $sql, $params, $options);
    $data = array();
    while ($row = sqlsrv_fetch_array($result)) {
        array_push($data, json_encode($row));
    }

}

echo json_encode($data);


