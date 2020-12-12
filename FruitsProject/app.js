//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const apple = new Fruit({
  name:"Peaches",
  rating: 3,
  review: "Peaches are bad!"
});

// const orange = new Fruit({
//   name: "Orange",
//   rating: 8,
//   review: "Pretty Good!"
// });
//
// const watermelon = new Fruit({
//   name: "Watermelon",
//   rating: 10,
//   review: "Awesome!"
// });
//
// Fruit.insertMany([orange, watermelon], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

// Fruit.deleteOne({name:"Peaches"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Deleted Successfully");
//   }
// });

// apple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitsSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name:"Pineapple",
  rating:8,
  review:"Great fruit!"
});

const banana = new Fruit({
  name:"Banana",
  rating:7,
  review:"Great for empty stomach!"
});

// banana.save();

const p1 = new Person({
  name: "Riya",
  age: 19,
  favouriteFruit: pineapple
});

Person.find(function(err, people) {
  if (err) {
    console.log(err);
  } else {
    people.forEach(function(person) {
      console.log(person.name);
    });
  }
});

Person.updateOne({name:"Jainam"},{favouriteFruit:banana},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Jainam updated with fav fruit");
  }
});

// Person.deleteMany({name:"Jainam"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Deleted successfully the person records");
//   }
// });

// p1.save();
