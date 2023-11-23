require('dotenv').config();
const express = require('express');
const cors =require("cors")
const helmet =require("helmet")
const mongodb = require('mongodb');
const app = express();
const port = 8080;
const db=require('./config/mongoose');
var path = require('path');
const bodyParser=require('body-parser')
const cookieParser=require("cookie-parser");
//make the upload path available to the browser 
// app.use('/uploads',express.static(__dirname + '/uploads'));
//set up the view engine
app.set('view engine', 'ejs');
app.use(cors());
app.use(helmet());
app.use(express.urlencoded());
app.use(express.json());
app.set('views','./views');
app.use(cookieParser());
//set up for static files 
app.use(express.static('./assets'));
app.use('/',require('./routes'));//it will move to routes/index.js for furthur 

app.listen(port,'0.0.0.0',function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});