const dl = require("./datalayer");

var loggedInUsers = [];
loggedInUsers.push({
  username: "starbreeze10",
  firstname: "Judith",
  lastname: "King",
  passwordhash:
    "1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b",
  roleid: 1,
  societyid: 12
});

const userExists = async (username, password) => {
  // hashedpassword = createHash('sha256').update(password)
  // console.log(hashedpassword);
  console.log("buisness layer enetered");
  try {
    user = await dl.getUser(username);
    console.log(user);
    if (user.length != 0) {
      console.log("length not 0");
      if (user[0].passwordhash == password) {
        console.log("same pass");
        // uncomment below and delete above when you've figured out what password was used -Netra
        // if (user[0].passwordhash == hashedpassword)
        loggedInUsers.push(user[0]);
        console.log(loggedInUsers);
        return true;
      } else {
        return false;
      }
    } else return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const countCandidateVotes= async(candidateusername, positionID)=>
// {

//     numVotes = await dl.getPositionVotes(positionID,candidateusername);
//     return numVotes[0].vote_count;
// }

const viewResults = async (ballotID) => {
  positions = []; // get all positions part of the ballot
  positions.array.forEach((position) => {
    candidates = dl.getCandidates(position.positionID, 0);
    candidates.forEach((candidate) => {
      numVotes = countCandidateVotes(candidate.username, poition.positionID);
    });
  });
};
const generateSocietyStatistics = async (societyID) => {
  try {
    console.log("inside the function");
    console.log(societyID);

    const ballotCounts = await dl.getBallotCountPerSociety(societyID);
    const avgMembers = await dl.getavgMembers(societyID);
    const members = await dl.getMembersOfSociety(societyID);

    const numOfBallots =
      ballotCounts[0].activeballots + ballotCounts[0].inactiveballots;

    const report = {
      numOfBallots,
      members,
      avgMembers
    };

    return report;
  } catch (error) {
    console.error("Error generating society statistics report:", error);
    throw error;
  }
};

const getSystemStatistics = async () => {
  try {
    const averageQueryTime = await dl.calculateAverageQueryTime();
    const activeElections = await dl.getNumberOfActiveElections();
    const loggedInUserArrayLength = loggedInUsers.length;

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

// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
  userExists,
  generateSocietyStatistics,
  getSystemStatistics,
  viewResults
};
