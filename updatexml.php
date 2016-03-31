<?php
$data = $_POST['data'];
$file = $_POST['fname'];

// remove "data:image/png;base64,"
$uri =  substr($data,strpos($data,",")+1);

// save to file
file_put_contents('./library/'.$file.'.xml', $data);

// return the filename
echo "Success"  ; exit;
?>