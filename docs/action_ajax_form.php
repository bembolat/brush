<?php

if (isset($_POST["name"]) && isset($_POST["tel"]) && isset($_POST["email"]) ) { 

	// Формируем массив для JSON ответа
    $result = array(
    	'name_user' => $_POST["name"],
    	'tel_user' => $_POST["tel"],
    	'email_user' => $_POST["email"]
    ); 

    // Переводим массив в JSON
    echo json_encode($result); 
}

?>