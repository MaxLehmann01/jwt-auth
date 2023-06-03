const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const dotenv = require('dotenv').config();
const app = express();

/* Middleware */

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT, () => console.log(`Server listening on Port ${process.env.PORT}`))

/* Auth-Lib */

const authLib = require(process.env.AUTH_LIB_PATH);
const authAPI = new authLib(app, process.env.AUTH_URI, null, false);

/* Config */

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

/* Components */

require('./components/auth/auth-main')(app, db, authAPI);