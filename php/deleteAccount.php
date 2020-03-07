<?php
/*Helper function that prints message to console */
function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

/*Function that connects to the database, can modify user and password for quick connection*/
function connect_to_db(){
    $host = "ctis.utep.edu";
    $username = "ctis";
    $password = "19691963";
    $db = "project_request_form";
    // Create connection
    $conn = mysqli_connect($host, $username,$password, $db);

    // Check connection
    if ($conn->connect_error) {
        debug_to_console("Connection failed");
        die("Connection failed: " . $conn->connect_error);
    } 
    else{
        debug_to_console("Connected successfully");
    }
    return $conn;

}
$conn = connect_to_db();
$query = "SELECT * from users";
?>