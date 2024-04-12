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

});

//get ballot from ballotID
app.get("ballots/ballotID",async(req,res)=>{
    const ballotID = req.params.ballotID;
    try{
        check = await bl.ballotExists(ballotID);
        if(check){
            blResponse = bl.getBallot();
            res.status(200).json(blResponse);
        }else{
            res.status(401).json("Ballot does not exist");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

//Retrieve information about all users or users from a specific society
app.get("users/societyID",async(req,res)=>{
    const societyID = req.params.societyID;
    try{
        res.status(200).json(bl.getSocietyUsers());
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

//createEditUser 
//should there be a password . . . ?
app.post("users/username",async(req,res)=>{
    const username = req.params.username;
    const password = req.params.password;
    const name = req.params.name;
    const roleID = req.params.roleID;
    try{
       res.status(200).json(bl.createEditUser(username, password, name, roleID));
    }catch(error){
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});




app.listen(port,()=>{
    console.log("port connected");
})