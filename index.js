const express = require('express');
const dotenv= require('dotenv');
const cors = require('cors');

dotenv.config({path:'./config/config.env'})

const app=express();

const userRouter = require('./api/user/user.router')

//parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth' , userRouter)




const PORT=process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server Runing in mode on port ${PORT}`)
    );