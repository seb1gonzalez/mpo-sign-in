
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

    /**Get password corresponding to email if found */
    function search_pass($email,$conn){
        $sql = "SELECT pass FROM new_acc_info WHERE pass='".$email."'";
        $result = mysqli_query($conn,$sql);
        if($result==FALSE){
            return false;
        } 
        $pass = mysqli_fetch_assoc($result)["pass"];
        return $pass;
    }

    /**Returns true if password is correct, false if not */
    function verify_password($pass,$hash){
        if(password_verify($pass,$hash)){
            /*Password is valid*/
            debug_to_console($pass);
            return true;
        }
        return false;
    }

    /*Processes array for DB query*/
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


    /**Process password with query to see if it is correct password*/
    $conn = connect_to_db();
    if(isset($_POST['input'])){
        $log_in = get_account_values();
        $log_in = process_array($conn,$log_in);
        $hash = search_pass($log_in[0],$conn);
        $is_pass_valid = verify_password($log_in[1],$hash);
        if($is_pass_valid)
            echo "Password Valid";
        else
            echo "Password not Valid";
    }
    mysqli_close($conn);
?>