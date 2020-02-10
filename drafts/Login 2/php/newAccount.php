<?php

    function get_account_values(){
        $values = $_POST['input'];
    }

    function connect_to_db(){
        $servername = "localhost";
        $username = "root";
        $password = "NTVg13/08";

        // Create connection
        $conn = new mysqli($servername, $username, $password);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echo "Connected successfully";
        return $conn;

    }

    $conn = connect_to_db();

    $sql = "INSERT INTO  new_accounts_info(first_name, last_name, email, pass ,organization)
VALUES ('John', 'Doe', 'john@example.com','1234','Fight HUnger')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }


?>