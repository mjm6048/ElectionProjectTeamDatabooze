
const dl = require('./datalayer');

var loggedInUsers =[];
loggedInUsers.push({
    username: 'applebreeze16',
    firstname: 'Brandon',
    lastname: 'Holland',
    passwordhash: '1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b',
    roleid: 2,
    societyid: 1
  },
  {
    username: 'starbreeze10',
    firstname: 'Judith',
    lastname: 'King',
    passwordhash: '1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b',
    roleid: 1,
    societyid: 12
  }
  
  )


const userExists = async(username,password)=>
{
    // hashedpassword = createHash('sha256').update(password)
    // console.log(hashedpassword);
    try
    {
        user = await dl.getUser(username);
        if(user.length !=0)
        {
            
            if (user[0].passwordhash == password)
            // uncomment below and delete above when you've figured out what password was used -Netra
            // if (user[0].passwordhash == hashedpassword)
            { 
                
                loggedInUsers.push(user[0]);
                console.log(loggedInUsers);
                return true;
            }
            else
            {
                return false;
            }
            

        }
        else
            return false;
    }
    
catch(error)
{
    console.log(error);
    throw error;
}

}



const castVote= async(username,voteType,itemID,votedFor, writein)=>
{
    try
    {  
    // user validation
        var  user = loggedInUsers.find(Users => Users.username === username);
        //validate user
        if(user == null || user.roleid>2)
        { 
            return 0;
        }
        var ballot = await dl.getBallotAndSociety(itemID,0);
        if (ballot === null) {
            return -1;
          }
        // switch current date once data with active elections loaded
        //validate ballot
        var current = Date.parse('2001-08-21');
        if (ballot[0].societyID==user.societyID && Date.parse((ballot[0]).enddate)>current && Date.parse(ballot[0].startdate) < current)
        {
        //validate candidate 
            var candidateID = parseInt(votedFor);
            var candidate = await dl.getCandidates(0,candidateID);
            if (candidate == null || candidate[0].itemid != itemID) {
                return -2;
            }
            var cast = await dl.castVote(username,voteType,itemID,votedFor, writein);
            console.log(cast);
            return cast;
        }
        else
        {
            return -1;
        }
        
            
    }
    
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

const getResults= async(ballotID, username)=>
{
  
    try
    {
        var user = loggedInUsers.find(users => users.username== username);
      
        if (user == null || user.roleid <2)
        {
            return 0;
        }
        var ballot = await dl.getBallotAndSociety(0,ballotID);
        var ballot = await dl.getBallotAndSociety(0,ballotID);
        var current = new Date();
        if (ballot === null) {
            return -1;
          }
        if ((ballot[0].societyid === user.societyid)&& Date.parse(ballot[0].enddate)<current)
        {
            var results = await dl.getResults(ballotID);
            var status = await dl.getStatus(ballotID);
            var report = {
                'result':results,
                'status':status
            }
            return report;
        }
        else
        {
            return -1;
        }
     
    }
    
    catch(error)
    {
        console.log(error);
        throw error;
    }
    
}
const getStatus=async(ballotID,username)=>
{
    try
    {   var user = loggedInUsers.find(users => users.username== username);
        if (user == null || user.roleid <2)
        {
            return 0;
        }
        var ballot = await dl.getBallotAndSociety(0,ballotID);
        if (ballot === null) {
            return -1;
          }
        //validate ballot
        var current = new Date()
        if (ballot[0].societyID==user.societyID && Date.parse(ballot[0].startdate) <= current)
        {
            var results = await dl.getStatus(ballotID);
            return results;
        }
        else
        {
            return -1;
        }

    }
            
    
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

const BallotExists = async(ballotID)=>{
    try{
        if(dl.getBallot()){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
}

const getBallot = async(ballotID)=>{
    try{
        return dl.getBallot();
    }catch(error){
        console.log(error);
    }
}
//Retrieve information about all users or users from a specific society
const getSocietyUsers = async(societyID)=>{
    try{
        return dl.getMembersandOfficers(societyID);
    }catch(error){
        console.log(error);
    }
}

const createEditUser = async(username, password, name, roleID)=>{
    try{
        //validate username
        //validate name
        //validate roleID
        if(userExists(username, password)){
            return dl.editUser(username, password, name, roleID);
        }else{
            return dl.createUser(username, password, name, roleID);
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}
const getAllSocieties = async()=>{
    try{
        if(dl.getBallot()){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};

const getSociety = async(societyID)=>{
    try{
        if(dl.getSociety(societyID)){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};

const createNewSociety = async(societyID, societyName, societyDescription)=>
{
    try{
        if(dl.createNewSociety(societyID, societyName, societyDescription)){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
        throw error;
    }
}






























// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists,
    castVote,
    getResults,
    getStatus,
    getBallot,
    BallotExists,
    getSocietyUsers,
    createEditUser,
    getStatus
}

