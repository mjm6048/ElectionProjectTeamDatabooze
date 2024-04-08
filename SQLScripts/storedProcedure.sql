CREATE OR REPLACE FUNCTION getBallotCountPerSociety(p_societyID INT)
RETURNS TABLE (societyID INT, societyName VARCHAR(100), activeBallots INT, inactiveBallots INT) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        s.societyID,
        s.name AS societyName,
        COUNT(CASE WHEN b.enddate >= CURRENT_DATE THEN 1 END) AS activeBallots,
        COUNT(CASE WHEN b.enddate < CURRENT_DATE THEN 1 END) AS inactiveBallots
    FROM
        society s
    JOIN
        ballots b ON s.societyID = b.societyID
    WHERE
        s.societyID = p_societyID
    GROUP BY
        s.societyID, s.name;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetMembersOfSociety(p_societyID INT)
RETURNS TABLE (
    societyID INT,
    societyName VARCHAR(100),
    numMembers INT
) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        us.societyID,
        s.name AS societyName,
        COUNT(u.username) AS numMembers
    FROM
        users_society us
    INNER JOIN
        users u ON u.username = us.username
    INNER JOIN
        society s ON s.societyID = us.societyID
    WHERE
        us.societyID = p_societyID
    GROUP BY
        us.societyID, s.name;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetAverageMembersVotingPerElection(p_societyID INT)
RETURNS FLOAT AS
$$
DECLARE
    total_votes_count INT;
    total_elections_count INT;
    average_members_voting FLOAT;
BEGIN
    -- Get the total number of votes cast across all elections in the specified society
    SELECT COUNT(DISTINCT v.username)
    INTO total_votes_count
    FROM votes v
    JOIN ballots b ON v.ballotID = b.ballotID
    WHERE b.societyID = p_societyID;

    -- Get the total number of elections in the specified society
    SELECT COUNT(DISTINCT ballotID)
    INTO total_elections_count
    FROM ballots
    WHERE societyID = p_societyID;

    -- Calculate the average number of members voting per election
    IF total_elections_count > 0 THEN
        average_members_voting := total_votes_count / total_elections_count;
    ELSE
        average_members_voting := 0;
    END IF;

    RETURN average_members_voting;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetNumberOfActiveElections()
RETURNS INT AS
$$
DECLARE
    active_elections_count INT;
BEGIN
    -- Get the count of active elections
    SELECT COUNT(*)
    INTO active_elections_count
    FROM ballots
    WHERE enddate >= CURRENT_DATE;

    RETURN active_elections_count;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_average_query_time()
RETURNS FLOAT AS
$$
DECLARE
    total_query_time FLOAT;
    total_query_count BIGINT;
    average_query_time FLOAT;
BEGIN
    -- Calculate the total query time and count of queries
    SELECT SUM(total_time), COUNT(*)
    INTO total_query_time, total_query_count
    FROM pg_stat_statements;

    -- Calculate the average query time
    IF total_query_count > 0 THEN
        average_query_time := total_query_time / total_query_count;
    ELSE
        average_query_time := NULL;
    END IF;

    -- Return the average query time
    RETURN average_query_time;
END;
$$
LANGUAGE plpgsql;

