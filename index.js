const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const bl = require('./businesslayer');
var cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.post("/users/login",async(req,res)=>{
    const{username,password}=req.body;

    try{
        console.log("smthng");  
    
        check = await bl.userExists(username, password);
        console.log(check);
        if(check){
            res.status(200).json("Login successful");
        }
        else{
            res.status(401).json("Invalid credentials");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }

})




app.listen(port,()=>{
    console.log("port connected");
})