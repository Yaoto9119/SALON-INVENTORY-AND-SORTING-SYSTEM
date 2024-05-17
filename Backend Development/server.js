const express = require('express');
require('dotenv').config({path:'./.env'});
const cors = require('cors');
const jwt_token = require('jsonwebtoken');
const app = express();
require('dotenv').config({path:'./.env'});
const cookieparser = require('cookie-parser');

const Owner_Credentials_route = require('./routes/api_owner/API_Owner_Credentials');
const Login_route = require('./routes/API_Login');
const WarehouseManager_Inventory_route = require('./routes/api_warehouse_manager/API_Inventory');
const WarehouseManager_Product_route = require('./routes/api_warehouse_manager/API_Products');
const Staff_Report_route = require('./routes/api_staff/API_Report');
const Authorization_Report_route = require('./routes/API_AuthReport');
const All_RequestProduct_route = require('./routes/API_ReqProd');
const All_Notification_route = require('./routes/notification');


// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use('/API_Owner_Credentials', Owner_Credentials_route);
app.use('/API_Login', Login_route);
app.use('/API_Inventory', WarehouseManager_Inventory_route);
app.use('/API_Products', WarehouseManager_Product_route);
app.use('/API_Report', Staff_Report_route);
app.use('/API_AuthReport', Authorization_Report_route);
app.use('/API_ReqProd', All_RequestProduct_route);
app.use('/notification', All_Notification_route);


app.get('/', (req, res) => res.send('Server Is Running In Perfect Condition'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));