const express = require("express");
const app  =express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.static("public"));  
mongoose.connect('mongodb://127.0.0.1:27017/WikiDB');
 const articleSchema = new mongoose.Schema({
    title:String,
    content:String
 });

 const Article = mongoose.model('Article',articleSchema);
//requests targeting all all articles
app.route("/articles")

.get(function(req,res){
    Article.find({}).then(function(foundArticles){
        res.send(foundArticles);
    })
    .catch(function(err){
        console.log(err);
    });
    
    })
    
    .post(function(req,res){
        console.log( req.body.title);
         console.log(req.body.content);
     
         const newArticle = new Article({
             title:req.body.title,
             content:req.body.content
         })
         newArticle.save().then(function(){
             res.send("Successfully added a new article");
         })
         .catch(function(err){
             res.send(err);
         })
     })
     
     .delete(function(req,res){
        Article.deleteMany({}).then(function(){
            res.send("Successfully deleted all articles");
        })
        .catch(function(err){
            res.send(err);
        });
    });

    //requests catering to particular articles
    app.route("/articles/:articleTitle")
    
    .get(function(req,res){
     Article.findOne({title:req.params.articleTitle}).then(function(foundArticle){
        res.send(foundArticle);
     })
     .catch(function(err){
        res.send("No articles matching that title was found");
     })
    })
    
.put(function(req,res){
    Article.updateOne({title:req.params.articleTitle},{title:req.body.title,content:req.body.content}).then(function(){
         res.send("Successfully updated");
    })
    .catch(function(err){
        res.send(err);
    })
})

.delete(function(req,res){
   Article.deleteOne({title:req.params.articleTitle}).then(function(){
    res.send("Successfully deleted the particular entry");
   })
   .catch(function(err){
    res.send(err);
   })
})
.patch(function(req,res){
    Article.updateOne({title:req.params.articleTitle},{$set:req.body}).then(function(){
        res.send("Successfully updated");
    })
    .catch(function(err){
        res.send(err);
    });
    
});
    
// app.get("/articles",);

// app.post("/articles",);
 

// app.delete("/articles",)

app.listen("3000",function(){
    console.log("Server started at port 3000");
})

