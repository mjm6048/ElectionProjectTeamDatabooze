
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'databooze',
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

const getCandidates = async(itemID, candidateID)=> {
    const client = await pool.connect();
    try{
    if(itemID !== 0){
        var result = await client.query('SELECT * FROM candidate WHERE itemID = $1', [itemID]);
    }
    else
    {
        var result = await client.query('SELECT * FROM candidate WHERE candidateID = $1', [candidateID]);
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
    const result = await client.query('SELECT bi.ballotid,b.* FROM(SELECT ballotid FROM ballotItem WHERE itemID=($1)) as bi JOIN ballots AS b ON bi.ballotid = b.ballotid',[itemID]);
    return result.rows;
    }
   else{
    const result = await client.query('SELECT * FROM ballots WHERE ballotID=($1)',[ballotID]);
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
    const result = await client.query('SELECT DISTINCT sp1.ID, sp1.Type, sp2.voted, sp2.highest_vote_count from (select * from get_items_in_ballot($1)) as sp1 JOIN (select * from count_votes()) as sp2 ON sp1.ID = sp2.ID ORDER BY sp1.ID;', [ballotID]);
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

const getAllSocieties = async()=>
{
  const client = await pool.connect();
  try
  {
    const result = await client.query('SELECT * FROM society;');
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

//returns null if no ballot found, return rows if found, throws if error
const getBallot = async(ballotID)=>{
  const client = await pool.connect();
  try{
    const result = await client.query('SELECT * FROM ballots WHERE ballotID = $1', [ballotID]);
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

const getBallotItem = async(itemID)=>{
  const client = await pool.connect();
  try{
    const result = await client.query('SELECT * FROM ballotItem WHERE itemID = $1', [itemID]);
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

const candidateExist = async(candidateID)=>{
  const client = await pool.connect();
  try{
    const result = await client.query('SELECT * FROM Candidate WHERE candidateID = $1', [candidateID]);
    if(result.rows.length === 0){
      return false;
    }else{
      return true;
    }
  }catch(error){
    console.log(error);
    throw error;
  }
}

const CreateEditCandidate = async(candidateID,firstName,lastName,itemID,titles,description,photo)=>{
  const client = await pool.connect();
  //does the candidate exist?
  try{
    if(candidateExist()){
      const result = await client.query('INSERT INTO Candidate (candidateID,firstname,lastname,itemID,titles,description,photo) VALUES($1,$2,$3,$4,$5,$6,$7)', [candidateID,firstName,lastName,itemID,titles,description,photo]);
      return result.rows;
    }else{
      return null;
    }
  }catch(error){
    console.log(error);
    throw error;
  }
}

const editUser = async(username, password, name, roleID)=>{
  const client = await pool.connect();
  try{
    const result = await client.query("UPDATE users SET username = '$1', password = '$2', name = '$3', roleID = '$4' WHERE username = '$1'", [username, password, name, roleID]);
    return result.rowCount;
  }catch(error){
    console.log(error);
    throw error;
  }
}

const createUser = async(username, password, name, roleID)=>{
  const client = await pool.connect();
  try{
    const result = await client.query('INSERT INTO users (username, password, name, roleID) VALUES ($1,$2,$3,$4)', [username,password,name,roleID]);
    return result.rows;
  }catch(error){
    console.log(error);
    throw error;
  }
}

const getSociety = async(societyID)=>{
  const client = await pool.connect();
  try
  {
    const result = await client.query('SELECT * FROM society WHERE societyID=($1);',[societyID]);
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

const createNewSociety = async(societyID, societyName, societyDescription)=>{
  const client = await pool.connect()

  try {
    await client.query('BEGIN');
    var result = await client.query('INSERT INTO society(societyID,societyName,societyDescription) VALUES($1,$2,$3);',[societyID,societyName,societyDescription]);
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

//for a provided socID get ballots.
const getBallotForSociety = async(societyID)=>{
  const client = await pool.connect();
  try{
    var result = await client.query("SELECT * FROM Ballots WHERE societyID = $1;",[societyID]);
    return result.rows;
  }catch(error){
    console.log(error);
    throw(error);
  }
}

// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    getUser,
    getCandidates,
    getMembersandOfficers,
    castVote,
    getResults,
    getBallotAndSociety,
    getStatus,
    createNewSociety,
    getSociety,
    getAllSocieties,
    getBallot,
    getBallotItem,
    candidateExist,
    CreateEditCandidate,
    editUser,
    createUser,
    getBallotForSociety,
}
