const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const bl = require('./businesslayer');
var cors = require('cors');
const jwt = require("jsonwebtoken");
const secretKey = "dean";
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
            const token = jwt.sign({ username }, secretKey , {
                expiresIn: "5h"
              });
            res.status(200).json({token});
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


app.get('/ballots', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        const {societyId} = req.query;
        if (!token) {
            res.status(600)
                .json(
                    {
                        success: false,
                        message: "Error!Token was not provided."
                    }
                );
        }
        //Decoding the token
        const decodedToken =
            jwt.verify(token, "dean");
        username = decodedToken.username;
        result = await bl.getBallots(societyId,username);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid society");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});




app.get('/ballotitems/:ballotID'), async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getBallots(ballotID,username);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid ballot");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }
 
}

app.get('/candidates/:ballotID'), async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getCandidates(ballotID,username);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid ballot");
        }

    }
    catch(e){
        console.log(e);
       res.status(500).json("Internal server error");
    }
 
}


app.get('/results/:ballotID', async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getResults(ballotID,username);
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

app.get('/status/:ballotID', async(req,res)=>
{
    const{ballotID}=req.query;
    try{
    
        result = await bl.getStatus(ballotID,username);
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
    const{ballotID,positionVotes, initiativeVotes} = req.body;
    try{
    
        cast = await bl.castVote(ballotID,positionVotes, initiativeVotes, username);
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

console.log(bl.castVote('applebreeze16','position',2,'123', false));

app.listen(port,()=>{
    console.log("port connected");
})
