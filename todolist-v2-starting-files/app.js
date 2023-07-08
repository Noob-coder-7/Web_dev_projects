//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _  = require("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb+srv://kaushal-singh:Nikehypervenom1!@cluster0.dnoy9ra.mongodb.net/todolistDB');

const itemsSchema = {
  name:String
};
const Item =  mongoose.model("Item",itemsSchema);

const item1  =  new Item({
  name:"Welcome to your todolist"
});
const item2  =  new Item({
  name:" Hit the + button to add a new item"
});

const item3  =  new Item({
  name:" <-- Hit this to delete an item"
});

const defaultitems = [item1,item2,item3];


const listSchema = {
  name:String,
  items:[itemsSchema]
};
const List  =mongoose.model("List",listSchema);




app.get("/", function(req, res) {
  
      Item.find({}).then(function(foundItems){
          if(foundItems.length===0){
            Item.insertMany(defaultitems).then(function(){
              console.log("successfully added items to database");
            })
            .catch(function(err){
              console.log(err);
            });
            res.redirect("/");
          }
          else{
            res.render("list", {listTitle:"Today", newListItems: foundItems});
        }
      });
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
    const listName = req.body.list;

  const item = new Item({
    name:itemName
  })
  if(listName==="Today"){
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name:listName}).then(function(foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }
  
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
   
  // }
});

app.post("/delete",function(req,res){
 const checkedID = req.body.checkbox;
 const listName = req.body.listName;
 if(listName==="Today"){
  Item.findByIdAndDelete(checkedID).then(function(){
    console.log("Successfully deleted checked items");
    res.redirect("/");
   })
   .catch(function(err){
    console.log(err);
   });
 }
 else{
List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedID}}}).then(function(foundItems){
  res.redirect("/"+listName);
})
.catch(function(err){
  console.log(err);
});
 }
})


app.get('/:customListName',function(req,res){
 
 const customListName =_.capitalize(req.params.customListName);

 List.findOne({name:customListName}).then(function(foundList){
  if(!foundList){
    const list  =new List({
      name:customListName,
      items:defaultitems
     }); 
     list.save();
     res.redirect("/:"+customListName);
  }
 // create a new list
 
  else
 // show an exisitng list
 res.render("list", {listTitle:foundList.name, newListItems: foundList.items})
 })
//  
});

  


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
