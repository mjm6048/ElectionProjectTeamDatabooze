const dl = require('./datalayer');
const { createHash } = require('crypto');
var loggedInUsers = [];

const hashPassword = (password) => {
    const hash = createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

const userExists = async (username, password) => {
    try {
        var user = await dl.getUser(username);

        if (user.length != 0) {
            var hash = createHash('sha256').update(password).digest('hex');
            if (hash == user[0].passwordhash) {
                loggedInUsers.push(user[0]);
                if (user[0].roleid < 3) {
                    // return members of society and all ballots that havent started if role>=3
                }
                return user[0].roleid;
            } else {
                return -1;
            }
        } else
            return -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getBallots = async (username) => {
    try {
        var user = loggedInUsers.find(users => users.username == username);

        if (user == null) {
            var user = await dl.getUser(username);
            loggedInUsers.push(user[0]);
            user = user[0];
        }
        var ballots = await dl.getBallots(user.societyid, username);
        if (user.roleid == 1) {
            ballots = ballots.filter(ballot => (ballot.ballotstatus === 'active' || ballot.ballotstatus === 'not started'));
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
        var ballotitems = await dl.getBallotItems(ballotID);
        return ballotitems;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getCandidates = async (ballotID, username) => {
    try {
        var user = loggedInUsers.find(users => users.username == username);

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
        var user = loggedInUsers.find(users => users.username == username);

        if (user == null || user.roleid < 2) {
            return 0;
        }
        var ballot = await dl.getBallot(ballotID);
        var current = new Date();
        if (ballot === null) {
            return -1;
        }
        if ((ballot[0].societyid === user.societyid) && Date.parse(ballot[0].enddate) < current) {
            var results = await dl.getResults(ballotID);
            var status = await dl.getStatus(ballotID);
            var report = {
                'result': results,
                'status': status
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
        var user = loggedInUsers.find(users => users.username == username);
        if (user == null || user.roleid < 2) {
            return 0;
        }
        var ballot = await dl.getBallot(ballotID);
        if (ballot === null) {
            return -1;
        }
        var current = new Date();
        if (ballot[0].societyid == user.societyid && Date.parse(ballot[0].startdate) <= current) {
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

const castVote = async (username, ballotID, positionvotes, initiativevotes) => {
    try {
        var user = loggedInUsers.find(users => users.username == username);
        if (user == null || user.roleid > 2) {
            return 0;
        }
        var ballot = await dl.getBallot(ballotID);
        var current = new Date();
        if (ballot.length == 0) {
            return -1;
        }
        if (ballot[0].societyid == user.societyid && Date.parse(ballot[0].enddate) > current && Date.parse(ballot[0].startdate) < current) {
            var cast = await dl.castVote(username, positionvotes, initiativevotes, ballotID);
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
        var queryRes = await dl.getAssignedSocieties(username);
        return queryRes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getBallot = async (ballotID) => {
    return await dl.getBallot(ballotID);
};

const createOrEditBallot = async (username, ballotid, ballotname, startdate, enddate, societyid, edit) => {
    if (edit) {
        return await dl.editBallot(username, ballotid, ballotname, startdate, enddate, societyid);
    } else {
        return await dl.createBallot(username, ballotid, ballotname, startdate, enddate, societyid);
    }
};

const createBallotItem = async (username, ballotid, itemtype, itemid, itemname, numvotesallowed, maxnumcandidates) => {
    return await dl.createBallotItem(username, ballotid, itemtype, itemid, itemname, numvotesallowed, maxnumcandidates);
};

const addCandidate = async (username, itemid, candidateid) => {
    return await dl.addCandidate(username, itemid, candidateid);
};

const createCandidate = async (username, candidateid, firstname, lastname, titles, description, photo) => {
    return await dl.createCandidate(username, candidateid, firstname, lastname, titles, description, photo);
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

        const numOfBallots = await dl.getBallotCountPerSociety(societyID);
        const avgMembers = await dl.getavgMembers(societyID);
        const members = await dl.getMembersOfSociety(societyID);
        console.log(numOfBallots,
            members,
            avgMembers);
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

        console.log(averageQueryTime)
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

const getMembersOfSociety = async (societyID) => {
    return await dl.getMembersOfSociety(societyID);
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
    generateSocietyStatistics,
    getSystemStatistics,
    getMembersOfSociety
};
