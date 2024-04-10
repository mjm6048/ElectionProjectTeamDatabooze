
const dl = require('./datalayer');

var loggedInUsers =[];
var ballots = [];
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
ballots.push(
    {
        ballotid:1,
        societyid:1,
        startdate:'2000-04-20',
        enddate:'2000-05-21'
    },
    {
        ballotid:2,
        societyid:1,
        startdate:'2001-07-21',
        enddate:'2001-09-12'
    },
    {
        ballotID: 25,
        societyid:1,
        startdate:'2024-10-16',
        enddate:'2001-12-19'
    },
    {
        ballotID: 27, 
        societyID: 2,
        startdate:'2001-01-30',
        enddate:'2001-03-28'
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

// const countCandidateVotes= async(candidateusername, positionID)=>
// {
    
//     numVotes = await dl.getPositionVotes(positionID,candidateusername);
//     return numVotes[0].vote_count;   
// }
const findBallotAndSociety = (itemID,ballotID)=>
{
    var ballot= ballots.find(ballot=>ballot.ballotid == ballotID);
    if(ballot == null)
    {
        return 0;
    }
    return ballot;
}
const castVote= async(username,voteType,itemID,votedFor, writein)=>
{
    try
    {  
    // user validation
       var  user = loggedInUsers.find(Users => Users[username] === username);
        if(user == null)
        {
            return 0;
        }
        if (findBallotAndSociety(itemID,0).societyID==user.societyID)
        {
        var cast = await dl.castVote(username,voteType,itemID,votedFor, writein);
        console.log(cast);
        return cast;
        }
        else
            return -1;
            
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
        var ballot = findBallotAndSociety(0,ballotID);
        var current = new Date();
        if ((ballot.societyid === user.societyid)&& Date.parse(ballot.enddate)<current)
        {
            var results = await dl.getResults(ballotID);
            console.log(results);
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



































// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists,
    castVote,
    getResults
}

