
const dl = require('./datalayer');
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
                console.log(password);
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

// const countCandidateVotes= async(candidateusername, positionID)=>
// {
    
//     numVotes = await dl.getPositionVotes(positionID,candidateusername);
//     return numVotes[0].vote_count;   
// }
const castVote= async(username,voteType,itemID,votedFor, writein)=>
{
    try
    {  
    // user validation
        var cast = await dl.castVote(username,voteType,itemID,votedFor, writein);
        console.log(cast);
        return cast;
            
    }
    
    catch(error)
    {
        console.log(error);
        throw error;
    }
}
const getResults= async(ballotID, username, societyID)=>
{
  
    try
    {
       //user validation
        var results = await dl.getResults(ballotID);
        return results;
            
    }
    
    catch(error)
    {
        console.log(error);
        throw error;
    }
    
}

const getStatus=async(ballotID,username,societyID)=>
{
    try
    {
        if (userValidation(username,societyID,2))
        {
            results = await dl.getStatus(ballotID);
            return array.map(results=>results.username);
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
const getSocietyUsers = async(ballotID)=>{
    try{
        return dl.getMembersandOfficers();
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
































// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists,
    castVote,
    getResults,
    getStatus,
    getBallot,
    BallotExists,
    getSocietyUsers,
    createEditUser
}

