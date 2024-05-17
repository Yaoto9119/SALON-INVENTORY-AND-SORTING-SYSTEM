<?php

declare(strict_types=1);

function get_username(object $pdo, string $Username)
{
    $query = "SELECT Username FROM accounts WHERE Username = :Username;:";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":Username", $Username);
    $stmt->execute();


    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function get_email(object $pdo, string $email)
{
    $query = "SELECT email FROM accounts WHERE email = :email;:";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();


    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function set_user(object $pdo, string $Username, string $email, string $pwd){
    $query = "INSERT INTO accounts(Username, email, pwd) VALUES (:Username, :Pwd, Email,);";
    $stmt = $pdo->prepare($query);

    $options = [
        'cost' => 12
    ]
    $hashedPwd = password_hash($pwd, PASSWORD_BCRYPT, $options)

    $stmt->bindParam(":Email", $email);
    $stmt->bindParam(":Username", $Username);
    $stmt->bindParam(":Pwd", $hashedPwd);

    if ($stmt->execute()) {
        header("Location:../HTML/login.html");
        exit;
    } else {
        header("Location:../HTML/login.html");
        die;
    }
}