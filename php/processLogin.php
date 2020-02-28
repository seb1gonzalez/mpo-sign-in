
<?php

    /*Gets values posted by ajax call from the new account form */
    function get_account_values(){
        $values = $_POST['input'];
        return $values;
    }

    /*Helper function that prints to console*/
    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);
    
        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
    debug_to_console($array);


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

    function search_email($email,$conn){
        $sql = "SELECT pass FROM log_in_users WHERE pass=$email";
        $result = mysqli_query($conn,$sql);
        $pass = mysqli_fetch_assoc($result);
        return $pass;
    }

    function verify_password($pass,$hash){
        if(password_verify($pass,$hash)){
            /*Password is valid*/
        }
    }
?>