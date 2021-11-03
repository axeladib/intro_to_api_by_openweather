const express = require("express");
const app = express();
//Module to request api data from external server
const https = require("https");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function(req, res){
    //to send pages
    res.sendFile(__dirname + "/index.html");
    

    // const querry = "London";
    // const apiKey = "d22f0fc5bdf652ddb8f6478913a5e84e";

    // const urlForWeatherData = "https://api.openweathermap.org/data/2.5/weather?q="+ querry + ",209&appid="+ apiKey + " ";
    // https.get(urlForWeatherData, function(response){
    //     console.log(response.statusCode);
        
    //     //TO CHANGE RAW DATA TO JAVASCRIPT SYNTAX
    //     response.on("data", function(data){
    //         const weatherData = JSON.parse(data)
    //         const tempData = weatherData.main.temp;
    //         const descData = weatherData.weather[0].description;    
    //         const icon = weatherData.weather[0].icon

    //         res.send(__dirname + index.html);

            // res.write("<p>The temperature is" + " " + tempData + "</p>");
            // res.write("<h1>Today weather in "+ " " +querry +" "+ "is very"+ " " + descData + "</h1>");
            // res.send();
    //     })
    // })
})

app.post("/", function(req, res){
    
    const querry = req.body.cityName;
    const apiKey = "d22f0fc5bdf652ddb8f6478913a5e84e";

    const urlForWeatherData = "https://api.openweathermap.org/data/2.5/weather?q="+ querry + ",209&appid="+ apiKey + " ";
    https.get(urlForWeatherData, function(response){
        console.log(response.statusCode);
        
        //TO CHANGE RAW DATA TO JAVASCRIPT SYNTAX
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const tempData = weatherData.main.temp;
            const descData = weatherData.weather[0].description;    
            const icon = weatherData.weather[0].icon

            res.write("<p>The temperature is" + " " + tempData + "</p>");
            res.write("<h1>Today weather in "+ " " +querry +" "+ "is very"+ " " + descData + "</h1>");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server started at port 3000");
})