
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  database: 'databooze',
  password: 'netra',
  port: 5432,
})


// Get User
const getUser = async(username)=> {
  const client = await pool.connect();
  try
  {

      const result = await client.query('SELECT users.*, us.societyID FROM users INNER JOIN users_society us ON users.username = us.username WHERE users.username = $1', [username]);
    
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



 const castVote = async(username,voteType,itemID,votedFor, writein)=>
 {
  
  const client = await pool.connect()
 
  try {
    await client.query('BEGIN');
    var result = await client.query('INSERT INTO votes(votetype,itemid,votedfor,writein,username) VALUES($1,$2,$3,$4,$5);',[voteType,itemID,votedFor,writein,username]);
    await client.query('COMMIT');
    return (result.rowCount);
  } 

  catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } 
  finally {
    client.release()
  }

}


const getBallotAndSociety= async(itemID,ballotID) => 
{
  const client = await pool.connect();
  try
  {if(itemID!=0)
    {
    const result = await client.query('SELECT bi.ballotid,b.societyID FROM(SELECT ballotid FROM ballotItem WHERE itemID=($1)) as bi JOIN ballots AS b ON bi.ballotid = b.ballotid',[itemID]);
    return result.rows;
    }
   else{
    const result = await client.query('SELECT ballotid, societyID FROM ballots WHERE ballotID=($1)',[ballotID]);
    return result.rows;
   }
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
const getResults = async(ballotID)=>
{
  const client = await pool.connect();
  try
  {
    const result = await client.query('SELECT DISTINCT sp1.ID, sp1.Type, sp2.votedfor, sp2.vote_count from (select * from get_items_in_ballot($1)) as sp1 JOIN (select * from highest_votes()) as sp2 ON sp1.ID = sp2.itemID;', [ballotID]);
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








// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    getUser,
    getCandidates,
    getMembersandOfficers,
    castVote,
    getResults,
    getBallotAndSociety
}
