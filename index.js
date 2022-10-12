const express = require('express');
const connectDB=require('./config/db');
const dotenv= require('dotenv');
const cors = require('cors');


dotenv.config({path:'./config/config.env'})



const app=express();
//parser
app.use(express.json());
app.use(cors());



const PORT=process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server Runing in mode on port ${PORT}`)
    );