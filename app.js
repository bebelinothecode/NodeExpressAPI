"use strict"
const express = require('express');
const app = express();
require('dotenv').config();
require('./db/connect');
const PORT = process.env.PORT||3000;
const tasks = require('./public/routes/tasks');
const mongoose = require('mongoose');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('./public'));       

app.use('/api/v1/tasks',tasks);

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>app.listen(PORT, console.log(`Server is listening on port ${PORT} and is connected to the database`)))
    .catch((error)=>console.log(`error occured${error}`));



