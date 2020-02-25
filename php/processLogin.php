
<?php

    $values=$_POST['input'];
    $array=json_decode($_POST['input']);
    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);
    
        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
    debug_to_console("Reached here");
?>