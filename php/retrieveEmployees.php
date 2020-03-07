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
        die("Connection failed: " . $conn->connect_error);
    } 
    else{
    }
    return $conn;

}
$conn = connect_to_db();
$query = "SELECT * from users";
$table = array();
$result = mysqli_query($conn,$query);
if($result){
    $temp = 0;
    while($temp = mysqli_fetch_assoc($result)){
        array_push($table,$temp);
    }
}
echo json_encode($table);

?>