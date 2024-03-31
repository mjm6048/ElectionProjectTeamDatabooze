
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'siteinfo',
  password: 'student',
  port: 5432,
})


// Get User. accepts username and returns: username, firstName, lastName, passwordHash, and roleID 
const  getUser = async(username)=> {
  try{
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows;
  }catch(error){
    console.log(error);
    throw error;
  }
}
//Get Members and Officers. accepts societyID.
const getMembersandOfficers = async(societyID)=>{
  try{
    const result = await pool.query('SELECT * FROM users JOIN users_society ON users.username WHERE users_society.societyID = $1 AND users.roleID IN (1,2)', [societyID]);
    return result.rows;
  }catch(error){
    console.log(error);
    throw error;
  }
}
//Get Candidates. accpets positionID, and username.
const  getCandidates = async(positionID, username)=> {
  try{
    if(positionID !== 0){
      const result = await pool.query('SELECT * FROM candidate WHERE positionID = $1', [positionID]);
    }else{
      const result = await pool.query('SELECT * FROM candidate WHERE username = $1', [username]);
    }
    return result.rows;
  }
  catch(error){
    console.log(error);
    throw error;
  }
}

const getVote=async(VoteID)=> {
  const result = await pool.query('SELECT * FROM votes WHERE voteID = $1', [voteID]);
}

const countPositionVotes= async(positonID,candidateID)=> {
  try{
    {
      if(candidateID == 0){
        const result = await pool.query(`SELECT COUNT(*) AS vote_count FROM votes WHERE votes->>'VoteType' = 'ballot' AND (votes->>'BallotID')::int = $1`, [positonID]);
      }else{
        const result = await pool.query(`SELECT COUNT(*) AS vote_count FROM votes WHERE votes->>'VoteType' = 'ballot' AND (votes->>'BallotID')::int = $1 AND (votes->>'VotedFor')::int = $2`, [positonID,candidateID]);
      }
    }
    return result.rows;
  }catch(error){
      console.log(error);
      throw error;
    }
}

const getInititativeVotes= async(voteID,initiativeID)=> {
  try{
    if(VoteID!==0){
      const result = await pool.query('SELECT * FROM votes WHERE voteID = $1', [voteID]);
    }else{
      const result = await pool.query(`SELECT * FROM votes WHERE votes->>'VoteType' = 'inititative' AND (votes->>'BallotID')::int = $1`, [initiativeID]);
    } 
    return result.rows;
  }catch(error){
    console.log(error);
    throw error;
  }
}
//Get Ballot Info. accepts ballotID. returns associated rows
const getBallotInfo= async(ballotID)=> {
  try{
    //finds out if the ballot being searched for is initative or position
    const result = await pool.query('SELECT * FROM initiative_ballots WHERE ballotID = $1', [ballotID]);
    //if ballot is not found in initiative_ballots table, query position_ballots and return
    if(result.rows == null){
      const result = await pool.query('SELECT * FROM position_ballots WHERE ballotID = $1', [ballotID]);
      return result.rows
    }
    //if ballotID is in initiative_ballots table, return those rows
    return result.rows
  }catch(error){
    console.log(error);
    throw error;
  }
}










// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    getUser,
    getCandidates,
    getMembersandOfficers,
    getVote,
    countPositionVotes,
    getInititativeVotes,
    getBallotInfo
}