CREATE DATABASE databooze;
USE databooze;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    username varchar(25) NOT NULL PRIMARY KEY,
    firstName varchar(25) NOT NULL,
    lastName varchar(25) NOT NULL,
    passwordHash varchar(30) NOT NULL,
    roleID int NOT NULL
);

DROP TABLE IF EXISTS society;
CREATE TABLE society(
    societyID INT NOT NULL PRIMARY KEY,
    societyName varchar(25), 
    societyDescription varchar(100)
);

DROP TABLE IF EXISTS ballots;
CREATE TABLE ballots(
    ballotID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    ballotName varchar(25), 
    startDate DATE, 
    endDate DATE,
    societyID int,
    FOREIGN KEY (societyID) REFERENCES society(societyID)
);

DROP TABLE IF EXISTS position_ballots;
CREATE TABLE position_ballots( 
    positionID int NOT NULL PRIMARY KEY, 
    positionName varchar(25), 
    maxNumCandidates int, 
    numVotesAllowed int, 
    ballotID int,
    FOREIGN KEY (ballotID) REFERENCES ballots(ballotID)
);

DROP TABLE IF EXISTS candidate;
CREATE TABLE candidate(
    username varchar(25) NOT NULL,
    positionID int NOT NULL,
    titles varchar(15),
    candidateDescription varchar(100),
    writeIn boolean,
    photo varchar(30),
    CONSTRAINT candidate_key PRIMARY KEY (username, positionID),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (positionID) REFERENCES position_ballots(positionID)

);

DROP TABLE IF EXISTS votes;
CREATE TABLE votes( 
    voteID INT NOT NULL PRIMARY KEY, 
    votes JSON,
    username varchar(25) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);

DROP TABLE IF EXISTS initiative_ballots;
CREATE TABLE initiative_ballots(
    initiativeID int PRIMARY KEY NOT NULL,
    initiativeName varchar(25),
    initiativeDescription varchar(100), 
    numVotesAllowed int,
    ballotID int, 
    options JSON,
    FOREIGN KEY (ballotID) REFERENCES ballots(ballotID)
);

DROP TABLE IF EXISTS users_society;
CREATE TABLE users_society(
    username varchar(25) NOT NULL,
    societyID INT NOT NULL,
    CONSTRAINT users_society_key PRIMARY KEY (username, societyID),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (societyID) REFERENCES society(societyID)
);
