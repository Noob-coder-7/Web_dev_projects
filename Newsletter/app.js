const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const htttps  =require("https");;


const app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var firstname = req.body.fname;
    var secondname = req.body.sname;
    var email= req.body.em;

    console.log(firstname+secondname+email);

   var data = {

    members:[
        {
            email_address : email,
            status:"subscribed",
            merge_fields:{
               FNAME: firstname,
               LNAME: secondname,
            }
        }
    ]

   };
    
    const jsondata= JSON.stringify(data);
    const url = " https://us21.api.mailchimp.com/3.0/lists/1c5282eaa54"
    const options = {
        method:"POST",
        auth: "anglea1:021fd66c9ab084757088849277803828-us21"
    }
     const request = htttps.request(url,options,function(response){
if(response.statusCode==200)
res.sendFile(__dirname+"/success.html");

else
res.sendFile(__dirname+"/failure.html");
       response.on("data",function(data){
        console.log(JSON.parse(data));
       })

    });
    request.write(jsondata);
    request.end();
});
app.post("/failure",function(request,response){
    response.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});






//021fd66c9ab084757088849277803828-us21 api id
//1c5282ea54. list id 