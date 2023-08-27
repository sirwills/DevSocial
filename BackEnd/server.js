const express =  require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT;
const registration = require('./routes/api/users')



connectDB()

app.use(express.json())
app.use('/api/users', registration)


app.listen(PORT, ()=>console.log(`Server Stared at ${process.env.PORT}`))



