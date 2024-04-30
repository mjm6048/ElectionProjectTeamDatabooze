CREATE INDEX ballots_societyid ON ballots(societyid);
CREATE INDEX ballotitem_ballotid ON ballotitem(ballotid);
CREATE INDEX votes_itemid ON votes(itemid);
CREATE INDEX ballots_users_username ON ballots_users (username);
CREATE INDEX ballots_users_ballotID ON ballots_users (ballotID);
CREATE INDEX candidate_items_itemID ON candidate_items (itemID);
CREATE INDEX users_username ON users(username);


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
    ballotName varchar(50)
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

/*get  ballots of a society*/
DROP FUNCTION GetBallotsWithStatus;
CREATE OR REPLACE FUNCTION GetBallotsWithStatus(UserNamevalue varchar(50),SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName VARCHAR(50),
    ballotStatus VARCHAR(20),
    userVoted BOOLEAN
    -- Add other fields from the ballot table as needed
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.ballotID, 
        b.ballotName,
        CASE 
            WHEN CURRENT_DATE > b.endDate THEN 'completed'::VARCHAR(20)
            WHEN CURRENT_DATE BETWEEN b.startDate AND b.endDate THEN 'active'::VARCHAR(20)
            ELSE 'not started'::VARCHAR(20)
        END AS ballotStatus,
        EXISTS (
            SELECT 1 FROM ballots_users bu 
            WHERE bu.ballotID = b.ballotID AND bu.username = UserNamevalue
        ) AS userVoted
    FROM 
        ballots b
    JOIN 
        society s ON b.SocietyID = s.SocietyID
    WHERE 
        b.societyID = SocietyIDValue;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_ballots_in_society(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName varchar(50)
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

/* get ballotitems belonging to a ballot */
CREATE OR REPLACE FUNCTION get_items_in_ballot(BallotIDValue INT)
RETURNS TABLE (
    ID INT,
    Type BALLOTITEMTYPE,
    name varchar(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT itemID as ID, itemType as Type, itemname as name
    FROM BallotItem
    WHERE ballotID = BallotIDValue;
END;
$$ LANGUAGE plpgsql;
/* count votes */
CREATE OR REPLACE FUNCTION count_position_votes()
RETURNS TABLE (
    ID INT,
    candidateid INT,
    firstname varchar(50),
    lastname varchar(50),
    num_votes INT

) AS $$
BEGIN
RETURN QUERY
SELECT v.itemid,v.candidateid, c.firstname, c.lastname, COUNT(*)::INT AS num_votes 
FROM votes v 
JOIN candidate c ON v.candidateid = c.candidateid 
WHERE v.votetype = 'position' 
GROUP BY v.itemid, c.firstname, c.lastname,  v.candidateid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_initiative_votes()
RETURNS TABLE (
    ID INT,
    response varchar(50),
    num_votes INT

) AS $$
BEGIN
RETURN QUERY
SELECT v.itemid,v.initiativeResponse as response, COUNT(*)::INT AS num_votes 
FROM votes v 
WHERE v.votetype = 'initiative' 
GROUP BY v.itemid, v.initiativeResponse;
END;
$$ LANGUAGE plpgsql;

CREATE MATERIALIZED VIEW materialized_votes_username_ballotid AS
SELECT DISTINCT votes.username, ballots.ballotid
FROM votes
JOIN ballotitem ON votes.itemid = ballotitem.itemid
JOIN ballots ON ballots.ballotid = ballotitem.ballotid
ORDER BY ballots.ballotid;

CREATE MATERIALIZED VIEW materialized_ballotitem_positionvotes AS
SELECT DISTINCT
    ballotitem.ballotid,
    ballotitem.itemID,
    ballotitem.itemname,
    ballotitem.itemtype,
    sp1.candidateid,
    sp1.firstname,
    sp1.lastname,
    sp1.num_votes
FROM
    ballotitem
JOIN
    ballots ON ballotitem.ballotid = ballots.ballotid
JOIN
    (SELECT * FROM count_position_votes()) AS sp1 ON ballotitem.itemID = sp1.ID;

CREATE MATERIALIZED VIEW materialized_ballotitem_initiativevotes AS
SELECT DISTINCT
    ballotitem.ballotid,
    ballotitem.itemID,
    ballotitem.itemname,
    ballotitem.itemtype,
    sp1.response,
    sp1.num_votes
FROM
    ballotitem
JOIN
    ballots ON ballotitem.ballotid = ballots.ballotid
JOIN
    (SELECT * FROM count_initiative_votes()) AS sp1 ON ballotitem.itemID = sp1.ID;

CREATE OR REPLACE FUNCTION get_ballots_in_society(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName TEXT
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
        s.societyName AS societyName,
        COUNT(u.username)::INT AS numMembers
    FROM
        users_society us
    INNER JOIN
        users u ON u.username = us.username
    INNER JOIN
        society s ON s.societyID = us.societyID
    WHERE
        us.societyID = p_societyID
    GROUP BY
        us.societyID, s.societyName;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetAverageMembersVotingPerElection(p_societyID INT)
RETURNS FLOAT AS
$$
DECLARE
    total_voters_count INT;
    total_elections_count INT;
    average_members_voting FLOAT;
BEGIN

    SELECT COUNT(DISTINCT v.username)::FLOAT
    INTO total_voters_count
    FROM votes v
    JOIN BallotItem bi ON v.itemID = bi.itemID
    JOIN ballots b ON bi.ballotID = b.ballotID
    WHERE b.societyID = p_societyID;

    SELECT COUNT(DISTINCT b.ballotID)::FLOAT
    INTO total_elections_count
    FROM ballots b
    WHERE b.societyID = p_societyID;

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

    SELECT COUNT(*)
    INTO active_elections_count
    FROM ballots
    WHERE enddate >= CURRENT_DATE;

    RETURN active_elections_count;
END;
$$
LANGUAGE plpgsql;

-- Materialized view for get_ballots_in_society()
CREATE MATERIALIZED VIEW mv_ballots_in_society
AS
SELECT b.ballotID, b.ballotName
FROM ballots b
JOIN society s ON b.SocietyID = s.SocietyID
WHERE b.startDate <= CURRENT_DATE 
  AND b.endDate >= CURRENT_DATE;

CREATE UNIQUE INDEX ON mv_ballots_in_society (ballotID);

-- Materialized view for getBallotCountPerSociety()
CREATE MATERIALIZED VIEW mv_ballot_count_per_society
AS
SELECT s.societyID, s.societyName, 
       COUNT(CASE WHEN b.enddate >= CURRENT_DATE THEN 1 END) AS activeBallots,
       COUNT(CASE WHEN b.enddate < CURRENT_DATE THEN 1 END) AS inactiveBallots
FROM society s
JOIN ballots b ON s.societyID = b.societyID
GROUP BY s.societyID, s.societyName;

CREATE UNIQUE INDEX ON mv_ballot_count_per_society (societyID);

-- Materialized view for GetMembersOfSociety()
CREATE MATERIALIZED VIEW mv_members_of_society
AS
SELECT us.societyID, s.societyName, COUNT(u.username) AS numMembers
FROM users_society us
INNER JOIN users u ON u.username = us.username
INNER JOIN society s ON s.societyID = us.societyID
GROUP BY us.societyID, s.societyName;

CREATE UNIQUE INDEX ON mv_members_of_society (societyID);
