const jwt = require("jsonwebtoken");
const dl = require("./datalayer");

const userExists = async (username, password) => {
  // hashedpassword = createHash('sha256').update(password)
  // console.log(hashedpassword);
  try {
    console.log("I'm am here.");
    user = await dl.getUser(username);
    console.log(user);
    if (user.length != 0) {
      if (user[0].passwordhash == password) {
        loginUser(username);
        const token = generateToken(user[0]);

        // uncomment below and delete above when you've figured out what password was used -Netra
        // if (user[0].passwordhash == hashedpassword)
        console.log(password);
        return { user: user[0], token };
      } else return null;
    } else return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateToken = (user) => {
  const token = jwt.sign(
    {
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

// const countCandidateVotes= async(candidateusername, positionID)=>
// {

//     numVotes = await dl.getPositionVotes(positionID,candidateusername);
//     return numVotes[0].vote_count;
// }

const generateSocietyStatistics = async (societyID) => {
  try {
    if (!Number.isInteger(societyID) || societyID <= 0) {
      throw new Error(
        "Invalid societyID. SocietyID must be a positive integer."
      );
    }

    const [ballotCounts, avgMembers, members] = await Promise.all([
      getBallotCountPerSociety(societyID),
      getavgMembers(societyID),
      getMembersOfSociety(societyID)
    ]);

    const numOfBallots =
      ballotCounts[0].activeBallots + ballotCounts[0].inactiveBallots;
    const numOfMembers = members.length;
    const avgMembersPerElection = avgMembers;

    const report = {
      numOfBallots,
      numOfMembers,
      avgMembersPerElection,
      ballotID: ballotCounts[0].ballotID,
      avgMembers
    };

    return report;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error generating society statistics report:", error);
    throw error;
  }
};

const getSystemStatistics = async () => {
  try {
    const averageQueryTime = await calculateAverageQueryTime();
    const activeElections = await getNumberOfActiveElections();
    const loggedInUserArrayLength = loggedInUsers.length; // Example value

    const systemStatistics = {
      averageQueryTime,
      activeElections,
      loggedInUserArrayLength
    };

    return systemStatistics;
  } catch (error) {
    console.error("Error retrieving system statistics:", error);
    throw error;
  }
};
let loggedInUsers = [];
function loginUser(username) {
  loggedInUsers.push(username);
}

// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
  userExists,
  generateSocietyStatistics,
  generateToken,
  getSystemStatistics
};
