
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
CREATE OR REPLACE FUNCTION GetBallotsWithStatus(SocietyIDValue INT)
RETURNS TABLE (
    ballotID INT,
    ballotName VARCHAR(50),
    ballotStatus VARCHAR(20)
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
        END AS ballotStatus
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
DROP FUNCTION get_items_in_ballot;
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

/* count max votes */
CREATE OR REPLACE FUNCTION highest_votes()
RETURNS TABLE (
    itemID INT,
    votedfor varchar(50),
    vote_count INT
) AS $$
BEGIN
RETURN QUERY
SELECT id as itemid, voted as votedfor, highest_vote_count as vote_count
FROM (
    SELECT id, voted, highest_vote_count,
           ROW_NUMBER() OVER (PARTITION BY id ORDER BY highest_vote_count DESC) AS row_num
    FROM count_votes()
) AS ranked
WHERE row_num = 1;
END;
$$ LANGUAGE plpgsql;
