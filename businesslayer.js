const dl = require("./datalayer");
const { createHash } = require("crypto");
var loggedInUsers = [];
var countUser = 0;

const userExists = async (username, password) => {
  // hashedpassword = createHash('sha256').update(password)
  // console.log(hashedpassword);

  try {
    var user = await dl.getUser(username);

    if (user.length != 0) {
      var hash = createHash("sha256").update(password).digest("hex");
      if (hash == user[0].passwordhash) {
        loggedInUsers.push(user[0]);
        countUser++;
        if (user[0].roleid < 3) {
          // return members of society and all ballots that havent started if role>=3
        }

        return user[0].roleid;
      } else {
        return -1;
      }
    } else return -1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getBallots = async (username) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);

    if (user == null) {
      var user = await dl.getUser(username);

      loggedInUsers.push(user[0]);
      user = user[0];
    }
    // check if ballot votes has already been casted from ballots_users

    var ballots = await dl.getBallots(user.societyid, username);
    if (user.roleid == 1) {
      ballots = ballots.filter(
        (ballot) =>
          ballot.ballotstatus === "active" ||
          ballot.ballotstatus === "not started"
      );
    }

    return ballots;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getBallotItems = async (ballotID, username) => {
  try {
    var ballot = await dl.getBallot(ballotID);
    if (ballot === null) {
      return -1;
    }

    // check if ballot votes has already been casted from ballots_users
    var ballotitems = await dl.getBallotItems(ballotID);
    return ballotitems;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCandidates = async (ballotID, username) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);

    if (user == null) {
      var user = await dl.getUser(username);
      loggedInUsers.push(user[0]);
      user = user[0];
    }

    var ballot = await dl.getBallot(ballotID);
    if (ballot === null) {
      return -1;
    }
    if (ballot[0].societyid == user.societyid) {
      // check if ballot votes has already been casted from ballots_users
      var candidates = await dl.getCandidates(ballotID);
      return candidates;
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
    var ballot = await dl.getBallot(ballotID);
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
    var ballot = await dl.getBallot(ballotID);
    if (ballot === null) {
      return -1;
    }
    //validate ballot
    var current = new Date();
    if (
      ballot[0].societyid == user.societyid &&
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

const getSocietyBallots = async (societyID) => {
  try {
    const ballots = await dl.getBallotsBySociety(societyID);

    return ballots;
  } catch (error) {
    console.log(error);
    throw error;
  }
}; //getSocietyBallots

const getBallotItemCandidates = async (itemID) => {
  try {
    const candidates = await dl.getBallotItemCandidates(itemID);
    return candidates;
  } catch (error) {
    console.log(error);
    throw error;
  }
}; //getBallotItemCandidates

// const castVote= async(username,voteType,itemID,votedFor, writein)=>
// {
//     try
//     {
//     // user validation
//         var  user = loggedInUsers.find(users => users.username === username);
//         //validate user
//         if(user == null || user.roleid>2)
//         {
//             return 0;
//         }
//         var ballot = await dl.getBallotAndSociety(itemID,0);
//         if (ballot === null) {
//             return -1;
//           }
//         // switch current date once data with active elections loaded
//         //validate ballot
//         var current = Date.parse('2001-08-21');
//         if (ballot[0].societyID==user.societyID && Date.parse((ballot[0]).enddate)>current && Date.parse(ballot[0].startdate) < current)
//         {
//         //validate candidate
//             var candidateID = parseInt(votedFor);
//             var candidate = await dl.getCandidates(0,candidateID);
//             if (candidate == null || candidate[0].itemid != itemID) {
//                 return -2;
//             }
//             var cast = await dl.castVote(username,voteType,itemID,votedFor, writein);
//             console.log(cast);
//             return cast;
//         }
//         else
//         {
//             return -1;
//         }

//     }

//     catch(error)
//     {
//         console.log(error);
//         throw error;
//     }
// }

const castVote = async (username, ballotID, positionvotes, initiativevotes) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);
    if (user == null || user.roleid > 2) {
      return 0;
    }
    var ballot = await dl.getBallot(ballotID);
    var current = new Date();
    if (ballot.length == 0) {
      return -1;
    }

    if (
      ballot[0].societyid == user.societyid &&
      Date.parse(ballot[0].enddate) > current &&
      Date.parse(ballot[0].startdate) < current
    ) {
      // check if ballot votes has already been casted from ballots_users
      var cast = await dl.castVote(
        username,
        positionvotes,
        initiativevotes,
        ballotID
      );
      if (cast > 0) {
        var update = await dl.updateVotedBallots(username, ballotID);
      }
      return cast;
    } else {
      return -1;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSocieties = async (username) => {
  try {
    var user = loggedInUsers.find((users) => users.username == username);
    //must determin  if user is Admin (return all) Employee (return associated) or other (tell them to ** off)
    if (user.roleid === 3) {
      //return associated
      var queryRes = await dl.getAssignedSocieties(username);
      return queryRes;
    } else if (user.roleid === 4) {
      //return all
      var queryRes = await dl.getAllSocieties();
      return queryRes;
    } else {
      //return nothing of value
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}; //getSocieties

const getBallot = async (ballotID) => {
  return await dl.getBallot(ballotID);
};

const decrementArray = () => {
  countUser = countUser - 1;
};

const createOrEditBallot = async (
  username,
  ballotid,
  ballotname,
  startdate,
  enddate,
  societyid,
  edit
) => {
  if (edit) {
    return await dl.editBallot(
      username,
      ballotid,
      ballotname,
      startdate,
      enddate,
      societyid
    );
  } else {
    return await dl.createBallot(
      username,
      ballotid,
      ballotname,
      startdate,
      enddate,
      societyid
    );
  }
};

const createBallotItem = async (
  username,
  ballotid,
  itemtype,
  itemid,
  itemname,
  numvotesallowed,
  maxnumcandidates
) => {
  return await dl.createBallotItem(
    username,
    ballotid,
    itemtype,
    itemid,
    itemname,
    numvotesallowed,
    maxnumcandidates
  );
};

const addCandidate = async (username, itemid, candidateid) => {
  return await dl.addCandidate(username, itemid, candidateid);
};
const createCandidate = async (
  username,
  candidateid,
  firstname,
  lastname,
  titles,
  description,
  photo
) => {
  return await dl.createCandidate(
    username,
    candidateid,
    firstname,
    lastname,
    titles,
    description,
    photo
  );
};

const hashPassword = (password) => {
  const hash = createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

const createUser = async (
  username,
  firstName,
  lastName,
  password,
  societyIDs,
  roleID
) => {
  try {
    const passwordHash = await hashPassword(password);
    console.log("in bl");
    await dl.createUser(
      username,
      firstName,
      lastName,
      roleID,
      passwordHash,
      societyIDs
    );
  } catch (error) {
    throw error;
  }
};

const editUser = async (
  username,
  firstName,
  lastName,
  password,
  societyIDs,
  roleID
) => {
  try {
    console.log("in edit user bl");
    const passwordHash = await hashPassword(password);
    await dl.editUser(
      username,
      firstName,
      lastName,
      roleID,
      passwordHash,
      societyIDs
    );
  } catch (error) {
    throw error;
  }
};

const usernameExists = async (username, password) => {
  try {
    var user = await dl.getUser(username);

    if (user.length != 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNewSociety = async (societyName, societyDescription) => {
  console.log("in buis layer");
  return await dl.createSociety(societyName, societyDescription);
};

const generateSocietyStatistics = async (societyID) => {
  try {
    console.log("inside the function");
    console.log(societyID);

    const ballotCounts = await dl.getBallotCountPerSociety(societyID);
    const avgMembers = await dl.getavgMembers(societyID);
    const members = await dl.getMembersOfSociety(societyID);
    console.log(members);
    console.log(avgMembers);
    console.log(ballotCounts);
    const activeBallots = parseInt(ballotCounts[0].activeballots);
    const inactiveBallots = parseInt(ballotCounts[0].inactiveballots);
    const numOfBallots = activeBallots + inactiveBallots;

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
    const loggedInUserArrayLength = countUser;

    console.log(averageQueryTime);
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
  getBallots,
  getBallotItems,
  getCandidates,
  getResults,
  getStatus,
  castVote,
  getSocieties,
  createUser,
  getBallot,
  createOrEditBallot,
  createBallotItem,
  addCandidate,
  createCandidate,
  createUser,
  createNewSociety,
  editUser,
  usernameExists,
  getSocietyBallots,
  getBallotItemCandidates,
  generateSocietyStatistics,
  getSystemStatistics,
  decrementArray
};
