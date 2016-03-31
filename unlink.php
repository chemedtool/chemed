<?php
$file = $_POST['data'];

// force user to download the image
if (file_exists($file)) {
    unlink($file);
    exit;
}
