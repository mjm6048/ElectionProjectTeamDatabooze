function isValidBallot(ballot) {
  const errors = [];
  if (
    ballot.name == null ||
    ballot.description == null ||
    ballot.startDate == null ||
    ballot.endDate == null ||
    ballot.societyID == null
  ) {
    return false;
  }
  // Fields cannot be empty string
  if (
    /^\s*$/.test(ballot.name) ||
    /^\s*$/.test(ballot.description) ||
    /^\s*$/.test(ballot.startDate) ||
    /^\s*$/.test(ballot.endDate)
  ) {
    return false;
  }
  // start date has to be less than end date
  var sd = Date.parse(ballot.startDate);
  var ed = Date.parse(ballot.endDate);
  if (sd > ed) {
    return false;
  }
  //societyID has to be int
  if (!/^[0-9]+$/.test(ballot.societyID)) {
    return false;
  }
  return true;
}

function isValidCandidate(candidate) {
  if (
    /^\s*$/.test(candidate.username) ||
    /^\s*$/.test(candidate.titles) ||
    /^\s*$/.test(candidate.candidateDescription) ||
    /^\s*$/.test(candidate.photo)
  ) {
    return false;
  } else {
    return true;
  }
}

function isValidUsers(users) {
  if (
    users.username == null ||
    users.firstname == null ||
    users.lastname == null ||
    users.passwordHash == null ||
    users.roleID == null
  ) {
    return false;
  }

  // Fields cannot be empty string
  if (
    /^\s*$/.test(users.username) ||
    /^\s*$/.test(users.firstname) ||
    /^\s*$/.test(users.lastname) ||
    /^\s*$/.test(users.passwordHash)
  ) {
    return false;
  }

  // Validate username
  if (!/^[a-z][a-z0-9]*$/.test(users.username)) {
    return false;
  }

  // Validate firstname
  if (!/^[a-zA-Z]+$/.test(users.firstname)) {
    return false;
  }

  // Validate lastname
  if (!/^[a-zA-Z]+$/.test(users.lastname)) {
    return false;
  }

  // Validate password
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(users.passwordHash)) {
    return false;
  }

  // Validate roleID
  if (users.roleID < 0 || users.roleID > 3) {
    return false;
  }

  // If all checks pass, return true
  return true;
}

function isValidSociety(society) {
  if (
    society.societyID == null ||
    society.name == null ||
    society.description == null
  ) {
    return false;
  }

  if (
    /^\s*$/.test(society.societyID) ||
    /^\s*$/.test(society.name) ||
    /^\s*$/.test(society.description)
  ) {
    return false;
  }

  if (!/^[0-9]+$/.test(society.societyID)) {
    return false;
  }

  // If all checks pass, return true
  return true;
}
function isValidPositionBallot(position_ballot) {
  if (
    /^(0|[1-9][0-9]*)$/.test(position_ballot.positionID) ||
    /^\s*$/.test(position_ballot.positionName) ||
    /^\s*$/.test(position_ballot.maxNumCandidates) ||
    /^(0|[1-9][0-9]*)$/.test(position_ballot.numVotesAllowed) ||
    /^(0|[1-9][0-9]*)$/.test(position_ballot.ballotID)
  ) {
    return false;
  } else {
    return true;
  }
}

export {
  isValidBallot,
  isValidCandidate,
  isValidPositionBallot,
  isValidSociety,
  isValidUsers
};
