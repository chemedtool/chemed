<?php
$dir    = './'.$_POST['folder_name'];
$files1 = scandir($dir,1);
echo json_encode($files1);
?>
