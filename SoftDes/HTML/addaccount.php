<?php
require_once '../includes/configSessionsINC.php';
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>JP Salon Account Creation</title>
    <link rel="stylesheet" href="../CSS/login.css" />
    <style>
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    </style>
  </head>
  <body>
    <header>
      <img
        src="../IMG/jpsalon.png"
        alt="logo"
        width="300"
        height="300"
        class=""
      />
    </header>

    <div class="center">
      <h1>Create an Account</h1>
      <form
        action="/includes/createInc.php"
        id="accountCreationForm"
        method="post"
      >
        <div class="txt_field">
          <input type="text" name="username" required />
          <span></span>
          <label>Username</label>
        </div>

        <div class="txt_field">
          <input type="email" name="email" required />
          <span></span>
          <label>Email</label>
        </div>

        <div class="txt_field">
          <input type="password" name="password" required />
          <span></span>
          <label>Password</label>
        </div>

        <input type="submit" value="Create Account" />
      </form>
    </div>


    <script>
      document
        .getElementById("accountCreationForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          // You can add your account creation logic here
          // For example, send the form data to a server-side script for processing
          // After successful creation, you can redirect the user to a different page
          window.location.href = "login.php"; // Redirect to success page
        });
    </script>
  </body>
</html>
