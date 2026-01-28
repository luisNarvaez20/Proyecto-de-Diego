const express = require('express');
const mongoose = require('mongoose');
const db = require('./src/db');
const router = require('./src/routes');
const authRouter = require('./src/routes/authRouter');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
//import cors
const cors = require('cors');
const port = process.env.PORT;

require('dotenv').config();

var app = express();

db().then(() => {
    console.log('MongoDB connected...');
}).catch((err) => {
    console.error(err.message);
    //process.exit(1);
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});