CREATE OR REPLACE FUNCTION GetMembersOfSociety(IN p_societyID INT)
RETURNS TABLE (
    username VARCHAR(100),
    name VARCHAR(100),
    roleID INT
) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        u.username,
        u.name,
        u.roleID
    FROM
        users u
    INNER JOIN
        users_society us ON u.username = us.username
    WHERE
        us.societyID = p_societyID;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getBallotCountPerSociety()
RETURNS TABLE (societyID INT, societyName VARCHAR(100), activeBallots INT, inactiveBallots INT) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        societyID,
        s.name AS societyName,
        COUNT(CASE WHEN b.enddate >= CURRENT_DATE THEN 1 END) AS activeBallots,
        COUNT(CASE WHEN b.enddate < CURRENT_DATE THEN 1 END) AS inactiveBallots
    FROM
        society s
    JOIN
        ballots b ON s.societyID = b.societyID
    GROUP BY
        s.societyID, s.name;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetAverageMembersVotingPerElection()
RETURNS FLOAT AS
$$
DECLARE
    total_votes_count INT;
    total_elections_count INT;
    average_members_voting FLOAT;
BEGIN
    -- Get the total number of votes cast across all elections
    SELECT COUNT(DISTINCT username)
    INTO total_votes_count
    FROM votes;

    -- Get the total number of elections
    SELECT COUNT(DISTINCT ballotID)
    INTO total_elections_count
    FROM ballots;

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

