<?php
$data = $_POST['data'];
$file = md5(uniqid()) . '.xml';

// remove "data:image/png;base64,"
$uri =  substr($data,strpos($data,",")+1);

// save to file
file_put_contents('./'.$file, $data);

// return the filename
echo $file; exit;