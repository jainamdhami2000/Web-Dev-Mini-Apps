//jshint esversion:6
const express = require("express");
const app = express();

app.get("/",function(request,response){
  response.send("Hi");
});

app.get("/contact",function(request,response){
  response.send("contact me at jainamdhami2000@gmail.com");
});

app.get("/about",function(request,response){
  response.send("Hi! I am Jainam Dhami");
});

app.listen(3000,function(){
  console.log("server on 3000");
});
