
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'databooze',
  port: 5432,
})



 const  getUser = async(username)=> {
try{
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
   
    return result.rows;
}
catch(error)
{   console.log(error);
    throw error;
}

  }













// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    getUser
}