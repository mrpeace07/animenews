const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  
 var firstName = req.body.name;
 var email = req.body.mail

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName

        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/f85be64844";

  const options = {
    method: "POST",
    auth: "mrpeace:e404d744343631c59187ecc1f11cadad-us21"
  };

  const request = https.request(url,options, function(response) { 
    
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.send(__dirname + "/failure.html");
    }
    
    
    response.on("data", function( data ){
       

    });

  });
    
  request.write(jsonData);
  request.end ();

});


app.post("/failure", function(req,res) {
res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});

// e404d744343631c59187ecc1f11cadad-us21
