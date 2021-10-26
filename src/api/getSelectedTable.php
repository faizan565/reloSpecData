<?php

$tableName = htmlspecialchars($_GET["tableName"]);

$dbName = htmlspecialchars($_GET["dbName"]);

$serverName = "CRLHL-YOUSAFAI1\SQLEXPRESS";
$connectionInfo = array( "Database"=>$dbName, "UID"=>"abc", "PWD"=>"123");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if(!empty($dbName) || !empty($tableName)){
    // $sql = "SELECT TOP( 2000) * FROM ?";
    $sql = "SELECT TOP( 2000) * FROM " . $tableName;

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
