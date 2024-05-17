<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>JP Salon Login</title>
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
        width="350"
        height="350"
        class=""
      />
    </header>
    <div class="center">
      <h1>Login</h1>
      <form action="/includes/loginInc.php" id="loginForm" method="post">
        <div class="txt_field">
          <input type="text" name="username" required />
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input type="password" name="password" required />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>

    <script>
      document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          window.location.href = "admin.php";
        });
    </script>
  </body>
</html>
