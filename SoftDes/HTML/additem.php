<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>JP Salon Account Creation</title>
  <link rel="stylesheet" href="../CSS/login.css">
  <style>
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <header><img src="../IMG/jpsalon.png" alt="logo" width="350" height="350" class=""></header>
  <div class="center">
    <h1>Add an Item</h1>
    <form id="accountCreationForm" method="post">
      <div class="txt_field">
        <input type="text" name="username" required>
        <span></span>
        <label>Name</label>
      </div>
      <div class="txt_field">
        <input type="email" name="email" required>
        <span></span>
        <label>Description</label>
      </div>
      <div class="txt_field">
        <input type="password" name="password" required>
        <span></span>
        <label>Type</label>
      </div>
      <input type="submit" value="Add Item">
    </form>
  </div>

  <script>
    document.getElementById("accountCreationForm").addEventListener("submit", function(event) {
      event.preventDefault();
      // You can add your account creation logic here
      // For example, send the form data to a server-side script for processing
      // After successful creation, you can redirect the user to a different page
      window.location.href = "/HTML/success.html"; // Redirect to success page
    });
  </script>
</body>
</html>
