const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;
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
        const decodedToken = jwt.verify(token, "dean");
        if (decodedToken == null)
        {
            res.status(501).json("Invalid token");
        }
        username = decodedToken.username;
        result = await bl.getBallots(username);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid society");
            }
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid User");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error ");
    }

});


app.get('/ballotitems', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        const {ballotID} = req.query;
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
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        result = await bl.getBallotItems(ballotID,username);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid user");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});



app.get('/candidates', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        const {ballotID} = req.query;
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
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        result = await bl.getCandidates(ballotID,username);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid user");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});


app.get('/results', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        const {ballotID} = req.query;
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
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        result = await bl.getResults(ballotID,username);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            res.status(200).json(result);
        }
        else{
            res.status(400).json("Invalid User");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});

app.get('/status', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
        const {ballotID} = req.query;
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
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        result = await bl.getStatus(ballotID,username);
        if(result){
            res.status(200).json(result);
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
        }
        else{
            res.status(400).json("Invalid User");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});

app.post('/votes', async (req, res) => {
    try
    {
	    const token =
            req.headers
                .authorization.split(' ')[1];
        //Authorization: 'Bearer TOKEN'
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
        const decodedToken = jwt.verify(token, "dean");
        const{ballotID,positionVotes, initiativeVotes} = req.body;
        username = decodedToken.username;
        result = await bl.castVote(username,ballotID,positionVotes, initiativeVotes);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            res.status(200).json("Vote successfully cast");
        }
        else{
            res.status(400).json("Vote not cast");
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }

});

//gets all soc (if Employee only get ones you can see)
app.get('/societies', async (req,res) => {
    try{
        const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(600).json({
                success: false,
                message: "Error!Token was not provided."
            });
        }//if !token
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        //where anything actually happens lol
        //still need to respond with socties:[]
        result = await bl.getSocieties(username);
        if(result == null){
            res.status(400).json("Unable to get societies");
        }else{
            res.status(200).json(result);
        }
    }catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }//catch
});

//gets all ballots for a society
app.get('/societies/ballots', async (req,res) => {
    try{
        const token =req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(600).json({
                success: false,
                message: "Error!Token was not provided."
            });
        }//if !token
        const decodedToken = jwt.verify(token, "dean");
        username = decodedToken.username;
        //where anything actually happens lol
        // console.log(req);
        socID = req.query.societyID;
        // console.log(socID);
        result = await bl.getAllBallotsForSociety(socID);
        res.status(200).json(result);
    }catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }//catch
});




app.listen(port,()=>{
    console.log("port connected");
})
