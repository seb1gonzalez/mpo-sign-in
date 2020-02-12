<?php
    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);
    
        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
    
    function get_account_values(){
        $values = $_POST['input'];
        $array=json_decode($values);
        return $array;
    }

    function connect_to_db(){
        $host = "localhost";
        $username = "root";
        $password = "";
        $db = "test";
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
    if(isset($_POST['input'])){
        $new_account = get_account_values();    
    }else{
        debug_to_console("Values not posted");
    }
    
//     $sql = "INSERT INTO  new_acc_info(first_name, last_name, email, pass ,organization)
// VALUES ('$new_account[0]','1234','John', 'Doe','Fight Hunger')";

    // if ($conn->query($sql) === TRUE) {
    //     debug_to_console("New record created successfully");
    // } else {
    //     echo "Error: " . $sql . "<br>" . $conn->error;
    // }


?>