<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Page</title>
    <!-- CSS Link -->
    <link rel="stylesheet" href="../CSS/emp.css" />
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
                <h2><img src="../IMG/jpsalon.png" alt="logo" width="100" height="100" class=""></h2>
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
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <i class='bx bxs-user-circle'></i>
                        <a href="#">User</a>
                    </li>
                    <li>
                        <i class='bx bxs-message-dots'></i>
                        <a href="#">Message</a>
                    </li>
                    <li>
                        <i class='bx bxs-bar-chart-alt-2'></i>
                        <a href="#">Activity</a>
                    </li>
                    <li>
                        <i class='bx bxs-shopping-bag'></i>
                        <a href="#">Products</a>
                    </li>
                    <li>
                        <i class='bx bxs-bell'></i>
                        <a href="#">Notification</a>
                    </li>
                    <li>
                        <i class='bx bxs-group' ></i>
                        <a href="#">Group</a>
                    </li>
                    <li>
                        <i class='bx bxs-help-circle' ></i>
                        <a href="#">Help</a>
                    </li>
                    <li>
                        <i class='bx bxs-cog'></i>
                        <a href="#">Setting</a>
                    </li>
                    <li>
                        <i class='bx bx-log-in'></i>
                        <a href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

        <div class="list">'
            <form method="post">
                <h2>Color Catalouge</h2>
                <div class="txt_field">
                <input type="text" required>
                <span></span>
                <label>Search</label>
        </div>

</body>
</html>