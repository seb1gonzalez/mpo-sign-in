<?php
    session_start();
    if(isset($_POST['account'])){
        $str = $_POST['account'];
        $_SESSION['account'] = $str;
        echo "Success";
    }
    echo "Failed to send to session";
?>