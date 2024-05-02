const express = require('express');
require('dotenv').config({path:'./.env'});
const cors = require('cors');
const jwt_token = require('jsonwebtoken');
const app = express();
require('dotenv').config({path:'./.env'});

const admin_AC_route = require('./routes/API_Admin/API_Admin_AccCreate.js');
const WM_INV_route = require('./routes/API_WarehouseManager/API_Inventory.js');
const employee_Recipe_route = require('./routes/API_Staff/API_Recipe.js');
const owner_Recipe_route = require('./routes/API_Owner/API_ColorMixture.js');
const owner_report_route = require('./routes/API_Owner/API_Report_Owner.js');
const staff_acc_route = require('./routes/API_Staff/API_AccStaff.js');
const admin_Auth_route = require('./routes/API_Admin/API_Admin_Auth.js');


// init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/API_Admin_AccCreate', admin_AC_route);
app.use('/API_Inventory', WM_INV_route);
app.use('/API_Recipe', employee_Recipe_route);
app.use('/API_ColorMixture', owner_Recipe_route);
app.use('/API_Report_Owner', owner_report_route);
app.use('/API_AccStaff', staff_acc_route);
app.use('/API_Admin_Auth', admin_Auth_route);


app.get('/', (req, res) => res.send('Server Is Running In Perfect Condition'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));