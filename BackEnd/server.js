const express =  require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT;
const registration = require('./routes/api/users')
const profile = require('./routes/api/profile')
const auth = require('./routes/api/auth');
const post = require('./routes/api/posts')



connectDB()

app.use(express.json())

// Defined Routes
app.use('/api/users', registration)
app.use('/api/auth', auth )
app.use('/api/profile', profile)
app.use('/api/post', post)


app.listen(PORT, ()=>console.log(`Server Stared at ${process.env.PORT}`))



