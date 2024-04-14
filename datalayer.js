const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "databooze",
  password: "password",
  port: 5432
});

// Get User
const getUser = async (username) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT users.*, us.societyID FROM users INNER JOIN users_society us ON users.username = us.username WHERE users.username = $1",
      [username]
    );

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

const getCandidates = async (itemID, candidateID) => {
  const client = await pool.connect();
  try {
    if (itemID !== 0) {
      var result = await client.query(
        "SELECT * FROM candidate WHERE itemID = $1",
        [itemID]
      );
    } else {
      var result = await client.query(
        "SELECT * FROM candidate WHERE candidateID = $1",
        [candidateID]
      );
    }
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

const castVote = async (username, voteType, itemID, votedFor, writein) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    var result = await client.query(
      "INSERT INTO votes(votetype,itemid,votedfor,writein,username) VALUES($1,$2,$3,$4,$5);",
      [voteType, itemID, votedFor, writein, username]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getBallotAndSociety = async (itemID, ballotID) => {
  const client = await pool.connect();
  try {
    if (itemID != 0) {
      const result = await client.query(
        "SELECT bi.ballotid,b.* FROM(SELECT ballotid FROM ballotItem WHERE itemID=($1)) as bi JOIN ballots AS b ON bi.ballotid = b.ballotid",
        [itemID]
      );
      return result.rows;
    } else {
      const result = await client.query(
        "SELECT * FROM ballots WHERE ballotID=($1)",
        [ballotID]
      );
      return result.rows;
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};
const getResults = async (ballotID) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT DISTINCT sp1.ID, sp1.Type, sp2.voted, sp2.highest_vote_count from (select * from get_items_in_ballot($1)) as sp1 JOIN (select * from count_votes()) as sp2 ON sp1.ID = sp2.ID ORDER BY sp1.ID;",
      [ballotID]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
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

const getStatus = async (ballotID) => {
  const client = await pool.connect();
  try {
    const result1 = await client.query(
      "SELECT DISTINCT sp2.username from (select * from get_items_in_ballot($1)) as sp1 JOIN (select * from votes) as sp2 ON sp1.ID = sp2.itemID;",
      [ballotID]
    );
    const result2 = await client.query(
      "SELECT COUNT(users.username) AS user_count FROM ballots JOIN users_society ON users_society.societyID = ballots.societyID JOIN users ON users.username = users_society.username WHERE ballots.ballotid = ($1) AND users.roleid IN (1, 2);",
      [ballotID]
    );
    const result = {
      usernames: result1.rows,
      usernumber: result2.rows[0].user_count
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

const calculateAverageQueryTime = async () => {
  try {
    const client = await pool.connect();

    const { rows } = await client.query(
      "SELECT * FROM calculate_average_query_time()"
    );
    const averageQueryTime = rows[0].calculate_average_query_time;
    return averageQueryTime;
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

    const { rows } = await client.query(
      "SELECT GetNumberOfActiveElections() AS active_elections_count"
    );

    client.release();

    const activeElectionsCount = rows[0].active_elections_count;

    return activeElectionsCount;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  }
};

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
  getavgMembers,
  getBallotCountPerSociety,
  getMembersOfSociety,
  calculateAverageQueryTime,
  getNumberOfActiveElections,
  castVote,
  getResults,
  getBallotAndSociety,
  getStatus
};
