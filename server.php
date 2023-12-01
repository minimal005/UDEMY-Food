<?php
$_POST = json_decode( file_get_contents("php://input"), true );//розкоментовуємо, якщо відправляємо JSON
    echo var_dump($_POST);
?>