
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'siteinfo',
  password: 'student',
  port: 5432,
})


// Get User
const getUser = async(username)=> {
  const client = await pool.connect();
  try
  {

      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    
      return result.rows;
  }
  catch(error)
  {   console.log(error);
      throw error;
  }
  finally
  {
    client.release();
  }
  }
const getMembersandOfficers = async(societyID)=>
{const client = await pool.connect();
  try
  {
    const result = await client.query('SELECT * FROM users JOIN users_society ON users.username WHERE users_society.societyID = $1 AND users.roleID IN (1,2)', [societyID]);
    return result.rows;
  }
catch(error)
  {   console.log(error);
    throw error;
  }
  finally
  {
    client.release();
  }
}


const getCandidates = async(positionID, username)=> {
  const client = await pool.connect();
    try{
    if(positionID !== 0){
        const result = await client.query('SELECT * FROM candidate WHERE positionID = $1', [positionID]);
    }
    else
    {
      const result = await client.query('SELECT * FROM candidate WHERE username = $1', [username]);
    } 
        return result.rows;
    }
    catch(error)
    {   console.log(error);
        throw error;
    }
    finally
    {
      client.release();
    }
    
      }
  // const getVote=async(VoteID)=>
  // {
  //     const result = await client.query('SELECT * FROM votes WHERE voteID = $1', [voteID]);
  // }
  // const countPositionVotes= async(positonID,candidateID)=>
  // {
  //   try{
     
  //     {
  //     if(candidateID == 0){
  //       const result = await client.query(`SELECT COUNT(*) AS vote_count FROM votes WHERE votes->>'VoteType' = 'ballot' AND (votes->>'BallotID')::int = $1`, [positonID]);
  //     }
  //     else{
  //       const result = await client.query(`SELECT COUNT(*) AS vote_count FROM votes WHERE votes->>'VoteType' = 'ballot' AND (votes->>'BallotID')::int = $1 AND (votes->>'VotedFor')::int = $2`, [positonID,candidateID]);
  //     }
  //   }
  //         return result.rows;
  //     }
  //     catch(error)
  //     {   console.log(error);
  //         throw error;
  //     }
  // }

  // const getInititativeVotes= async(voteID,initiativeID)=>
  // {
  //   try{
  //     if(VoteID!==0)
  //     {
  //       const result = await pool.query('SELECT * FROM votes WHERE voteID = $1', [voteID]);
  //     }
  //     else
  //     {
  //       const result = await pool.query(`SELECT * FROM votes WHERE votes->>'VoteType' = 'inititative' AND (votes->>'BallotID')::int = $1`, [initiativeID]);
  //     } 
    
  //         return result.rows;
  //     }
  //     catch(error)
  //     {   console.log(error);
  //         throw error;
  //     }
  // }










// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    getUser,
    getCandidates,
    getMembersandOfficers,
}