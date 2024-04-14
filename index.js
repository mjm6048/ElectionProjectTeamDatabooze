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


app.post("/users/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        check = await bl.userExists(username, password);
        console.log(check);
        if (check) {
            res.status(200).json("Login successful");
        }
        else {
            res.status(401).json("Invalid credentials");
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
})

// Get a list of all societies returned in JSON by querying the endpoint.
app.get('/societies', async (req, res) => {
    // const { societies } = req.query;
    try {
        result = await bl.getAllSocieties();
        if (result) {
            /*
                Should return an array of all societies in this format:
                Int: societyID
                String: societyName
                String: societyDescription
            */
            res.status(200).json(result);
        }
        else {
            res.status(400).json("No societies found!");
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

// Get a specific society from the list of societies by specifying a societyID.
app.get('/societies/:societyID', async (req, res) => {
    const { societyID } = req.query;
    try {
        result = await bl.getSociety(societyID);
        if (result) {
            /*
                Should return:
                Int: societyID
                String: societyName
                String: societyDescription
            */
            res.status(200).json(result);
        }
        else {
            res.status(400).json("No societies found!");
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

// Create a society given societyID, societyName, and societyDescription.
app.post("/societies", async (req, res) => {
    const { societyID, societyName, societyDescription } = req.body;
    try {
        let create = await bl.createNewSociety(societyID, societyName, societyDescription);
        if (create) {
            /*
                Format should send:
                Int: societyID
                String: societyName
                String: societyDescription
            */
            res.status(200).json("New society successfully created");
        }
        else {
            res.status(400).json("Invalid Society");
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get('/results/:ballotID', async (req, res) => {
    const { ballotID } = req.query;
    try {

        result = await bl.getResults(ballotID);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json("Invalid BallotID");
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.post("/votes", async (req, res) => {
    const { username, voteType, itemID, votedFor, writein } = req.body;
    try {

        cast = await bl.castVote(username, voteType, itemID, votedFor, writein);
        if (cast) {
            res.status(200).json("Vote successfully casted");
        }
        else {
            res.status(400).json("Invalid Vote");
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get('/status/:ballotID', async (req, res) => {
    const { ballotID } = req.query;
    try {

        result = await bl.getStatus(ballotID);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json("Invalid BallotID");
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});
console.log(bl.castVote('applebreeze16', 'position', 2, '123', false));
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
        res.status(200).json(bl.getSocietyUsers(societyID));
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
app.listen(port, () => {
    console.log("port connected");
});
