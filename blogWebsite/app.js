//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogdb');

const PostSchema  = new mongoose.Schema({
name:String,
content:String
});
const Post = mongoose.model('Post',PostSchema);

// const foundPosts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Post.find({}).then(function(foundPosts){
    // console.log(foundPosts);
    res.render("home",{info:homeStartingContent,arr:foundPosts});
  
  })
  .catch(function(err){
    console.log(err);
  });
  
  
  
});
app.get("/about",function(req,res){
  res.render("about",{personalinfo:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactinfo:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
    let post = {title :req.body.postTitle,
    area : req.body.postBody
    
  };
  const post1 = new Post({
    name:post.title,
    content:post.area
  });
   post1.save().then(function(){
    res.redirect("/");
   })
   .catch(function(err){
    console.log(err);
   })
    
    // posts.push(post);
   
    
  });
  app.get("/posts/:post",function(req,res){
    let x = req.params.post;
    // let z =lodash.lowerCase(x);
    Post.findOne({name:x}).then(function(special){
      res.render("post.ejs",{top:special.name,content:special.content});
    })
    .catch(function(err){
      console.log(err);
    });
    
    // posts.forEach(function(item){
    //   let content = item.area;
    //   let w =lodash.lowerCase(item.title);
    //   if(w===z){
    //   res.render("post.ejs",{content:content,top:item.title});
      
      }); 
  //   })
  // });















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
