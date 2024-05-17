<?php

if ($_SERVER["REQUEST_METHOD"] === "POST"){

    $Username = $_POST["Username"];
    $email = $_POST["email"];
    $pwd = $_POST["pwd"];

    try {
        
        require_once 'dbhinc.php';
        require_once 'create_model.php';
        require_once 'create_contr.php';

        // ERROR HANDLERS
        $errors = [];

        if (is_input_empty($username, $pwd, $email)) {
            $errors["empty_input"] = "Please fill in all fields";
        }
         
        if (function is_username_taken( $pdo,  $Username)){
            $errors["Username_taken"] = "Username is already taken";
        }

        if (function is_emai_registered($pdo, $email)) {
            $errors["email_used"] = "Email is already registered"
        }

        require_once 'configSessionsINC.php';

        if ($errors){
            $_SESSION["errors_create"] = $errors;
            header("Location: ../HTML/login.html");
            die;
        }

    }

    create_user($pdo, $Username, $email, $pwd);
    header("Location: ../HTML/login.html");

    die();


} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

else{
    header("Location: login.php");
    $pdo = null;
    $stmt = null;
    die();
}