
const dl = require('./datalayer');
const {createHash } = require('crypto');
var loggedInUsers =[];


const userExists = async(username,password)=>
{
    // hashedpassword = createHash('sha256').update(password)
    // console.log(hashedpassword);
  
   
    try
    {
       var user = await dl.getUser(username);

        if(user.length !=0)
        {   var hash = createHash('sha256').update(password).digest('hex');
            console.log(hash);
            //if (user[0].passwordhash == password)
            // uncomment below and delete above when you've figured out what password was used -Netra
            if (hash == user[0].passwordhash)
            { 
                
                loggedInUsers.push(user[0]);
                if(user[0].roleid <3)
                {
                    var result = await dl.getActiveBallots(user[0].societyid);
                    //console.log(result);
                }
                // return members of society and all ballots that havent started if role>=3
               
                
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



// const castVote= async(username,voteType,itemID,votedFor, writein)=>
// {
//     try
//     {  
//     // user validation
//         var  user = loggedInUsers.find(users => users.username === username);
//         //validate user
//         if(user == null || user.roleid>2)
//         { 
//             return 0;
//         }
//         var ballot = await dl.getBallotAndSociety(itemID,0);
//         if (ballot === null) {
//             return -1;
//           }
//         // switch current date once data with active elections loaded
//         //validate ballot
//         var current = Date.parse('2001-08-21');
//         if (ballot[0].societyID==user.societyID && Date.parse((ballot[0]).enddate)>current && Date.parse(ballot[0].startdate) < current)
//         {
//         //validate candidate 
//             var candidateID = parseInt(votedFor);
//             var candidate = await dl.getCandidates(0,candidateID);
//             if (candidate == null || candidate[0].itemid != itemID) {
//                 return -2;
//             }
//             var cast = await dl.castVote(username,voteType,itemID,votedFor, writein);
//             console.log(cast);
//             return cast;
//         }
//         else
//         {
//             return -1;
//         }
        
            
//     }
    
//     catch(error)
//     {
//         console.log(error);
//         throw error;
//     }
// }

const castVote = async(username,ballotID, positionvotes, initiativevotes) =>
{

    try
    {
        var user = loggedInUsers.find(users => users.username== username);
      
        if (user == null || user.roleid >2)
        {
            return 0;
        }
        var ballot = await dl.getBallotAndSociety(0,ballotID);
        var current = Date.parse('2001-08-21');
        if (ballot === null) {
            return -1;
          }
      
          if (ballot[0].societyID==user.societyID && Date.parse((ballot[0]).enddate)>current && Date.parse(ballot[0].startdate) < current)
        {
            // check if ballot votes has already been casted from ballots_users
            var cast = await dl.castVote(username,positionvotes, initiativevotes);
            
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



// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists,
    castVote,
    getResults,
    getStatus
}

