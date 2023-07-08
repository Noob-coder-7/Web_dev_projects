const express = require("express");
var bodyParser = require('body-parser')
const https = require("https");

const app  = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log("Post recieved");
  

  const query=req.body.cityName;
const appid = "38c5d922eb3c6188992d75c92f11fe22"
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit+"";

    https.get(url,function(response){
        console.log(response.statusCode);
    
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      
      
      const icon = weatherData.weather[0].icon;
      const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    
    
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const temp = weatherData.main.temp
      console.log(temp);

      res.write("<h1> The temp in" +" "+query+ " is " +"" +temp+" </h1>");
      res.write("<img src="+imageurl+">");
      res.send();
    });
});

    
});




app.listen(3000,function(){
console.log("Server is running ");
}
   );