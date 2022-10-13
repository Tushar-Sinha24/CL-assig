const express = require('express');
const dotenv= require('dotenv');
const cors = require('cors');
const cookieParser =require('cookie-parser');

dotenv.config({path:'./config/config.env'})

const app=express();

const userRouter = require('./api/user/user.router')
const taskRouter = require('./api/task/task.router')

//parser
app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth' , userRouter)
app.use('/api/v1/task' , taskRouter)




const PORT=process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server Runing in mode on port ${PORT}`)
    );