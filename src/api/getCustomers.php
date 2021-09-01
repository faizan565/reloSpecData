<?php

require_once "./config.php";
$sql = "SELECT * FROM users";
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
