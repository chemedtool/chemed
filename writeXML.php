<?php    
$myfile = fopen("newfile.xml", "w") or die("Unable to open file!");
$txt=$_POST['value']; 
fwrite($myfile, $txt);
fclose($myfile);
?>