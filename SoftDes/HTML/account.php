<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Side Navigation Menu</title>
    <!-- CSS Link -->
    <link rel="stylesheet" href="../CSS/account.css">
    <!-- Icon Link -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

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
                    <li>
                        <i class='bx bxs-home'></i>
                        <a href="admin.html">Home</a>
                    </li>
                    <li class="active">
                        <i class='bx bxs-user-circle'></i>
                        <a href="account.html">Accounts</a>
                    </li>
                    <li>
                        <i class='bx bxs-shopping-bag'></i>
                        <a href="product.html">Products</a>
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

    <div class="list">
        <form method="post">
            <h2>Accounts</h2>
            <div class="txt_field">
                <input type="text" required>
                <span></span>
                <label>Search</label>
            </div>
            <table>
                <thead>
                    <button type="button" class="add-account-button" onclick="window.location.href = 'addaccount.html';">Add Account</button>
                    <tr>
                        <th>Account ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th class="remove">Remove Account</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Your table rows will go here -->
                    <tr>
                        <td>1</td>
                        <td>example@example.com</td>
                        <td>example_user</td>
                        <td>John Doe</td>
                        <td>Admin</td>
                        <td class="remove"><button type="button" class="remove-button"><i class="fas fa-times"></i></button></td>
                    </tr>
                    <!-- Add more rows like the one above as needed -->
                </tbody>
            </table>
        </form>
    </div>
    
    
    
    
    
    
    
        <script>
            function confirmLogout() {
                if (confirm("Are you sure you want to log out?")) {
                    window.location.href = "login.html";
                } else {
                    // User clicked cancel, do nothing
                }
            }
        </script>
</body>
</html>