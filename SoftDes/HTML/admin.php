<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Side Navigation Menu</title>
    <!-- CSS Link -->
    <link rel="stylesheet" href="../CSS/admin.css">
    <!-- Icon Link -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="container">

        <input type="checkbox" id="click">
        <label for="click">
            <i class='menu-btn bx bx-menu'></i>
            <i class='close-btn bx bx-x-circle'></i>
        </label>
        <div class="sidenav">
            <div class="logo">
                <h2><img src="../IMG/jpsalon.png" alt="logo" width="80" height="100" class=""></h2>
            </div>

            <div class="search_bar">
                <form action="#">
                    <i class='bx bx-search'></i>
                    <input type="text" placeholder="Search...">
                </form>
            </div>
            <div class="icon_items">
                <ul>
                    <li class="active">
                        <i class='bx bxs-home'></i>
                        <a href="admin.php">Home</a>
                    </li>
                    <li>
                        <i class='bx bxs-user-circle'></i>
                        <a href="/HTML/account.html">Accounts</a>
                    </li>
                    <li>
                        <i class='bx bxs-shopping-bag'></i>
                        <a href="products.html">Products</a>
                    </li>
                    <li>
                        <i class='bx bxs-cog'></i>
                        <a href="setting.html">Settings</a>
                    </li>
                    <li>
                        <i class='bx bx-log-in'></i>
                        <a href="#" onclick="confirmLogout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        function confirmLogout() {
            if (confirm("Are you sure you want to log out?")) {
                window.location.href = "../HTML/login.php";
            } else {
                // User clicked cancel, do nothing
            }
        }
    </script>
</body>
</html>
