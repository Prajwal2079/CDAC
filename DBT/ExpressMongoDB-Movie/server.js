const express = require('express');
const bodyparser = require("body-parser")
const path = require('path')
const routes = require('./route')
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

var app = express();

mongoose.promise = global.promise;

const url = 'mongodb://0.0.0.0:27017/test';

mongoose.connect(url,{
    connectTimeoutMS: 2000
},function(err,result){
    if(err){
        console.log("error connecting mongodb");
        console.log(err)
    }
    else{
        console.log("Connection done with database test")
    }
});

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,"public")))

app.use('/',routes)

app.listen(3000)
console.log("Server started at 3000")
module.exports = app;

