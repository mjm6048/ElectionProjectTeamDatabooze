-- Database: databooze

-- DROP DATABASE IF EXISTS databooze;

CREATE DATABASE databooze
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
CREATE TYPE BALLOTITEMTYPE AS ENUM('initiative','position');


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username varchar(50) NOT NULL PRIMARY KEY,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    passwordHash varchar(100) NOT NULL,
    roleID int NOT NULL
);

DROP TABLE IF EXISTS society CASCADE;
CREATE TABLE society(
    societyID SERIAL PRIMARY KEY,
    societyName VARCHAR(200), 
    societyDescription VARCHAR(500)
);


DROP TABLE IF EXISTS ballots CASCADE;
CREATE TABLE ballots(
    ballotID SERIAL NOT NULL PRIMARY KEY, 
    ballotName varchar(50), 
    startDate DATE, 
    endDate DATE,
    societyID int,
	CONSTRAINT fk_societyID
    	FOREIGN KEY (societyID)
		REFERENCES society (societyID)
);


DROP TABLE IF EXISTS BallotItem CASCADE;
CREATE TABLE BallotItem(
    itemID INT NOT NULL PRIMARY KEY,
    itemName varchar(50),
    itemType BALLOTITEMTYPE,
    numVotesAllowed INT,
    ballotID INT,
    maxNumCandidates INT,
    FOREIGN KEY (ballotID) REFERENCES ballots (ballotID)
);

DROP TABLE IF EXISTS candidate CASCADE;
CREATE TABLE candidate(
    candidateID int NOT NULL PRIMARY KEY,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    titles varchar(50),
    candidateDescription varchar(500),
    photo varchar(500)
);

DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes( 
    voteID SERIAL PRIMARY KEY, 
    voteType BALLOTITEMTYPE,
    itemID int,
    candidateID int,
    initiativeResponse varchar(50),
    writein varchar(50),
    username varchar(50) NOT NULL,
	CONSTRAINT fk_username
    	FOREIGN KEY (username)
		REFERENCES users (username),
    CONSTRAINT fk_candidate FOREIGN KEY (candidateID) REFERENCES candidate (candidateID),
    CONSTRAINT unique_vote UNIQUE (itemID, candidateID, username),
    CONSTRAINT unique_initiative UNIQUE (itemID,initiativeResponse, username)
);


DROP TABLE IF EXISTS users_society CASCADE;
CREATE TABLE users_society(
    username varchar(50) NOT NULL,
    societyID INT NOT NULL,
    CONSTRAINT users_society_key PRIMARY KEY (username, societyID),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (societyID) REFERENCES society(societyID)
);

DROP TABLE IF EXIST ballots_users CASCADE;
CREATE TABLE ballots_users(
    ballotID INT NOT NULL,
    username varchar(50) NOT NULL,
    CONSTRAINT users_ballot_key PRIMARY KEY (ballotID,username),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (ballotID) REFERENCES ballots(ballotID)
);

DROP TABLE IF EXISTS candidate_items CASCADE;
CREATE TABLE candidate_items(
    candidateID INT NOT NULL,
    itemID INT NOT NULL,
    CONSTRAINT candidate_items_key PRIMARY KEY (candidateID,itemID),
    FOREIGN KEY (candidateID) REFERENCES candidate(candidateID),
    FOREIGN KEY (itemID) REFERENCES ballotitem(itemID)
);




