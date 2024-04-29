const { query } = require('express');
const format = require('pg-format');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  database: 'databooze',
  password:'netra',
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

const getBallots=async(societyID, username)=>
{  const client = await pool.connect();
  try{
    const result = await client.query('select * from GetBallotsWithStatus($1,$2)',[username,societyID]);
    if(result.rows.length === 0){
      return null;
    }else{
      return result.rows;
    }
  }catch(error){
    console.log(error);
    throw error;
  }

  finally
  {
    client.release();
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

const getCandidates = async(ballotID)=> {
    const client = await pool.connect();
    try{
    
        var result = await client.query('SELECT c.*,ci.itemid FROM candidate c JOIN candidate_items ci on c.candidateid = ci.candidateid JOIN ballotitem b ON ci.itemID = b.itemID WHERE b.ballotID = ($1)', [ballotID]);
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
          const positionResult = await client.query('select * from materialized_ballotitem_positionvotes where ballotid=($1);', [ballotID]);
          const initiativeResult= await client.query('select * from materialized_ballotitem_initiativevotes where ballotid=($1);', [ballotID]);
          console.log(positionResult.rows);
          console.log(initiativeResult.rows);
          return positionResult.rows.concat(initiativeResult.rows);
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
    const result1 = await client.query('SELECT * from materialized_votes_username_ballotid where ballotid=($1);', [ballotID]);
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
const castVote = async(username,positionvotes, initiativevotes,ballotID)=>
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
  await client.query('SET audit.user_id ='+username);
   await client.query('BEGIN');
   var eligible =  await client.query('SELECT * FROM ballots_users where username = ($1) and ballotid =($2)',[username,ballotID]);
   if(eligible.rows.length == 0)
   {
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
  else
  {
    return(-1);
  }
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

const updateVotedBallots= async(username,ballotID)=>
{
  const client = await pool.connect();
  try
  {
    const result = await client.query('INSERT INTO ballots_users values(($1),($2))',[ballotID,username]);
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
const getAssignedSocieties = async (username) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT society.societyID, society.societyName, society.societyDescription FROM users_society JOIN society ON users_society.societyID = society.societyID WHERE users_society.username = $1",
      [username]
    );
    //return societyID, societyName, societyDescription
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    //try catch
    client.release();
  }
}; //getAssignedSocieties

//get all societies
const getAllSocieties = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT societyID, societyName, societyDescription FROM society"
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    //try catch
    client.release();
  }
}; //getAllSocieties

const createUser = async (
  username,
  firstName,
  lastName,
  roleID,
  passwordHash,
  societyIDs
) => {
  const client = await pool.connect();
  try {
    console.log("in dl");
    await client.query("BEGIN"); // Start a transaction

    // Insert or update user
    const userQuery = `
      INSERT INTO users (username, firstname, lastname, roleid, passwordhash)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const userValues = [username, firstName, lastName, roleID, passwordHash];
    await client.query(userQuery, userValues);

    // Check and insert/update user_society for each societyID
    for (const societyID of societyIDs) {
      const societyCheckQuery = `
        SELECT 1 FROM society WHERE societyid = $1;
      `;
      const societyCheckValues = [societyID];
      const societyCheckResult = await client.query(
        societyCheckQuery,
        societyCheckValues
      );

      if (societyCheckResult.rowCount === 0) {
        throw new Error(`Society with ID ${societyID} does not exist.`);
      }

      const societyQuery = `
        INSERT INTO users_society (username, societyid)
        VALUES ($1, $2)
      `;
      const societyValues = [username, societyID];
      await client.query(societyQuery, societyValues);
    }

    await client.query("COMMIT"); // Commit the transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};
const createSociety = async (societyName, societyDescription) => {
  console.log("in dl");
  const query = `
    INSERT INTO Society (societyName, societyDescription)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [societyName, societyDescription];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const editBallot= async(username,ballotid,ballotname,startdate,enddate,societyid)=>
{
  const client = await pool.connect();
  try{
    await client.query('SET audit.user_id ='+username);
    await client.query('BEGIN');
    const result = await client.query('UPDATE ballots SET ballotname = ($1), startdate = ($2),enddate = ($3), societyid=($4) WHERE ballotid = ($5);',[ballotname,startdate,enddate,societyid,ballotid])
    await client.query('COMMIT');
    return result.rowCount;
    
  }catch(error){
    console.log(error);
    await client.query('ROLLBACK');
    throw error;
  }

  finally
  {
    client.release();
  }
}

const createBallot= async(username,ballotid,ballotname,startdate,enddate,societyid)=>
{
  const client = await pool.connect();
  try{
    await client.query('SET audit.user_id ='+username);
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO ballots values($1,$2,$3,$4,$5)',[ballotid,ballotname,startdate,enddate,societyid])
    await client.query('COMMIT');
   
    return result.rowCount;
    
  }catch(error){
    console.log(error);
    await client.query('ROLLBACK');
    throw error;
  }

  finally
  {
    client.release();
  }
}
const createBallotItem = async(username,ballotid,itemtype,itemid,itemname,numvotesallowed,maxnumcandidates)=>
{
  const client = await pool.connect();
  try{
    await client.query('SET audit.user_id ='+username);
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO ballotitem values($1,$2,$3,$4,$5,$6)',[itemid,itemname,itemtype,numvotesallowed,ballotid,maxnumcandidates])
    await client.query('COMMIT');
   
    return result.rowCount;
    
  }catch(error){
    console.log(error);
    await client.query('ROLLBACK');
    throw error;
  }

  finally
  {
    client.release();
  }
}

const addCandidate=async(username,itemid,candidateid)=>
{
  const client = await pool.connect();
  try{
    await client.query('SET audit.user_id ='+username);
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO candidate_items values($1,$2)',[candidateid,itemid])
    await client.query('COMMIT');
   
    return result.rowCount;
    
  }catch(error){
    console.log(error);
    await client.query('ROLLBACK');
    throw error;
  }

  finally
  {
    client.release();
  }
}

const createCandidate= async(username,candidateid,firstname,lastname,titles,description,photo)=>
{
  const client = await pool.connect();
  try{
    await client.query('SET audit.user_id ='+username);
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO candidate values($1,$2,$3,$4,$5,$6)',[candidateid,firstname,lastname,titles,description,photo])
    await client.query('COMMIT');
   
    return result.rowCount;
    
  }catch(error){
    console.log(error);
    await client.query('ROLLBACK');
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
    getStatus,
    updateVotedBallots,
    getAllSocieties,
    getAssignedSocieties,
    createUser,
    createSociety,
    editBallot,
    createBallot,
    createBallotItem,
    addCandidate,
    createCandidate
}
