const dl = require("./datalayer");

var loggedInUsers = [];

const userExists = async (username, password) => {
  try {
    user = await dl.getUser(username);
    if (user.length != 0) {
      if (user[0].passwordhash == password) {
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
      activeElections,
      loggedInUserArrayLength,
      averageQueryTime
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
  getSystemStatistics
};
