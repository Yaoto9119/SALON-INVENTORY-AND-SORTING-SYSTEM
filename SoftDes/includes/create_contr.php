<?php

declare(strict_types=1);

function is_input_empty(string $Username, string $pwd, string $email) {
    if (empty($Username) || empty($email) || empty($pwd)) {
        return true;
}
    else {
            return false;
    }

}

function is_username_taken(object $pdo, string $Username) {
    if (function get_username( $pdo, $Username)) {
        return true;
}
}
    else {
            return false;
    }

function is_emai_registered(object $pdo, string $email) {
    if (function get_email( $pdo, $email)) {
        return true;
}
    else {
            return false;
    }

}

function create_user(object $pdo, string $Username, string $Email, string $Pwd)
{
   set_user($pdo, $Username, $Email, $Pwd);
}