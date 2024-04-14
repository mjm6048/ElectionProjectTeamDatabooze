const dl = require("./datalayer");

const userExists = async (username, password) => {
  // hashedpassword = createHash('sha256').update(password)
  // console.log(hashedpassword);
  try {
    user = await dl.getUser(username);
    if (user.length != 0) {
      console.log(user[0]);

      if (user[0].passwordhash == password) {
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

const generateSocietyStatistics = async (societyID) => {
  try {
    console.log("inside the fn");
    console.log(societyID);

    const ballotCounts = await dl.getBallotCountPerSociety(societyID);
    const avgMembers = await dl.getavgMembers(societyID);
    const members = await dl.getMembersOfSociety(societyID);

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

loggedInUsers.push({
  username: "starbreeze10",
  firstname: "Judith",
  lastname: "King",
  passwordhash:
    "1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b",
  roleid: 1,
  societyid: 12
});

const castVote = async (username, voteType, itemID, votedFor, writein) => {
  try {
    // user validation
    var user = loggedInUsers.find((Users) => Users.username === username);
    //validate user
    if (user == null || user.roleid > 2) {
      return 0;
    }
    var ballot = await dl.getBallotAndSociety(itemID, 0);
    if (ballot === null) {
      return -1;
    }
    // switch current date once data with active elections loaded
    //validate ballot
    var current = Date.parse("2001-08-21");
    if (
      ballot[0].societyID == user.societyID &&
      Date.parse(ballot[0].enddate) > current &&
      Date.parse(ballot[0].startdate) < current
    ) {
      //validate candidate
      var candidateID = parseInt(votedFor);
      var candidate = await dl.getCandidates(0, candidateID);
      if (candidate == null || candidate[0].itemid != itemID) {
        return -2;
      }
      var cast = await dl.castVote(
        username,
        voteType,
        itemID,
        votedFor,
        writein
      );
      console.log(cast);
      return cast;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getResults = async (ballotID, username) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);

    if (user == null || user.roleid < 2) {
      return 0;
    }
    var ballot = await dl.getBallotAndSociety(0, ballotID);
    var ballot = await dl.getBallotAndSociety(0, ballotID);
    var current = new Date();
    if (ballot === null) {
      return -1;
    }
    if (
      ballot[0].societyid === user.societyid &&
      Date.parse(ballot[0].enddate) < current
    ) {
      var results = await dl.getResults(ballotID);
      var status = await dl.getStatus(ballotID);
      var report = {
        result: results,
        status: status
      };
      return report;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getStatus = async (ballotID, username) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);
    if (user == null || user.roleid < 2) {
      return 0;
    }
    var ballot = await dl.getBallotAndSociety(0, ballotID);
    if (ballot === null) {
      return -1;
    }
    //validate ballot
    var current = new Date();
    if (
      ballot[0].societyID == user.societyID &&
      Date.parse(ballot[0].startdate) <= current
    ) {
      var results = await dl.getStatus(ballotID);
      return results;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
  userExists,
  castVote,
  getResults,
  getStatus,
  generateSocietyStatistics,
  getSystemStatistics
};
