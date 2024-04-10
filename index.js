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

})


app.get('/results/:ballotID', async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getResults(ballotID);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid BallotID");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }
 
    
})
app.post("/votes",async(req,res)=>
{
    const{username,voteType,itemID,votedFor, writein} = req.body;
    try{
    
        cast = await bl.castVote(username,voteType,itemID,votedFor, writein);
        if(cast){
            res.status(200).json("Vote successfully casted");
        }
        else{
            res.status(400).json("Invalid Vote");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }

})
app.get('/status/:ballotID', async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getStatus(ballotID);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid BallotID");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }
 
    
})
console.log(bl.castVote('applebreeze16','position',2,'123', false));

app.listen(port,()=>{
    console.log("port connected");
})
