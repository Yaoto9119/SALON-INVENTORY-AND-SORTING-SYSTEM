<?php

declare(strict_types=1);

function check_create_errors()
{
    if (isset($_SESSION['errors_signup']))
    $errors = $_SESSION['errors_signup'];

    echo "<br>";

    foreach ($errors as $error){
        echo '<p class=from-error>'. $error . '</p>';
    }

    unset($_SESSION['errors_signup']);
}