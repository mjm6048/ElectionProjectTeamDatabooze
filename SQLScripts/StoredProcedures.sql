
/* get usernames of society members */
CREATE OR REPLACE FUNCTION get_society_membernames(societyIDValue INT)
RETURNS TABLE (Username TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT us.username
    FROM user_society us
    JOIN users ON us.username = users.username
    WHERE users.roleID IN (1, 2);
END;
$$ LANGUAGE plpgsql;

/* get members of society */
CREATE OR REPLACE FUNCTION get_society_members(societyIDValue INT)
RETURNS TABLE ( Username TEXT,firstname TEXT, lastname TEXT, RoleID INT) AS $$
BEGIN
    RETURN QUERY
    SELECT users.username, users.firstname, users.lastname,users.roleID
    FROM get_society_membernames(societyIDValue) gsm
    JOIN users ON gsm.Username = uss.Username;
END;
$$ LANGUAGE plpgsql;

/*get active ballots of a society*/
CREATE OR REPLACE FUNCTION get_ballots_in_society(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName TEXT
    -- Add other fields from the ballot table as needed
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.ballotID, b.ballotName
    FROM ballots b
    JOIN society s ON b.SocietyID = s.SocietyID
    WHERE b.societyID = SocietyIDValue
    AND b.startDate <= CURRENT_DATE
    AND b.endDate >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION getBallotCountPerSociety(p_societyID INT)
RETURNS TABLE (societyID INT, societyName VARCHAR(100), activeBallots INT, inactiveBallots INT) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        s.societyID,
        s.societyName AS societyName,
        COUNT(CASE WHEN b.enddate >= CURRENT_DATE THEN 1 END)::INT AS activeBallots,
        COUNT(CASE WHEN b.enddate < CURRENT_DATE THEN 1 END)::INT AS inactiveBallots
    FROM
        society s
    JOIN
        ballots b ON s.societyID = b.societyID
    WHERE
        s.societyID = p_societyID
    GROUP BY
        s.societyID, s.societyName;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION GetAverageMembersVotingPerElection(p_societyID INT)
RETURNS FLOAT AS
$$
DECLARE
    total_voters_count INT;
    total_elections_count INT;
    average_members_voting FLOAT;
BEGIN
    -- Get the total number of distinct users who have voted across all elections in the specified society
    SELECT COUNT(DISTINCT v.username)::FLOAT
    INTO total_voters_count
    FROM votes v
    JOIN BallotItem bi ON v.itemID = bi.itemID
    JOIN ballots b ON bi.ballotID = b.ballotID
    WHERE b.societyID = p_societyID;

    -- Get the total number of elections in the specified society
    SELECT COUNT(DISTINCT b.ballotID)::FLOAT
    INTO total_elections_count
    FROM ballots b
    WHERE b.societyID = p_societyID;

    -- Calculate the average number of distinct users voting per election
    IF total_elections_count > 0 THEN
        average_members_voting := total_voters_count / total_elections_count;
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
    SELECT SUM(total_exec_time)::FLOAT, COUNT(*)
    INTO total_query_time, total_query_count
    FROM pg_stat_statements;

    IF total_query_count > 0 THEN
        average_query_time := total_query_time / total_query_count;
    ELSE
        average_query_time := NULL;
    END IF;

    RETURN average_query_time;
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