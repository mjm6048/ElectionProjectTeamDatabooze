const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "databooze",
  password: "password",
  port: 5432
});

// Get Users
const getUser = async (username) => {
  console.log("data layer enter");
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT users.*, us.societyID FROM users INNER JOIN users_society us ON users.username = us.username WHERE users.username = $1",
      [username]
    );
    console.log(result);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

const getMembersandOfficers = async (societyID) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users JOIN users_society ON users.username WHERE users_society.societyID = $1 AND users.roleID IN (1,2)",
      [societyID]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

const calculateAverageQueryTime = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM calculate_average_query_time()"
    );

    return result.rows;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  } finally {
    client.release();
  }
};

const getNumberOfActiveElections = async () => {
  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT GetNumberOfActiveElections() AS active_elections_count"
    );

    client.release();

    return result.rows;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  }
};

const getBallotCountPerSociety = async (societyID) => {
  const client = await pool.connect();
  try {
    console.log("inside data layer");
    const result = await client.query(
      "SELECT * FROM getBallotCountPerSociety($1)",
      [societyID]
    );
    return result.rows;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
  }
};

const getavgMembers = async (societyID) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT GetAverageMembersVotingPerElection($1) AS average_members_voting",
      [societyID]
    );

    const averageMembersVoting = rows[0].average_members_voting;

    return averageMembersVoting;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
  }
};

const getMembersOfSociety = async (societyID) => {
  try {
    const client = await pool.connect();

    const { rows } = await client.query(
      "SELECT * FROM GetMembersOfSociety($1)",
      [societyID]
    );

    client.release();
    return rows;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  }
};

// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
  getUser,
  getMembersandOfficers,
  getavgMembers,
  getBallotCountPerSociety,
  getMembersOfSociety,
  getNumberOfActiveElections,
  calculateAverageQueryTime
};
