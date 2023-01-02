const e = require('express');
const express = require('express');
const {modelNames} = require('mongoose');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
var router = express.Router();

var emp = new schema({
    name:String,
    rating:Number,
    ticket_no:Number,
    price:Number
})

var Movie = mongoose.model('movie',emp,'movie');

router.get('/movie',(req,resp)=>{
    Movie.find().exec((err,data)=>{
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            resp.send(data)
            console.log(data)
        }
    })
})

router.post('/movie',(req,resp)=>{
    var mov = new Movie({name:req.body.name,rating:req.body.rating,ticket_no:req.body.ticket_no,price:req.body.price})
    mov.save((err,data)=>{
        if(err){
            console.log(err);
             resp.status(500).send("no data added");
           }else{
            resp.send(data)
           }
    })
})

router.get("/movie/:name",function(req,resp){
    console.log("name: "+req.params.name);
    Movie.find({name:req.params.name}).exec(function(err,data){
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            resp.send(data);
        }
    })
})

router.put('/movie/:name',(req,resp)=>{
    Movie.findOne({name:req.body.name},(err,doc)=>{
        if(err){
            resp.status(500).send("no data found")
        }
        else{
            doc.name = req.body.name,
            doc.rating = req.body.rating,
            doc.ticket_no = req.body.ticket_no,
            doc.price = req.body.price
            doc.save((err,data)=>{
                if(err){
                    resp.status(500).send("no data updated");
                }
                else{
                    resp.send(data)
                }
            })
        }
    })
})

router.delete("/movie/:name",function(req,resp){
    Movie.remove({name:req.params.name},(err,data)=>{
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            resp.status(200).send("deleted successfully");
        }    
    })
})
    

module.exports = router;

