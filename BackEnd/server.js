const express =  require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const authController = require('./Controllers/authController');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT;



connectDB()

app.use(express.json())
app.use("/auth", authController)


app.listen(PORT, ()=>console.log(`Server Stared at ${process.env.PORT}`))



