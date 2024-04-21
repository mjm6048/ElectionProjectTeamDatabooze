const { query } = require('express');
const format = require('pg-format');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  database: 'databooze',
  // password:'netra',
  port: 5432,
})



// Get Users
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

const getBallots=async(societyID)=>
{  const client = await pool.connect();
  try{
    const result = await client.query('select * from GetBallotsWithStatus($1)', [societyID]);
    if(result.rows.length === 0){
      return null;
    }else{
      return result.rows;
    }
  }catch(error){
    console.log(error);
    throw error;
  }


}
const getBallotItems=async(ballotID)=>
{  const client = await pool.connect();
  try{
    const result = await client.query('select * from ballotitem where ballotid=($1)', [ballotID]);
    if(result.rows.length === 0){
      return null;
    }else{
      return result.rows;
    }
  }catch(error){
    console.log(error);
    throw error;
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

const getCandidates = async(ballotID)=> {
    const client = await pool.connect();
    try{
    
        var result = await client.query(' SELECT c.* FROM candidate c JOIN ballotitem b ON c.itemID = b.itemID WHERE b.ballotID = ($1)', [ballotID]);
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

      const getResults = async(ballotID)=>
      {
        const client = await pool.connect();
        try
        {
          const result = await client.query('SELECT DISTINCT sp2.ID, sp2.name, sp2.type, sp1.candidateid, sp1.firstname, sp1.lastname, sp1.num_votes from (select * from get_items_in_ballot($1)) as sp2 JOIN (select * from count_position_votes()) as sp1 ON sp2.ID = sp1.ID ORDER BY sp2.ID;', [ballotID]);
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





const getStatus = async(ballotID)=>
{
  const client = await pool.connect();
  try
  {
    const result1 = await client.query('SELECT DISTINCT sp2.username from (select * from get_items_in_ballot($1)) as sp1 JOIN (select * from votes) as sp2 ON sp1.ID = sp2.itemID;', [ballotID]);
    const result2 = await client.query('SELECT COUNT(users.username) AS user_count FROM ballots JOIN users_society ON users_society.societyID = ballots.societyID JOIN users ON users.username = users_society.username WHERE ballots.ballotid = ($1) AND users.roleid IN (1, 2);',[ballotID])
    const result = {
      usernames: result1.rows,
      usernumber:result2.rows[0].user_count
    }
    return result;
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
const castVote = async(username,positionvotes, initiativevotes)=>
{
 
 const client = await pool.connect();
 
 var positionvalues =[];
 for( let i=0; i< positionvotes.length;i++)
 { 
  positionvalues.push([positionvotes[i].voteType,positionvotes[i].itemID,positionvotes[i].candidateID,positionvotes[i].writein,username]);
 }
 var initiativevalues =[];
 for( let i=0; i< initiativevotes.length;i++)
 { 
  initiativevalues.push([initiativevotes[i].voteType,initiativevotes[i].itemID,initiativevotes[i].initiativeResponse,initiativevotes[i].writein,username]);
 }
 try {
  
   await client.query('BEGIN');
   if(positionvalues.length!=0)
   {
    var result = await client.query(format('INSERT INTO votes(votetype,itemid,candidateid,writein,username) VALUES %L',positionvalues));
   }
   if(initiativevalues.length!=0)
   {
     var result = await client.query(format('INSERT INTO votes(votetype,itemid,initiativeresponse,writein,username) VALUES %L',initiativevalues));
   }
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


const getBallot= async(ballotID) => 
{
  const client = await pool.connect();
  try
  {
    const result = await client.query('SELECT * FROM ballots WHERE ballotID=($1)',[ballotID]);
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
    getBallots,
    getBallotItems,
    getCandidates,
    getMembersandOfficers,
    castVote,
    getResults,
    getBallot,
    getStatus
}
