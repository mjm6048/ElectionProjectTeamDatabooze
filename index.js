const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const dl = require('./datalayer');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.post("/users/login",async(req,res)=>{
    const{username,password}=req.body;
    check = dl.userExists(username, password);
    try{
        
        if(check){
            res.status(200).json("Login successful");
        }
        else{
            res.status(400).json("Invalid credentials");
        }

    }
    catch(e){
        res.status(500).json("Internal server error");
    }

})




app.listen(port,()=>{
    console.log("port connected");
})