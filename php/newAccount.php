<?php
    /*Helper function that prints message to console */
    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);
    
        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
    /*Gets values posted by ajax call from the new account form */
    function get_account_values(){
        $values = $_POST['input'];
        return $values;
    }
    /*Function that connects to the database, can modify user and password for quick connection*/
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

    /*Processes array for insertion into DB*/
    function process_array($conn,$new_account){
        foreach ($new_account as $key => $value) {
            $cols[] = $key;
            $value = implode(",",$value);
            $value = explode(",",$value);
            $value = $value[1];
            $vals[] = mysqli_real_escape_string($conn, $value);
            }
          $colvals = "'".implode("', '", $vals)."'";
          return $colvals;
    }

    $conn = connect_to_db();
    /*Verifies if values have been posted and tries to get them */
    if(isset($_POST['input'])){
        $new_account = get_account_values();   
        //POD To prepare sql statement in PHP
        //$sql = $conn->prepare("INSERT INTO  `new_acc_info`(`first_name`, `last_name`, `email`, `pass` ,`organization`)
        //VALUES (?,?,?,?,?)");
        $new_account = process_array($conn,$new_account);
        $sql = "INSERT INTO new_acc_info(first_name,last_name,email,pass,organization) VALUES($new_account)";
        // $new_account = array_values($new_account);
        // $f_name = $new_account[0];
        // $l_name = $new_account[1];
        // $email = $new_account[2];
        // $org = $new_account[3];
        // $pass = $new_account[4];
        // $values = implode(",", array_values($new_account));
        // $values = explode(",", $values);


        //Binds variables to sql statement (Password in DB is second to last column)
       // $sql->bind_param("sssss",$values[0],$values[1],$values[2],$values[4],$values[3]);
        // $sql->execute();
        mysqli_query($conn,$sql);
            if ($conn->query($sql) === TRUE) {
                debug_to_console("New record created successfully");
            } else {
                debug_to_console("Failed to insert records");
                echo $new_account;
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
    }else{
        debug_to_console("Values not posted");
    }
    

   


?>