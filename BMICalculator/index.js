//jshint esversion:6
const express = require('express');
const body_parser = require('body-parser');

const app = express();

app.use(body_parser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator",function(req,res){
  var height = req.body.h;
  var weight = req.body.w;
  var result = weight/(height*height);
  res.send("result:"+result);
});

app.listen(3000);
