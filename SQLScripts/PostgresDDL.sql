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
	

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username varchar(30) NOT NULL PRIMARY KEY,
    firstName varchar(30) NOT NULL,
    lastName varchar(30) NOT NULL,
    passwordHash varchar(30) NOT NULL,
    roleID int NOT NULL
);

DROP TABLE IF EXISTS society CASCADE;
CREATE TABLE society(
    societyID INT NOT NULL PRIMARY KEY,
    societyName varchar(50), 
    societyDescription varchar(100)
);

DROP TABLE IF EXISTS ballots CASCADE;
CREATE TABLE ballots(
    ballotID SERIAL NOT NULL PRIMARY KEY, 
    ballotName varchar(30), 
    startDate DATE, 
    endDate DATE,
    societyID int,
	CONSTRAINT fk_societyID
    	FOREIGN KEY (societyID)
		REFERENCES society (societyID)
);

DROP TABLE IF EXISTS position_ballots CASCADE;
CREATE TABLE position_ballots( 
    positionID int NOT NULL PRIMARY KEY, 
    positionName varchar(30), 
    maxNumCandidates int, 
    numVotesAllowed int, 
    ballotID int,
	CONSTRAINT fk_ballotID
    	FOREIGN KEY (ballotID)
		REFERENCES ballots (ballotID)
);

DROP TABLE IF EXISTS candidate CASCADE;
CREATE TABLE candidate(
    username varchar(30) NOT NULL,
    positionID int NOT NULL,
    titles varchar(30),
    candidateDescription varchar(100),
    writeIn boolean,
    photo varchar(30),
    CONSTRAINT candidate_key PRIMARY KEY (username, positionID),
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (positionID) REFERENCES position_ballots (positionID)
);

DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes( 
    voteID INT NOT NULL PRIMARY KEY, 
    votes JSON,
    username varchar(30) NOT NULL,
	CONSTRAINT fk_username
    	FOREIGN KEY (username)
		REFERENCES users (username)
);

DROP TABLE IF EXISTS initiative_ballots CASCADE;
CREATE TABLE initiative_ballots(
    initiativeID int PRIMARY KEY NOT NULL,
    initiativeName varchar(30),
    initiativeDescription varchar(100), 
    numVotesAllowed int,
    ballotID int, 
    options JSON,
	CONSTRAINT fk_ballotID
    	FOREIGN KEY (ballotID)
		REFERENCES ballots (ballotID)
);

DROP TABLE IF EXISTS users_society CASCADE;
CREATE TABLE users_society(
    username varchar(30) NOT NULL,
    societyID INT NOT NULL,
    CONSTRAINT users_society_key PRIMARY KEY (username, societyID),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (societyID) REFERENCES society(societyID)
);