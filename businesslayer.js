
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
            { console.log(password);
                return true;
            }
            else
                return false;
            

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

const countCandidateVotes= async(candidateusername, positionID)=>
{
    
    numVotes = await dl.getPositionVotes(positionID,candidateusername);
    return numVotes[0].vote_count;   
}


const viewResults= async(ballotID)=>
{
   positions =[]; // get all positions part of the ballot 
   positions.array.forEach(position => 
   {
    candidates = dl.getCandidates(position.positionID,0);
    candidates.forEach((candidate)=>
    {
        numVotes= countCandidateVotes(candidate.username,poition.positionID)

    });

   }); 


}


































// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists
}

