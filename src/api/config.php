<?php
$serverName = "CRLHL-YOUSAFAI1\SQLEXPRESS"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Names", "UID"=>"abc", "PWD"=>"123");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     // echo "Connection established 1111.<br />";

}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>
