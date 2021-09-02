<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents('php://input'));
 
require_once "./config.php";

// var_dump($data);
// var_dump($conn);
if(!empty($data->UserAutonumber)){
	$UserAutonumber = intval($data->UserAutonumber);

    // echo  gettype($UserAutonumber);
	$query = "DELETE FROM Users WHERE UserAutoNumber = ? ";
     
    $params = array($UserAutonumber);
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