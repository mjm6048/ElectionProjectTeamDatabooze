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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ error: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, "dean");
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  return next();
};

app.post("/users/login",async(req,res)=>{

    const{username,password}=req.body;
    try{
        
        roleid = await bl.userExists(username, password);
        if(roleid!=-1){
            const token = jwt.sign({ username }, secretKey , {
                expiresIn: "5h"
              });
            res.status(200).json({token,roleid});
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
        else
        {
            res.status(200).json(result);
        }
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
            else{
            res.status(200).json(result);
            }
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
            else
            {
                res.status(200).json(result);
            }
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
            else
            {
             res.status(200).json(result);
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
	    const token = req.headers.authorization.split(' ')[1];
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
        const{ballotid,positionVotes, initiativeVotes} = req.body;
        username = decodedToken.username;
        result = await bl.castVote(username,ballotid,positionVotes, initiativeVotes);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot, vote not cast");
            }
            else
                { 
                    res.status(200).json("Vote successfully cast");
            }
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
app.get("/users", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(600).json({
        success: false,
        message: "Error!Token was not provided."
      });
    } //if !token
    const decodedToken = jwt.verify(token, "dean");
    username = decodedToken.username;
    const {societyID} = req.query;
    result = await bl.getMembersOfSociety(societyID);
    if (result == null) {
      res.status(400).json("Unable to get societies");
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  } //catch
});

app.get("/societies", async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(600).json({
          success: false,
          message: "Error!Token was not provided."
        });
      } //if !token
      const decodedToken = jwt.verify(token, "dean");
      username = decodedToken.username;
      //where anything actually happens lol
      result = await bl.getSocieties(username);
      if (result == null) {
        res.status(400).json("Unable to get societies");
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json("Internal server error");
    } //catch
  });
 
app.post('/ballots', async (req, res) => {
    try
    {  
	    const token = req.headers.authorization.split(' ')[1];
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
        const{ballotid,ballotname,startdate,enddate,societyid,edit} = req.body;
        username = decodedToken.username;
        result = await bl.createOrEditBallot(username,ballotid,ballotname,startdate,enddate,societyid,edit);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            else
                { 
                    res.status(200).json("Ballot modification successfull");
            }
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

app.post("/users/:username", verifyToken, async (req, res) => {
  try {
    console.log("in index.js");
    const { username } = req.params;
    const { firstName, lastName, password, societyIDs, roleID } = req.body;

    if (!firstName || !lastName || !password || !societyIDs || !roleID) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const usernameExists = await bl.usernameExists(username);
    if (usernameExists) {
      await bl.editUser(
        username,
        firstName,
        lastName,
        password,
        societyIDs,
        roleID
      );
    } else {
      await bl.createUser(
        username,
        firstName,
        lastName,
        password,
        societyIDs,
        roleID
      );
    }

    res.status(201).json({ message: "User successfully created or edited" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/societies", verifyToken, async (req, res) => {
  try {
    const { societyName, societyDescription } = req.body;
    const newSociety = await bl.createNewSociety(
      societyName,
      societyDescription
    );

    console.log("in index.js");
    console.log(societyName);
    console.log(societyDescription);

    res.status(201).json(newSociety);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/society-statistics", verifyToken, async (req, res) => {
  const societyID = parseInt(req.query.societyID);

  try {
    console.log(societyID);
    const report = await bl.generateSocietyStatistics(societyID);
    console.log("in api");
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating society statistics report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/system-statistics", verifyToken, async (req, res) => {
  try {
    const report = await bl.getSystemStatistics();
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating system statistics report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  app.post('/ballotitems', async (req, res) => {
    try
    {  
	    const token = req.headers.authorization.split(' ')[1];
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
        const{ballotid,itemtype,itemid,itemname,numvotesallowed,maxnumcandidates} = req.body;
        username = decodedToken.username;
        result = await bl.createBallotItem(username,ballotid,itemtype,itemid,itemname,numvotesallowed,maxnumcandidates);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Invalid ballot");
            }
            else
                { 
                    res.status(200).json("Ballot item created successfully");
            }
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

app.post('/candidate', async (req, res) => {
    try
    {  
	    const token = req.headers.authorization.split(' ')[1];
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
        const{itemid,candidateid} = req.body;
        console.log(req.body);
        username = decodedToken.username;
        result = await bl.addCandidate(username,itemid,candidateid);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Candidate not added");
            }
            else
                { 
                    res.status(200).json("candidate added successfully");
            }
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


app.post('/candidates', async (req, res) => {
    try
    {  
	    const token = req.headers.authorization.split(' ')[1];
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
        const{candidateid,firstname,lastname,titles,description,photo} = req.body;
        console.log(req.body);
        username = decodedToken.username;
        result = await bl.createCandidate(username,candidateid,firstname,lastname,titles,description,photo);
        if(result){
            if(result == -1)
            {
                res.status(401).json("Candidate not added");
            }
            else
                { 
                    res.status(200).json("candidate added successfully");
            }
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
app.listen(port,()=>{
    console.log("port connected");
})
