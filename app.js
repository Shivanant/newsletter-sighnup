const express = require('express')
const bodyParser = require('body-parser');
const request = require('request'); 
const app = express();
const https= require ('https');
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post('/failure',function(req,res){

    res.redirect('/');
})
app.post('/',function(req,res){
    var firstname= req.body.fname;
    var lastname= req.body.lname;
    var email= req.body.email;


    const data={
        members:[
           {
            email_address:email,
            status : "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }
           }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url='https://us17.api.mailchimp.com/3.0/lists/1cadbfc440';

    const options= {
        method: "POST",
        auth:"shiva1:1ef01d17fee4fd18cddcde7114a1bbe7-us17"
            
    }

    const request =https.request(url,options,function(response){

        (response.statusCode=== 200)?res.sendFile(__dirname+"/success.html"):res.sendFile(__dirname+"/failure.html");


       response.on("data",function(data){
        console.log(JSON.parse(data));
       })
    })


    request.write(jsonData);
    request.end();


});






app.listen(PORT,function(){
    console.log("server online at port 3000");
});

//api
//1ef01d17fee4fd18cddcde7114a1bbe7-us17

//list id -  1cadbfc440