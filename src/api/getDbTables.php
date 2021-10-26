<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$tableName = htmlspecialchars($_GET["tableName"]);

$dbName = htmlspecialchars($_GET["dbName"]);

$serverName = "CRLHL-YOUSAFAI1\SQLEXPRESS"; //serverName\instanceName
// echo $dbName . 'aaaa' . $tableName;
// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>$dbName, "UID"=>"abc", "PWD"=>"123");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

// echo 'error in params' . $dbName . $tableName;

if(!empty($dbName) || !empty($tableName)){
    // $sql = "SELECT TOP( 2000) * FROM ?";
    $sql = "SELECT TABLE_NAME as label, TABLE_NAME as value FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";

    $params = array();
    $options =  array("Scrollable" => SQLSRV_CURSOR_KEYSET);
    $result = sqlsrv_query($conn, $sql, $params, $options);
    $data = array();
    while ($row = sqlsrv_fetch_array($result)) {
        // echo json_encode($row);
        array_push($data, json_encode($row));
    }
    // echo "ENDEND<br>";

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json');
    echo json_encode($data);
}else{
    
    echo 'error in params';
}